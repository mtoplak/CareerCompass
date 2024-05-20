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

@Injectable()
export class JobAdvertisementService {
  constructor(
    private readonly jobAdvertisementRepository: JobAdvertisementRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
    private readonly jobMapper: JobAdvertisementMapper
  ) { }

  async createJobAdvertisement(jobAdvertisementData: JobAdvertisementDto): Promise<JobAdvertisement> {
    try {
      const companyName = jobAdvertisementData.company.trim();
      const company = await this.companyRepository.findOne({ name: { $regex: new RegExp(`^${companyName}$`, 'i') } });
      if (!company) {
        throw new NotFoundException('Company not found');
      }

      jobAdvertisementData.company_linked = company._id;
      return await this.jobAdvertisementRepository.create(jobAdvertisementData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getAllJobAdvertisements(): Promise<JobAdvertisement[]> {
    try {
      return await this.jobAdvertisementRepository.find();
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

  async linkCompanies(): Promise<JobAdvertisement[]> {
    const updated = [];
    try {
      const jobAdvertisements = await this.jobAdvertisementRepository.find();
      console.log(jobAdvertisements.length);

      for (const jobAd of jobAdvertisements) {
        const matchingCompany = await this.companyRepository.findOne({ name: { $regex: new RegExp(`^${jobAd.company}$`, 'i') } });

        if (matchingCompany) {
          jobAd.company_linked = matchingCompany._id;
          await jobAd.save();
          updated.push(jobAd);
        }
      }
      console.log(updated.length);
      return updated;
    } catch (error) {
      console.error('Error linking companies to job advertisements:', error);
    }
  }

  async saveJobAdToUser(jobId: string, userEmail: string): Promise<SuccessResponse> {
    try {
      const user = await this.userRepository.findOne({ email: userEmail });
      if (!user) {
        throw new Error('User not found');
      }

      const jobAd = await this.jobAdvertisementRepository.findOne({ _id: jobId });
      if (!jobAd) {
        throw new Error('Job Advertisement not found');
      }

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
    const user = await this.userRepository.findOne({ email: userEmail });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const jobAd = await this.jobAdvertisementRepository.findOne({ _id: jobId });
    if (!jobAd) {
      throw new NotFoundException('Job Advertisement not found');
    }

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
    const user = await this.userRepository.findOne({ email: userEmail });
    if (!user) {
      throw new NotFoundException('User not found');
    }

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

    const jobQuery = jobConditions.length > 0 ? { jobConditions } : {};
    try {
      const jobIds = await this.jobAdvertisementRepository.findFilters(jobQuery, { _id: 1 });
      const filteredJobIds = jobIds.map(job => job._id);

      if (criteria.industry) {
        companyConditions.push({ industry: criteria.industry });
        const companyQuery = companyConditions.length > 0 ? { jobConditions } : {};

        const jobCompanyIds = filteredJobIds.map(ad => ad.company_linked._id);
        const allCompanyIds = await this.companyRepository.findPaginated(companyQuery, { _id: 1 });
        console.log(allCompanyIds);
        console.log(jobCompanyIds);
      }

      const totalCount = filteredJobIds.length;

      const paginatedJobs = await this.jobAdvertisementRepository.findFilters(
        { _id: { $in: filteredJobIds } },
        { skip: (page - 1) * size, limit: size }
      );

      const jobDtos = await Promise.all(paginatedJobs.map(async job => {
        return this.jobMapper.mapOneJobAdvertisement(job);
      }));

      return {
        jobs: jobDtos,
        count: totalCount,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getPopularJobs(email: string | null): Promise<JobAdvertisement[]> {
    try {
      let jobs = [];
      let excludedJobIds = [];

      if (email) {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
          throw new NotFoundException('User not found');
        }
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
              { limit: 8 }
            );
          }
        }

      }

      if (jobs.length === 0) {
        jobs = await this.jobAdvertisementRepository.findFilters({ _id: { $nin: excludedJobIds } }, {
          limit: 8,
          sort: { _id: -1 },
        });
      }

      if (jobs.length === 0) {
        throw new NotFoundException('No popular jobs found.');
      }

      return jobs;
    } catch (error) {
      throw error;
    }
  }

}
