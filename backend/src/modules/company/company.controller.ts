import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Patch,
    Query,
} from '@nestjs/common';
import { SuccessResponse } from '../../shared/data.response';
import { CompanyDto } from './dto/create-update-company.dto';
import { Company } from '../../db/entities/company.model';
import { CompanyService } from './company.service';
import { SearchCompanyDto } from './dto/search-company.dto';
import { CompanyMapper } from './company.mapper';

@Controller('/company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
        private readonly companyMapper: CompanyMapper
    ) { }

    @Post()
    async addCompany(
        @Body() createCompanyDto: CompanyDto,
    ): Promise<Company> {
        return await this.companyService.createCompany(createCompanyDto);
    }

    @Get()
    async getAllCompanies(): Promise<CompanyDto[]> {
        const companies = await this.companyService.getAllCompanies();
        return this.companyMapper.mapCompany(companies);
    }

    @Get('/id/:id')
    async getSingleCompany(@Param('id') id: string): Promise<CompanyDto> {
        const company = await this.companyService.getSingleCompany(id);
        return this.companyMapper.mapOneCompany(company);
    }

    @Get('/best')
    async getFourBest(): Promise<CompanyDto[]> {
        const companies = await this.companyService.getFourBestCompanies();
        return this.companyMapper.mapCompany(companies);
    }

    @Get('/search')
    async getCompaniesByCriteria(@Query() searchDto: SearchCompanyDto): Promise<CompanyDto[]> {
        return await this.companyService.getCompaniesByCriteria(searchDto);
    }

    @Get(':slug')
    async getCompanyBySlug(@Param('slug') slug: string): Promise<CompanyDto> {
        const company = await this.companyService.getCompanyBySlug(slug);
        return this.companyMapper.mapOneCompany(company);
    }

    @Patch(':id')
    async updateCompany(
        @Param('id') companyId: string,
        @Body() updateCompanyDto: CompanyDto,
    ): Promise<Company> {
        return await this.companyService.updateCompany(companyId, updateCompanyDto);
    }

    @Delete(':id')
    async removeCompany(@Param('id') companyId: string): Promise<SuccessResponse> {
        return this.companyService.removeCompany(companyId);
    }

    @Post('/claim')
    async claimCompany(
        @Body('email') email: string,
    ): Promise<SuccessResponse> {
        return await this.companyService.checkEmail(email);
    }

}
