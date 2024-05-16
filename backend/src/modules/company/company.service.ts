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
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository,
    private readonly companyMapper: CompanyMapper,
    private readonly averageRatingRepository: AverageRatingRepository
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
        claimed: companyData.claimed,
      });

      const createdCompany = await company.save();

      const averageRating = new AverageRatingModel({
        company: createdCompany._id,
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
        avg_duration: [],
        remote_work_distribution: {
          yes: 0,
          no: 0
        },
        remote_work_percentage: {
          yes: 0,
          no: 0
        },
        experience_distribution: {
          pozitivna: 0,
          nevtralna: 0,
          negativna: 0
        },
        experience_percentage: {
          pozitivna: 0,
          nevtralna: 0,
          negativna: 0
        },
        difficulty_distribution: {
          enostavno: 0,
          srednje: 0,
          težko: 0
        },
        difficulty_percentage: {
          enostavno: 0,
          srednje: 0,
          težko: 0
        }
      });

      const createdAverageRating = await averageRating.save();

      createdCompany.average = createdAverageRating._id;
      await createdCompany.save();

      return this.companyMapper.mapOneCompany(createdCompany, createdAverageRating);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getAllCompanies(): Promise<CompanyDto[]> {
    const companies = await this.companyRepository.find();

    const companyDtos = [];
    for (const company of companies) {
      const averageRating = await this.averageRatingRepository.findOne({ company: company._id });
      const companyDto = this.companyMapper.mapOneCompany(company, averageRating);
      companyDtos.push(companyDto);
    }

    companyDtos.sort((a, b) => (b.ratings_count ?? 0) - (a.ratings_count ?? 0));
    return companyDtos;
  }

  async getAllPaginatedCompanies(page: number, size: number): Promise<CompanyDto[]> {
    const companies = await this.companyRepository.findPaginated({}, {
      skip: (page - 1) * size,
      limit: size
    });

    const companyDtos = [];
    for (const company of companies) {
      const averageRating = await this.averageRatingRepository.findOne({ company: company._id });
      const companyDto = this.companyMapper.mapOneCompany(company, averageRating);
      companyDtos.push(companyDto);
    }

    companyDtos.sort((a, b) => (b.ratings_count ?? 0) - (a.ratings_count ?? 0));
    return companyDtos;
  }

  async getSingleCompany(companyId: string): Promise<CompanyDto> {
    try {
      const company = await this.companyRepository.findOne({ _id: companyId });
      if (!company) {
        throw new NotFoundException(`Company with id '${companyId}' not found`);
      }

      const averageRating = await this.averageRatingRepository.findOne({ company: company._id });

      return this.companyMapper.mapOneCompany(company, averageRating);
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

    return this.companyMapper.mapOneCompany(company, averageRating);
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

      return this.companyMapper.mapOneCompany(updatedCompany, averageRating);
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

  async getFourBestCompanies(): Promise<CompanyDto[]> {
    try {
      const companies = await this.companyRepository.findPaginated(
        {},
        { sort: { avg_rating: -1 }, limit: 4 }
      );

      const companyDtos = [];
      for (const company of companies) {
        const averageRating = await this.averageRatingRepository.findOne({ company: company._id });
        const companyDto = this.companyMapper.mapOneCompany(company, averageRating);
        companyDtos.push(companyDto);
      }

      companyDtos.sort((a, b) => (b.avg_rating ?? 0) - (a.avg_rating ?? 0));
      return companyDtos;
    } catch (error) {
      throw new NotFoundException('Could not retrieve top companies.');
    }
  }

  async getPaginatedCompaniesByCriteria(criteria: SearchCompanyDto, page: number, size: number): Promise<CompanyDto[]> {
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
      const companyIds = await this.companyRepository.findPaginated(query, { _id: 1 });

      let filteredCompanyIds = companyIds.map(company => company._id);

      if (criteria.rating) {
        filteredCompanyIds = await this.filterCompanyIdsByRating(criteria.rating, filteredCompanyIds);
      }

      const paginatedCompanies = await this.companyRepository.findPaginated(
        { _id: { $in: filteredCompanyIds } },
        { skip: (page - 1) * size, limit: size }
      );

      const companyDtos = await Promise.all(paginatedCompanies.map(async company => {
        const averageRating = await this.averageRatingRepository.findOne({ company: company._id });
        return this.companyMapper.mapOneCompany(company, averageRating);
      }));

      if (criteria.rating) {
        companyDtos.sort((a, b) => (a.avg_rating ?? 0) - (b.avg_rating ?? 0));
      } else {
        companyDtos.sort((a, b) => (b.ratings_count ?? 0) - (a.ratings_count ?? 0));
      }

      return companyDtos;
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


  async getCompaniesByCriteria(criteria: SearchCompanyDto): Promise<CompanyDto[]> {
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
      const companies = await this.companyRepository.findPaginated(query);

      let ratedCompanies;
      let companyDtos = [];
      if (criteria.rating) {
        ratedCompanies = await this.getCompaniesByRating(criteria.rating, companies);
        companyDtos = ratedCompanies;
        companyDtos.sort((a, b) => (a.avg_rating ?? 0) - (b.avg_rating ?? 0));
      } else {
        for (const company of companies) {
          const averageRating = await this.averageRatingRepository.findOne({ company: company._id });
          const companyDto = this.companyMapper.mapOneCompany(company, averageRating);
          companyDtos.push(companyDto);
        }
      }

      companyDtos.sort((a, b) => (b.ratings_count ?? 0) - (a.ratings_count ?? 0));
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
        const companyDto = this.companyMapper.mapOneCompany(company, averageRating);
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
      return { success: true };
    } else {
      return { success: false };
    }
  }

}

