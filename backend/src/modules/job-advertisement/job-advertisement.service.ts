import { Injectable, NotFoundException } from '@nestjs/common';
import { SuccessResponse } from '../../shared/data.response';
import { JobAdvertisement } from '../../db/entities/job-advertisement.model';
import { JobAdvertisementRepository } from './job-advertisement.repository';
import { CompanyRepository } from '../company/company.repository';
import { UserRepository } from '../user/user.repository';
import { SearchJobAdvertisementDto } from './dto/search-job-advertisement.dto';
import { escapeRegex } from '../../shared/regex';
import { JobAdvertisementDto } from './dto/create-update-job-advertisement.dto';
import { PaginatedJobAdvertisementsResponseDto } from './dto/paginated-job-advertisement.dto';
import { JobAdvertisementMapper } from './job-advertisement.mapper';
import { UserService } from '../user/user.service';

@Injectable()
export class JobAdvertisementService {
  constructor(
    private readonly jobAdvertisementRepository: JobAdvertisementRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jobMapper: JobAdvertisementMapper
  ) { }

  async createJobAdvertisement(jobAdvertisementData: JobAdvertisementDto): Promise<JobAdvertisement> {
    try {
      await this.AddCompanyLink(jobAdvertisementData);
      return await this.jobAdvertisementRepository.create(jobAdvertisementData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async addMultipleJobAds(jobAds: JobAdvertisementDto[]): Promise<JobAdvertisement[]> {
    const session = await this.jobAdvertisementRepository.jobAdvertisementModel.startSession();
    session.startTransaction();

    try {
      for (const jobAd of jobAds) {
        await this.AddCompanyLink(jobAd);
      }

      const createdJobAds = await this.jobAdvertisementRepository.createMany(jobAds);
      await session.commitTransaction();
      return createdJobAds;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getAllPaginatedJobAdvertisements(page: number, size: number): Promise<JobAdvertisement[]> {
    try {
      return await this.jobAdvertisementRepository.findFilters(
        {},
        { skip: (page - 1) * size, limit: size }
      );

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getSingleJobAdvertisement(jobAdvertisementId: string): Promise<JobAdvertisement> {
    try {
      return await this.jobAdvertisementRepository.findOne({ _id: jobAdvertisementId });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getAllJobsByCompany(slug: string): Promise<JobAdvertisement[]> {
    try {
      const company = await this.companyRepository.findOne({ slug: slug });
      if (!company) {
        throw new NotFoundException('Company not found');
      }
      const jobs = await this.jobAdvertisementRepository.findBy({ company_linked: company._id });
      return jobs;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async updateJobAdvertisement(
    jobAdvertisementId: string,
    jobAdvertisementUpdates: JobAdvertisementDto,
  ): Promise<JobAdvertisement> {
    try {
      return await this.jobAdvertisementRepository.findOneAndUpdate(
        { _id: jobAdvertisementId },
        jobAdvertisementUpdates,
        { new: true },
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async removeJobAdvertisement(jobAdvertisementId: string): Promise<SuccessResponse> {
    return await this.jobAdvertisementRepository.deleteOne({ _id: jobAdvertisementId });
  }

  async removeJobAdvertisementsBySource(): Promise<SuccessResponse> {
    const sourcesToDelete = ['Optius.com', 'mojedelo.com'];
    const regexSources = sourcesToDelete.map(source => new RegExp(`^${source}$`, 'i'));

    try {
      await this.jobAdvertisementRepository.deleteMany({ source: { $in: regexSources } });
      return { success: true };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async linkCompanies(): Promise<JobAdvertisement[]> {
    const updated = [];
    const jobAdvertisements = await this.jobAdvertisementRepository.find();

    await Promise.all(jobAdvertisements.map(async jobAd => {
      const matchingCompany = await this.companyRepository.findOne({ name: { $regex: new RegExp(`^${jobAd.company}$`, 'i') } });

      if (matchingCompany) {
        jobAd.company_linked = matchingCompany._id;
        await jobAd.save();
        updated.push(jobAd);
      }
    }));

    return updated;
  }

  async saveJobAdToUser(jobId: string, userEmail: string): Promise<SuccessResponse> {
    try {
      const user = await this.userService.getSingleUserByEmail(userEmail);
      const jobAd = await this.jobAdvertisementRepository.findOne({ _id: jobId });

      if (!user.saved_advertisements.some(ad => ad.equals(jobAd._id))) {
        user.saved_advertisements.push(jobAd);
        await user.save();
        return { success: true };
      } else {
        return { success: false };
      }

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async unsaveJobAdToUser(jobId: string, userEmail: string): Promise<SuccessResponse> {
    const user = await this.userService.getSingleUserByEmail(userEmail);
    const jobAd = await this.jobAdvertisementRepository.findOne({ _id: jobId });

    const jobIndex = user.saved_advertisements.findIndex(ad => ad.equals(jobAd._id));
    if (jobIndex !== -1) {
      user.saved_advertisements.splice(jobIndex, 1);
      await user.save();
      return { success: true };
    } else {
      return { success: false };
    }
  }

  async getSavedJobsByUser(userEmail: string): Promise<JobAdvertisement[]> {
    const user = await this.userService.getSingleUserByEmail(userEmail);

    const savedJobs = await this.jobAdvertisementRepository.findBy({ _id: { $in: user.saved_advertisements } });

    return savedJobs;
  }

  async getPaginatedJobsByCriteria(criteria: SearchJobAdvertisementDto, page: number, size: number): Promise<PaginatedJobAdvertisementsResponseDto> {
    const jobConditions = [];
    const companyConditions = [];

    if (criteria.position) {
      jobConditions.push({ position: { $regex: new RegExp(escapeRegex(criteria.position), 'i') } });
    }

    if (criteria.city) {
      jobConditions.push({ city: { $regex: new RegExp('^' + escapeRegex(criteria.city), 'i') } });
    }

    const jobQuery = jobConditions.length > 0 ? { $and: jobConditions } : {};
    const jobIds = await this.jobAdvertisementRepository.findFilters(jobQuery, { _id: 1 });
    let filteredJobIds = jobIds.map(job => job._id);

    const validJobs = await this.jobAdvertisementRepository.findFilters({ _id: { $in: filteredJobIds } });

    if (criteria.industry) {
      companyConditions.push({ industry: criteria.industry });
      const companyQuery = companyConditions.length > 0 ? { $and: companyConditions } : {};

      const companiesLinkedToJobs = validJobs.map(job => job.company_linked).filter(company => company !== undefined);
      const companyIds = companiesLinkedToJobs.map(company => company._id.toString());

      const companies = await this.companyRepository.findFilters({ _id: { $in: companyIds } });

      const validCompanies = await this.companyRepository.findFilters(companyQuery);
      const validCompanyIds = validCompanies.map(company => company._id.toString());

      const matchingCompanies = companies.filter(company => validCompanyIds.includes(company._id.toString()));

      filteredJobIds = validJobs
        .filter(job => job.company_linked && matchingCompanies.some(company => company._id.equals(job.company_linked._id)))
        .map(job => job._id);
    }

    const totalCount = filteredJobIds.length;

    const paginatedJobs = await this.jobAdvertisementRepository.findFilters(
      { _id: { $in: filteredJobIds } },
      { skip: (page - 1) * size, limit: size }
    );

    const jobDtos = await Promise.all(paginatedJobs.map(async job => this.jobMapper.mapOneJobAdvertisement(job)));

    return {
      jobs: jobDtos,
      count: totalCount,
    };
  }

  async getPopularJobs(email: string | null): Promise<JobAdvertisement[]> {
    try {
      let jobs = [];
      let excludedJobIds = [];

      if (email) {
        const user = await this.userService.getSingleUserByEmail(email);

        if (user.saved_advertisements.length > 0) {
          excludedJobIds = user.saved_advertisements.map(job => job._id.toString());

          const validJobs = user.saved_advertisements.filter(job => job.company_linked);
          const companyIds = validJobs.map(ad => ad.company_linked._id);
          const companies = await this.companyRepository.findFilters({ _id: { $in: companyIds } });

          const industries = new Set<string>();

          companies.forEach(company => {
            if (Array.isArray(company.industry)) {
              company.industry.forEach(ind => industries.add(ind));
            } else {
              industries.add(company.industry);
            }
          });

          if (industries.size > 0) {
            jobs = await this.jobAdvertisementRepository.findFilters(
              { 'company_linked': { $in: companyIds }, _id: { $nin: excludedJobIds } },
              { limit: 4 }
            );
          }
        }

      }

      if (jobs.length === 0) {
        jobs = await this.jobAdvertisementRepository.findFilters({ _id: { $nin: excludedJobIds } }, {
          limit: 4,
          sort: { _id: -1 },
        });
      }

      if (jobs.length === 0) {
        throw new NotFoundException('No popular jobs found.');
      }

      return jobs;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async AddCompanyLink(jobAd: JobAdvertisement): Promise<JobAdvertisement> {
    const companyName = jobAd.company.trim();
    const company = await this.companyRepository.findOne({ name: { $regex: new RegExp(`^${companyName}$`, 'i') } });

    if (!company) {
      throw new NotFoundException(`Company "${companyName}" not found`);
    }

    jobAd.company_linked = company._id;
    return jobAd;

  }

}
