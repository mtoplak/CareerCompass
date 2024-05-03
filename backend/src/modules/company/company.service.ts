import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CompanyDto } from './dto/create-update-company.dto';
import { Company } from 'src/db/entities/company.model';
import { CompanyResponse, SuccessResponse } from 'src/shared/data.response';
import { SearchCompanyDto } from './dto/search-company.dto';

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

  async getCompanyBySlug(slug: string): Promise<Company> {
    try {
      return await this.companyRepository.findOne({ slug: slug });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
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


  async getCompaniesByCriteria(searchDto: SearchCompanyDto): Promise<CompanyResponse[]> {
    const query: any = {};

    if (searchDto.name) {
      query.name = { $regex: new RegExp('^' + this.escapeRegex(searchDto.name), 'i') };
    }
    if (searchDto.city) {
      query.city = { $regex: new RegExp(searchDto.city + '$', 'i') };
    }
    if (searchDto.industry) {
      query.industry = searchDto.industry;
    }

    try {
      const companies = await this.companyRepository.find(query);
      return companies.length > 0 ? companies : [];
    } catch (error) {
      throw new NotFoundException('Could not get the companies from database.');
    }
  }

  async escapeRegex(text: string): Promise<string> {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }


}

