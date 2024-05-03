import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { SuccessResponse } from 'src/shared/data.response';
import { Company } from 'src/db/entities/company.model';
import { CompanyDto } from './dto/create-update-company.dto';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel('Company') public companyModel: Model<Company>,
  ) { }

  async findOne(companyFilterQuery: FilterQuery<Company>): Promise<CompanyDto> {
    try {
      return await this.companyModel
        .findOne(companyFilterQuery);
    } catch (err) {
      throw new NotFoundException('Could not get the company from database!');
    }
  }

  async find(filter: any, options: any = {}): Promise<CompanyDto[]> {
    try {
      return await this.companyModel.find(filter, null, options) as CompanyDto[];
    } catch (err) {
      throw new NotFoundException('Error fetching companies.');
    }
  }

  async create(company: Company): Promise<Company> {
    try {
      return await new this.companyModel(company).save();
    }
    catch (err) {
      console.error('Error creating company:', err);
      throw new NotFoundException('Could not create company.');
    }

  }

  async findOneAndUpdate(
    companyFilterQuery: FilterQuery<Company>,
    company: Partial<Company>,
    options?: QueryOptions,
  ): Promise<Company> {
    try {
      const updatedCompany = await this.companyModel.findOneAndUpdate(
        companyFilterQuery,
        company,
        options,
      );

      if (!updatedCompany) {
        throw new NotFoundException('Company not found.');
      }

      return updatedCompany;
    } catch (error) {
      console.error('Error updating company:', error);
      throw new InternalServerErrorException('Could not update company.');
    }
  }


  async deleteOne(companyFilterQuery: FilterQuery<Company>): Promise<SuccessResponse> {
    try {
      await this.companyModel.deleteOne(companyFilterQuery);
      return { success: true };
    } catch (err) {
      throw new NotFoundException('Could not delete company.');
    }
  }

}