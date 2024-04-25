import { Injectable, NotFoundException } from '@nestjs/common';
import { JobAdvertisementResponse, SuccessResponse } from 'src/data.response';
import { CreateUpdateJobAdvertisementDto } from './create-update-job-advertisement.dto';
import { JobAdvertisement } from 'src/entities/job-advertisement.model';
import { JobAdvertisementRepository } from './job-advertisement.repository';

@Injectable()
export class JobAdvertisementService {
    constructor(private readonly jobAdvertisementRepository: JobAdvertisementRepository) { }

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

    async getAllCompanies(): Promise<JobAdvertisementResponse[]> {
        try {
            return await this.jobAdvertisementRepository.find({});
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

}
