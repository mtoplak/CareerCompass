import { Injectable, NotFoundException } from '@nestjs/common';
import { SuccessResponse } from '../../shared/data.response';
import { CreateUpdateJobAdvertisementDto } from './create-update-job-advertisement.dto';
import { JobAdvertisement } from '../../db/entities/job-advertisement.model';
import { JobAdvertisementRepository } from './job-advertisement.repository';
import { CompanyRepository } from '../company/company.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class JobAdvertisementService {
  constructor(
    private readonly jobAdvertisementRepository: JobAdvertisementRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository
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

  async saveJobAdToUser(jobId: string, userEmail: string): Promise<SuccessResponse> {
    try {
      const user = await this.userRepository.findOne({ email: userEmail });
      if (!user) {
        throw new Error('User not found');
      }

      const jobAd = await this.jobAdvertisementRepository.findOne({ _id: jobId });
      if (!jobAd) {
        throw new Error('Job Advertisement not found');
      }

      if (!user.saved_advertisements.includes(jobAd._id)) {
        user.saved_advertisements.push(jobAd);
        await user.save();
        return { success: true };
      } else if (user.saved_advertisements.includes(jobAd._id)) {
        return { success: false };
      }

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async unsaveJobAdToUser(jobId: string, userEmail: string): Promise<SuccessResponse> {
    const user = await this.userRepository.findOne({ email: userEmail });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const jobAd = await this.jobAdvertisementRepository.findOne({ _id: jobId });
    if (!jobAd) {
      throw new NotFoundException('Job Advertisement not found');
    }

    const jobIndex = user.saved_advertisements.indexOf(jobAd._id);
    if (jobIndex !== -1) {
      user.saved_advertisements.splice(jobIndex, 1);
      await user.save();
      return { success: true };
    } else {
      return { success: false };
    }
  }

  async getSavedJobsByUser(userEmail: string): Promise<JobAdvertisement[]> {
    const user = await this.userRepository.findOne({ email: userEmail });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const savedJobs = await this.jobAdvertisementRepository.findBy({ _id: { $in: user.saved_advertisements } });

    return savedJobs;
  }

  async getPopularJobs(): Promise<JobAdvertisement[]> {
    try {
      return await this.jobAdvertisementRepository.findFilters({}, {
        limit: 8,
        sort: { _id: -1 },
      });
    } catch (error) {
      throw error;
    }
  }

}
