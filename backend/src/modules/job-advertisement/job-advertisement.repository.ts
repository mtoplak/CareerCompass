import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { SuccessResponse } from '../../shared/data.response';
import { JobAdvertisement } from '../../db/entities/job-advertisement.model';

@Injectable()
export class JobAdvertisementRepository {
  constructor(
    @InjectModel('JobAdvertisement') public jobAdvertisementModel: Model<JobAdvertisement>,
  ) { }

  async findOne(jobAdvertisementFilterQuery: FilterQuery<JobAdvertisement>): Promise<JobAdvertisement> {
    try {
      return await this.jobAdvertisementModel
        .findOne(jobAdvertisementFilterQuery);
    } catch (err) {
      throw new NotFoundException('Could not get the job advertisement.');
    }
  }

  async find(): Promise<JobAdvertisement[]> {
    try {
      return await this.jobAdvertisementModel
        .find();
    } catch (err) {
      throw new NotFoundException('Could not find job advertisements.');
    }
  }

  async findBy(jobAdvertisementFilterQuery: FilterQuery<JobAdvertisement>): Promise<JobAdvertisement[]> {
    try {
      return await this.jobAdvertisementModel
        .find(jobAdvertisementFilterQuery);
    } catch (err) {
      throw new NotFoundException('Could not find job advertisements by a company.');
    }
  }

  async findFilters(filter: any, options: any = {}): Promise<JobAdvertisement[]> {
    try {
      return await this.jobAdvertisementModel.find(filter, null, options);
    } catch (err) {
      throw new NotFoundException('Error fetching companies.');
    }
  }

  async create(jobAdvertisement: JobAdvertisement): Promise<JobAdvertisement> {
    try {
      return await new this.jobAdvertisementModel(jobAdvertisement).save();
    } catch (err) {
      throw new NotFoundException('Could not create job advertisement.');
    }
  }

  async createMany(jobAdvertisements: JobAdvertisement[]): Promise<JobAdvertisement[]> {
    try {
      return await this.jobAdvertisementModel.insertMany(jobAdvertisements);
    } catch (err) {
      throw new InternalServerErrorException('Could not create multiple job advertisements.');
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

  async deleteMany(filter: any): Promise<any> {
    return this.jobAdvertisementModel.deleteMany(filter).exec();
  }

}