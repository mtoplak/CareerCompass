import { Injectable, NotFoundException } from '@nestjs/common';
import { SuccessResponse } from '../../shared/data.response';
import { CreateUpdateJobAdvertisementDto } from './create-update-job-advertisement.dto';
import { JobAdvertisement } from '../../db/entities/job-advertisement.model';
import { JobAdvertisementRepository } from './job-advertisement.repository';
import { CompanyRepository } from '../company/company.repository';

@Injectable()
export class JobAdvertisementService {
  constructor(
    private readonly jobAdvertisementRepository: JobAdvertisementRepository,
    private readonly companyRepository: CompanyRepository,
  ) { }

  async createJobAdvertisement(jobAdvertisementData: CreateUpdateJobAdvertisementDto): Promise<JobAdvertisement> {
    try {
      return await this.jobAdvertisementRepository.create(jobAdvertisementData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getAllJobAdvertisements(): Promise<JobAdvertisement[]> {
    try {
      return await this.jobAdvertisementRepository.find();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getSingleJobAdvertisement(jobAdvertisementId: string): Promise<JobAdvertisement> {
    try {
      return await this.jobAdvertisementRepository.findOne({ _id: jobAdvertisementId });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getAllJobsByCompany(slug: string): Promise<JobAdvertisement[]> {
    try {
      const company = await this.companyRepository.findOne({ slug: slug });
      if (!company) {
        throw new NotFoundException('Company not found');
      }
      const jobs = await this.jobAdvertisementRepository.findBy({ company_linked: company._id });
      return jobs;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async updateJobAdvertisement(
    jobAdvertisementId: string,
    jobAdvertisementUpdates: CreateUpdateJobAdvertisementDto,
  ): Promise<JobAdvertisement> {
    try {
      return await this.jobAdvertisementRepository.findOneAndUpdate(
        { _id: jobAdvertisementId },
        jobAdvertisementUpdates,
        { new: true },
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async removeJobAdvertisement(jobAdvertisementId: string): Promise<SuccessResponse> {
    return await this.jobAdvertisementRepository.deleteOne({ _id: jobAdvertisementId });
  }

  async linkCompanies(): Promise<JobAdvertisement[]> {
    const updated = [];
    try {
      const jobAdvertisements = await this.jobAdvertisementRepository.find();
      console.log(jobAdvertisements.length);

      for (const jobAd of jobAdvertisements) {
        const matchingCompany = await this.companyRepository.findOne({ name: { $regex: new RegExp(`^${jobAd.company}$`, 'i') } });

        if (matchingCompany) {
          jobAd.company_linked = matchingCompany._id;
          await jobAd.save();
          updated.push(jobAd);
        }
      }
      console.log(updated.length);
      return updated;
    } catch (error) {
      console.error('Error linking companies to job advertisements:', error);
    }
  }

}
