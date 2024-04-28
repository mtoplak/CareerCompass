import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { JobAdvertisementResponse, SuccessResponse } from 'src/data.response';
import { JobAdvertisement } from 'src/entities/job-advertisement.model';

@Injectable()
export class JobAdvertisementRepository {
    constructor(
        @InjectModel('JobAdvertisement') public jobAdvertisementModel: Model<JobAdvertisement>,
    ) { }

    async findOne(jobAdvertisementFilterQuery: FilterQuery<JobAdvertisement>): Promise<JobAdvertisement> {
        try {
            return await this.jobAdvertisementModel
                .findOne(jobAdvertisementFilterQuery)
        } catch (err) {
            throw new NotFoundException('Could not get the job advertisement.');
        }
    }

    async find(jobAdvertisementsFilterQuery: FilterQuery<JobAdvertisement>): Promise<JobAdvertisementResponse[]> {
        try {
            return await this.jobAdvertisementModel
                .find(jobAdvertisementsFilterQuery)
        } catch (err) {
            throw new NotFoundException('Could not find job advertisements.');
        }
    }

    async create(jobAdvertisement: JobAdvertisement): Promise<JobAdvertisement> {
        try {
            return await new this.jobAdvertisementModel(jobAdvertisement).save();
        } catch (err) {
            throw new NotFoundException('Could not create job advertisement.');
        }
    }

    async findOneAndUpdate(
        jobAdvertisementFilterQuery: FilterQuery<JobAdvertisement>,
        jobAdvertisement: Partial<JobAdvertisement>,
        options?: QueryOptions,
      ): Promise<JobAdvertisement> {
        try {
          const updatedJobAdvertisement = await this.jobAdvertisementModel.findOneAndUpdate(
            jobAdvertisementFilterQuery,
            jobAdvertisement,
            options,
          );
          
          if (!updatedJobAdvertisement) {
            throw new NotFoundException('JobAdvertisement not found.');
          }
      
          return updatedJobAdvertisement;
        } catch (error) {
          console.error('Error updating job advertisement:', error);
          throw new InternalServerErrorException('Could not update job advertisement.');
        }
      }
      
    
      async deleteOne(jobAdvertisementFilterQuery: FilterQuery<JobAdvertisement>): Promise<SuccessResponse> {
        try {
          await this.jobAdvertisementModel.deleteOne(jobAdvertisementFilterQuery);
          return { success: true };
        } catch (err) {
          throw new NotFoundException('Could not delete job advertisement.');
        }
      }

}