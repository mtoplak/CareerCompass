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
    constructor(private readonly podjetjeService: CompanyService) { }

    @Post()
    async addCompany(
        @Body() createCompanyDto: CreateUpdateCompanyDto,
    ): Promise<Company> {
        return await this.podjetjeService.createCompany(createCompanyDto);
    }

    @Get()
    async getAllPodjetja(): Promise<CompanyResponse[]> {
        return await this.podjetjeService.getAllPodjetja();
    }

    @Get(':id')
    async getSingleCompany(@Param('id') id: string): Promise<Company> {
        return await this.podjetjeService.getSingleCompany(id);
    }

    @Patch(':id')
    async updateCompany(
      @Param('id') podjetjeId: string,
      @Body() updateCompanyDto: CreateUpdateCompanyDto,
    ): Promise<Company> {
      return await this.podjetjeService.updateCompany(podjetjeId, updateCompanyDto);
    }
  
    @Delete(':id')
    async removeCompany(@Param('id') podjetjeId: string): Promise<SuccessResponse> {
      return this.podjetjeService.removeCompany(podjetjeId);
    }

}
