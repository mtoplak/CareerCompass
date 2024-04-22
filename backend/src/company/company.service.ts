import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CreateUpdateCompanyDto } from './create-update-company.dto';
import { Company } from 'src/entities/company.model';
import { CompanyResponse, SuccessResponse } from 'src/data.response';

@Injectable()
export class CompanyService {
    constructor(private readonly companyRepository: CompanyRepository) { }

    async createCompany(companyData: CreateUpdateCompanyDto): Promise<Company> {
        try {
            return await this.companyRepository.create(companyData);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }

    async getAllCompanies(): Promise<CompanyResponse[]> {
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

    async updateCompany(
        companyId: string,
        companyUpdates: CreateUpdateCompanyDto,
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

}
