import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Patch
} from '@nestjs/common';
import { CompanyResponse, SuccessResponse } from 'src/data.response';
import { CreateUpdateCompanyDto } from './create-update-company.dto';
import { Company } from 'src/entities/company.model';
import { CompanyService } from './company.service';

@Controller('/company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Post()
    async addCompany(
        @Body() createCompanyDto: CreateUpdateCompanyDto,
    ): Promise<Company> {
        return await this.companyService.createCompany(createCompanyDto);
    }

    @Get()
    async getAllCompanies(): Promise<CompanyResponse[]> {
        return await this.companyService.getAllCompanies();
    }

    @Get(':id')
    async getSingleCompany(@Param('id') id: string): Promise<Company> {
        return await this.companyService.getSingleCompany(id);
    }

    @Patch(':id')
    async updateCompany(
      @Param('id') companyId: string,
      @Body() updateCompanyDto: CreateUpdateCompanyDto,
    ): Promise<Company> {
      return await this.companyService.updateCompany(companyId, updateCompanyDto);
    }
  
    @Delete(':id')
    async removeCompany(@Param('id') companyId: string): Promise<SuccessResponse> {
      return this.companyService.removeCompany(companyId);
    }

}
