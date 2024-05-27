import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { SuccessResponse } from '../../shared/data.response';
import { SearchCompanyDto } from './dto/search-company.dto';
import { escapeRegex } from '../../shared/regex';
import slugify from 'slugify';
import { CompanyMapper } from './company.mapper';
import { AverageRatingRepository } from '../average-rating/average-rating.repository';
import { Company, CompanyModel } from '../../db/entities/company.model';
import { AverageRatingModel } from '../../db/entities/average-rating.model';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyDto, CompanyDtoWithout } from './dto/company.dto';
import { PaginatedCompaniesResponseDto } from './dto/paginated-company.dto';
import { JobAdvertisementRepository } from '../job-advertisement/job-advertisement.repository';
import { AverageRatingService } from '../average-rating/average-rating.service';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository,
    private readonly companyMapper: CompanyMapper,
    private readonly averageRatingRepository: AverageRatingRepository,
    private readonly averageRatingService: AverageRatingService,
    private readonly jobsRepository: JobAdvertisementRepository
  ) { }

  async createCompany(companyData: CompanyDto): Promise<CompanyDto> {
    try {
      companyData.slug = slugify(companyData.name, { lower: true, strict: true });

      const company = new CompanyModel({
        name: companyData.name,
        address: companyData.address,
        city: companyData.city,
        logo: companyData.logo,
        slug: companyData.slug,
        website: companyData.website,
        industry: companyData.industry,
        subindustry: companyData.subindustry,
        email: companyData.email,
        average: companyData.average
      });

      const averageRating = new AverageRatingModel({
        company: company._id,
        avg_rating: 0,
        ratings_count: 0,
        avg_team: 0,
        avg_personal_development: 0,
        avg_flexibility: 0,
        avg_work_life_balance: 0,
        avg_work_environment: 0,
        avg_leadership: 0,
        avg_benefits: 0,
        avg_bonuses: 0,
        general_assessment_comments: [],
        salary_and_benefits_comments: [],
        interviews_comments: [],
        remote_work_distribution: {
          yes: 0,
          no: 0,
        },
        remote_work_percentage: {
          yes: 0,
          no: 0,
        },
        experience_distribution: {
          pozitivna: 0,
          nevtralna: 0,
          negativna: 0,
        },
        experience_percentage: {
          pozitivna: 0,
          nevtralna: 0,
          negativna: 0,
        },
        difficulty_distribution: {
          enostavno: 0,
          srednje: 0,
          težko: 0,
        },
        difficulty_percentage: {
          enostavno: 0,
          srednje: 0,
          težko: 0,
        },
      });

      const [createdCompany, createdAverageRating] = await Promise.all([
        company.save(),
        averageRating.save(),
      ]);

      await createdCompany.save();

      return this.companyMapper.mapOneCompany(createdCompany, createdAverageRating, null);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getAllCompanies(): Promise<CompanyDtoWithout[]> {
    const companies = await this.companyRepository.find();

    const companyDtos = [];
    for (const company of companies) {
      const companyDto = this.companyMapper.mapOneCompanyAverage(company);
      companyDtos.push(companyDto);
    }

    return companyDtos;
  }

  async getAllPaginatedCompanies(page: number, size: number): Promise<PaginatedCompaniesResponseDto> {
    const companies = await this.companyRepository.findFilters({}, {
      skip: (page - 1) * size,
      limit: size,
      sort: { average: -1 }
    });

    const totalCount = await CompanyModel.countDocuments();

    const companyDtos = [];
    for (const company of companies) {
      const companyDto = this.companyMapper.mapOneCompanyAverage(company);
      companyDtos.push(companyDto);
    }

    return {
      companies: companyDtos,
      count: totalCount
    };
  }

  async getSingleCompany(companyId: string): Promise<CompanyDto> {
    try {
      const company = await this.companyRepository.findOne({ _id: companyId });
      if (!company) {
        throw new NotFoundException(`Company with id '${companyId}' not found`);
      }

      const averageRating = await this.averageRatingRepository.findOne({ company: company._id });
      const jobs = await this.jobsRepository.findBy({ company_linked: company._id });

      return this.companyMapper.mapOneCompany(company, averageRating, jobs);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getCompanyBySlug(slug: string): Promise<CompanyDto> {
    const company = await this.companyRepository.findOne({ slug: slug });
    if (!company) {
      throw new NotFoundException(`Company with slug '${slug}' not found`);
    }

    const averageRating = await this.averageRatingRepository.findOne({ company: company._id });
    const jobs = await this.jobsRepository.findBy({ company_linked: company._id });

    return this.companyMapper.mapOneCompany(company, averageRating, jobs);
  }

  async updateCompany(companyId: string, companyUpdates: UpdateCompanyDto): Promise<CompanyDto> {
    try {
      if (companyUpdates.name) {
        companyUpdates['slug'] = slugify(companyUpdates.name, { lower: true, strict: true });
      }

      const updatedCompany = await this.companyRepository.findOneAndUpdate(
        { _id: companyId },
        companyUpdates,
        { new: true },
      );

      const averageRating = await this.averageRatingRepository.findOne({ company: companyId });
      const jobs = await this.jobsRepository.findBy({ company_linked: companyId });

      return this.companyMapper.mapOneCompany(updatedCompany, averageRating, jobs);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async removeCompany(companyId: string): Promise<SuccessResponse> {
    return await this.companyRepository.deleteOne({ _id: companyId });
  }

  async getFourBestCompanies(): Promise<CompanyDtoWithout[]> {
    try {
      const allCompanies = await this.companyRepository.findFilters({});
      allCompanies.sort((a, b) => (b.average ?? 0) - (a.average ?? 0));

      const companyDtos = await Promise.all(allCompanies.map(async (company) => {
        return this.companyMapper.mapOneCompanyAverage(company);
      }));

      return companyDtos.slice(0, 4);
    } catch (error) {
      console.error('Error retrieving top companies:', error);
      throw new NotFoundException('Could not retrieve top companies.');
    }
  }

  async getPaginatedCompaniesByCriteria(criteria: SearchCompanyDto, page: number, size: number): Promise<PaginatedCompaniesResponseDto> {
    const conditions = [];
    if (criteria.name) {
      conditions.push({ name: { $regex: new RegExp(escapeRegex(criteria.name), 'i') } });
    }
    if (criteria.city) {
      conditions.push({ city: { $regex: new RegExp('^' + escapeRegex(criteria.city), 'i') } });
    }
    if (criteria.industry) {
      conditions.push({ industry: criteria.industry });
    }

    const query = conditions.length > 0 ? { $and: conditions } : {};
    try {
      const companyIds = await this.companyRepository.findFilters(query, { _id: 1 });

      let filteredCompanyIds = companyIds.map(company => company._id);

      if (criteria.rating) {
        filteredCompanyIds = await this.filterCompanyIdsByRating(criteria.rating, filteredCompanyIds);
      }

      if (criteria.job === true) {
        filteredCompanyIds = await this.filterCompanyIdsByJobs(filteredCompanyIds);
      }

      const totalCount = filteredCompanyIds.length;

      const paginatedCompanies = await this.companyRepository.findFilters(
        { _id: { $in: filteredCompanyIds } },
        {
          skip: (page - 1) * size,
          limit: size,
          sort: { average: -1 }
        },
      );

      const companyDtos = await Promise.all(paginatedCompanies.map(async company => {
        const job = await this.jobsRepository.findOne({ company: company });
        return this.companyMapper.mapOneCompanyJobs(company, null, job);
      }));

      return {
        companies: companyDtos,
        count: totalCount,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw new NotFoundException('Could not get the companies from the database.');
    }
  }

  async filterCompanyIdsByRating(rating: number, companyIds: string[]): Promise<Company[]> {
    try {
      const averageRatings = await AverageRatingModel.find({ avg_rating: { $gte: rating }, company: { $in: companyIds } }).exec();
      return averageRatings.map(averageRating => averageRating.company);
    } catch (error) {
      console.error('Error filtering company IDs by rating:', error);
      throw error;
    }
  }

  async filterCompanyIdsByJobs(companyIds: string[]): Promise<Company[]> {
    try {
      let jobs = await this.jobsRepository.findFilters({ company_linked: { $in: companyIds } });
      jobs = jobs.filter(id => id !== undefined);
      return jobs.map(job => job.company_linked);
    } catch (error) {
      console.error('Error filtering company IDs by rating:', error);
      throw error;
    }
  }

  async getCompaniesByCriteria(criteria: SearchCompanyDto): Promise<CompanyDtoWithout[]> {
    const conditions = [];
    if (criteria.name) {
      conditions.push({ name: { $regex: new RegExp(escapeRegex(criteria.name), 'i') } });
    }
    if (criteria.city) {
      conditions.push({ city: { $regex: new RegExp('^' + escapeRegex(criteria.city), 'i') } });
    }
    if (criteria.industry) {
      conditions.push({ industry: criteria.industry });
    }

    const query = conditions.length > 0 ? { $and: conditions } : {};
    try {
      const companies = await this.companyRepository.findFilters(query);

      let ratedCompanies;
      let companyDtos = [];
      if (criteria.rating) {
        ratedCompanies = await this.getCompaniesByRating(criteria.rating, companies);
        companyDtos = ratedCompanies;
      } else {
        for (const company of companies) {
          const averageRating = await this.averageRatingRepository.findOne({ company: company._id });
          const companyDto = this.companyMapper.mapOneCompanyWithout(company, averageRating);
          companyDtos.push(companyDto);
        }
      }

      return companyDtos;
    } catch (error) {
      console.error('Error executing query:', error);
      throw new NotFoundException('Could not get the companies from database.');
    }
  }

  async getCompaniesByRating(rating: number, filteredCompanies: Company[]): Promise<Company[]> {
    try {
      const allCompanyIds = filteredCompanies.map(company => company._id);
      const averageRatings = await AverageRatingModel.find({ avg_rating: { $gte: rating }, company: { $in: allCompanyIds } }).exec();
      const companyIds = averageRatings.map(averageRating => averageRating.company);
      const companies = await CompanyModel.find({ _id: { $in: companyIds } }).populate('average').exec();
      const companyDtos = [];
      for (const company of companies) {
        const averageRating = await this.averageRatingRepository.findOne({ company: company._id });
        const companyDto = this.companyMapper.mapOneCompanyWithout(company, averageRating);
        companyDtos.push(companyDto);
      }

      return companyDtos;

    } catch (error) {
      console.error('Error fetching companies by rating:', error);
      throw error;
    }
  }

  async checkEmail(email: string): Promise<SuccessResponse> {
    const company = await this.companyRepository.findOne({ email: email.toLowerCase() });
    if (company) {
      return { success: true, company: company };
    } else {
      return { success: false };
    }
  }

  async countCompanies(): Promise<number> {
    try {
      const count = await CompanyModel.countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting companies:', error);
      throw new Error('Error counting companies');
    }
  }

  async addAverageToCompany(): Promise<SuccessResponse> {
    try {
      const companies = await this.companyRepository.find();

      for (const company of companies) {
        const averageRating = await this.averageRatingService.getSingleAverageRatingByCompany(company._id);
        if (averageRating) {
          company.average = averageRating.avg_rating;
          await company.save();
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating companies with average ratings:', error);
      throw new Error('Error updating companies with average ratings');
    }
  }

}
