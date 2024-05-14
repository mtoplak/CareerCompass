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
import { CompanyDto } from './dto/company.dto';
import { CompanyService } from './company.service';
import { SearchCompanyDto } from './dto/search-company.dto';
import { CompanyMapper } from './company.mapper';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('/company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
        private readonly companyMapper: CompanyMapper
    ) { }

    @Post()
    async addCompany(
        @Body() createCompanyDto: CompanyDto,
    ): Promise<CompanyDto> {
        return await this.companyService.createCompany(createCompanyDto);
    }

    @Get()
    async getAllCompanies(
        @Query('page') page: string,
        @Query('size') size: string
    ): Promise<CompanyDto[]> {
        const pageNum = parseInt(page, 10) || 1;
        const sizeNum = parseInt(size, 10) || 28;

        return await this.companyService.getAllCompanies(pageNum, sizeNum);
    }

    @Get('/id/:id')
    async getSingleCompany(@Param('id') id: string): Promise<CompanyDto> {
        return await this.companyService.getSingleCompany(id);
    }

    @Get('/best')
    async getFourBest(): Promise<CompanyDto[]> {
        return await this.companyService.getFourBestCompanies();
    }

    @Get('/search')
    async getCompaniesByCriteria(
        @Query() searchDto: SearchCompanyDto,
        @Query('page') page: string,
        @Query('size') size: string
    ): Promise<CompanyDto[]> {
        const pageNum = parseInt(page, 10) || 1;
        const sizeNum = parseInt(size, 10) || 28;

        return await this.companyService.getCompaniesByCriteria(searchDto, pageNum, sizeNum);
    }

    @Get(':slug')
    async getCompanyBySlug(@Param('slug') slug: string): Promise<CompanyDto> {
        return await this.companyService.getCompanyBySlug(slug);
    }

    @Patch(':id')
    async updateCompany(
        @Param('id') companyId: string,
        @Body() updateCompanyDto: UpdateCompanyDto,
    ): Promise<CompanyDto> {
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
