import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch
} from '@nestjs/common';
import { SuccessResponse } from '../../shared/data.response';
import { JobAdvertisement } from '../../db/entities/job-advertisement.model';
import { JobAdvertisementService } from './job-advertisement.service';
import { CreateUpdateJobAdvertisementDto } from './create-update-job-advertisement.dto';

@Controller('/job')
export class JobAdvertisementController {
  constructor(private readonly jobAdvertisementService: JobAdvertisementService) { }

  @Post()
  async addJobAdvertisement(
    @Body() createJobAdvertisementDto: CreateUpdateJobAdvertisementDto,
  ): Promise<JobAdvertisement> {
    return await this.jobAdvertisementService.createJobAdvertisement(createJobAdvertisementDto);
  }

  @Get()
  async getAllJobAdvertisements(): Promise<JobAdvertisement[]> {
    return await this.jobAdvertisementService.getAllJobAdvertisements();
  }

  @Get('/company/:slug')
  async getJobsByCompany(
    @Param('slug') slug: string,
  ): Promise<JobAdvertisement[]> {
    return await this.jobAdvertisementService.getAllJobsByCompany(slug);
  }

  @Get('/link')
  async linkCompanies(): Promise<JobAdvertisement[]> {
    return await this.jobAdvertisementService.linkCompanies();
  }

  @Get('/save/:jobId/:userEmail')
  async saveJobsToUser(
    @Param('jobId') jobId: string,
    @Param('userEmail') userEmail: string,
  ): Promise<SuccessResponse> {
    return await this.jobAdvertisementService.saveJobAdToUser(jobId, userEmail);
  }

  @Get('/unsave/:jobId/:userEmail')
  async unsaveJobsToUser(
    @Param('jobId') jobId: string,
    @Param('userEmail') userEmail: string,
  ): Promise<SuccessResponse> {
    return await this.jobAdvertisementService.unsaveJobAdToUser(jobId, userEmail);
  }

  @Get('/saved/:userEmail')
  async getSavedJobsByUser(
    @Param('userEmail') userEmail: string,
  ): Promise<JobAdvertisement[]> {
    return await this.jobAdvertisementService.getSavedJobsByUser(userEmail);
  }

  @Post('/popular')
  async getPopularJobs(
    @Body('userEmail') userEmail: string | null,
  ): Promise<JobAdvertisement[]> {
    return await this.jobAdvertisementService.getPopularJobs(userEmail);
  }

  @Get(':id')
  async getSingleJobAdvertisement(@Param('id') id: string): Promise<JobAdvertisement> {
    return await this.jobAdvertisementService.getSingleJobAdvertisement(id);
  }

  @Patch(':id')
  async updateJobAdvertisement(
    @Param('id') jobAdvertisementId: string,
    @Body() updateJobAdvertisementDto: CreateUpdateJobAdvertisementDto,
  ): Promise<JobAdvertisement> {
    return await this.jobAdvertisementService.updateJobAdvertisement(jobAdvertisementId, updateJobAdvertisementDto);
  }

  @Delete(':id')
  async removeJobAdvertisement(@Param('id') jobAdvertisementId: string): Promise<SuccessResponse> {
    return this.jobAdvertisementService.removeJobAdvertisement(jobAdvertisementId);
  }

}
