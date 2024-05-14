import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { SuccessResponse } from '../../shared/data.response';
import { AverageRatingDto } from './average-rating.dto';
import { AverageRating } from '../../db/entities/average-rating.model';

@Injectable()
export class AverageRatingRepository {
  constructor(
    @InjectModel('AverageRating') public averageRatingModel: Model<AverageRating>,
  ) { }

  async findOne(averageRatingFilterQuery: FilterQuery<AverageRating>): Promise<AverageRatingDto> {
    try {
      return await this.averageRatingModel
        .findOne(averageRatingFilterQuery);
    } catch (err) {
      throw new NotFoundException('Could not get the averageRating from database!');
    }
  }

  async find(): Promise<AverageRatingDto[]> {
    try {
      return await this.averageRatingModel.find();
    } catch (err) {
      throw new NotFoundException('Error fetching average ratings.');
    }
  }

  async create(averageRating: AverageRating): Promise<AverageRating> {
    try {
      return await new this.averageRatingModel(averageRating).save();
    }
    catch (err) {
      console.error('Error creating averageRating:', err);
      throw new NotFoundException('Could not create averageRating.');
    }

  }

  async findOneAndUpdate(
    averageRatingFilterQuery: FilterQuery<AverageRating>,
    averageRating: Partial<AverageRating>,
    options?: QueryOptions,
  ): Promise<AverageRating> {
    try {
      const updatedAverageRating = await this.averageRatingModel.findOneAndUpdate(
        averageRatingFilterQuery,
        averageRating,
        options,
      );

      if (!updatedAverageRating) {
        throw new NotFoundException('AverageRating not found.');
      }

      return updatedAverageRating;
    } catch (error) {
      console.error('Error updating averageRating:', error);
      throw new InternalServerErrorException('Could not update averageRating.');
    }
  }


  async deleteOne(averageRatingFilterQuery: FilterQuery<AverageRating>): Promise<SuccessResponse> {
    try {
      await this.averageRatingModel.deleteOne(averageRatingFilterQuery);
      return { success: true };
    } catch (err) {
      throw new NotFoundException('Could not delete averageRating.');
    }
  }

}