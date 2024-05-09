import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CompanyDto } from './dto/create-update-company.dto';
import { Company } from '../../db/entities/company.model';
import { SuccessResponse } from '../../shared/data.response';
import { SearchCompanyDto } from './dto/search-company.dto';
import { escapeRegex } from 'src/shared/regex';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) { }

  async createCompany(companyData: CompanyDto): Promise<Company> {
    try {
      return await this.companyRepository.create(companyData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getAllCompanies(): Promise<Company[]> {
    try {
      return await this.companyRepository.find({});
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getSingleCompany(companyId: string): Promise<Company> {
    try {
      return await this.companyRepository.findOne({ _id: companyId });
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
    return company;
  }

  async updateCompany(
    companyId: string,
    companyUpdates: CompanyDto,
  ): Promise<Company> {
    try {
      return await this.companyRepository.findOneAndUpdate(
        { _id: companyId },
        companyUpdates,
        { new: true },
      );
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

  async getFourBestCompanies(): Promise<Company[]> {
    try {
      return await this.companyRepository.find(
        {},
        { sort: { avg_rating: -1 }, limit: 4 }
      );
    } catch (error) {
      throw new NotFoundException('Could not retrieve top companies.');
    }
  }

  async getCompaniesByCriteria(criteria: SearchCompanyDto): Promise<CompanyDto[]> {
    const conditions = [];

    if (criteria.name) {
      conditions.push({ name: { $regex: new RegExp('^' + escapeRegex(criteria.name), 'i') } });
    }
    if (criteria.city) {
      conditions.push({ city: { $regex: new RegExp('^' + escapeRegex(criteria.city), 'i') } });
    }
    if (criteria.industry) {
      conditions.push({ industry: criteria.industry });
    }

    const query = conditions.length > 0 ? { $and: conditions } : {};
    try {
      const companies = await this.companyRepository.find(query);
      if (companies.length > 0) {
        return companies;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw new NotFoundException('Could not get the companies from database.');
    }
  }

}

