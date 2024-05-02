import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Patch,
    Logger
} from '@nestjs/common';
import { CompanyResponse, SuccessResponse } from 'src/data.response';
import { CreateUpdateCompanyDto } from './dto/create-update-company.dto';
import { Company } from 'src/db/entities/company.model';
import { CompanyService } from './company.service';
import { SearchCompanyDto } from './dto/search-company.dto';

@Controller('/company')
export class CompanyController {
    private readonly logger = new Logger(CompanyController.name);

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

    @Get('/id/:id')
    async getSingleCompany(@Param('id') id: string): Promise<Company> {
        return await this.companyService.getSingleCompany(id);
    }

    @Get(':slug')
    async getCompanyBySlug(@Param('slug') slug: string): Promise<Company> {
        return await this.companyService.getCompanyBySlug(slug);
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


    @Post('/search')
    async getCompaniesByCriteria(@Body() searchDto: SearchCompanyDto): Promise<CompanyResponse[]> {
        return await this.companyService.getCompaniesByCriteria(searchDto);
    }
    /*
        @Get("/best")
        async getFourBest(): Promise<CompanyResponse[]> {
            this.logger.log("getFourBesttttt");
    
            console.log("getFourBest");
            const b = await this.companyService.getFourBestCompanies();
            console.log("prisu sem tja");
            console.log(b);
            return b;
        } 
    
        @Get('/bestic')
        async getFourBest(): Promise<string> {
            console.log("getFourBest endpoint hit");
            return 'This is a test response';
        }
        */

}
