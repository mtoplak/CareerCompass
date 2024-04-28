import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { RatingResponse, SuccessResponse } from 'src/data.response';
import { Rating } from 'src/entities/rating.model';

@Injectable()
export class RatingRepository {
  constructor(
    @InjectModel('Rating') public ratingModel: Model<Rating>,
  ) { }

  async findOne(ratingFilterQuery: FilterQuery<Rating>): Promise<RatingResponse> {
    try {
      return await this.ratingModel
        .findOne(ratingFilterQuery)
    } catch (err) {
      throw new NotFoundException('Could not get the rating.');
    }
  }

  async find(ratingsFilterQuery: FilterQuery<Rating>, session = null): Promise<RatingResponse[]> {
    try {
      const options = session ? { session } : {};
      return await this.ratingModel
        .find(ratingsFilterQuery, options)
    } catch (err) {
      throw new NotFoundException('Could not find ratings.');
    }
  }

  async createSession(rating: Rating, session = null): Promise<Rating> {
    try {
      const options = session ? { session } : {};
      return await new this.ratingModel(rating).save(options);
    } catch (err) {
      throw new NotFoundException('Could not create rating.');
    }
  }

  async create(rating: Rating): Promise<Rating> {
    try {
      return await new this.ratingModel(rating).save();
    } catch (err) {
      throw new NotFoundException('Could not create rating.');
    }
  }

  async findOneAndUpdate(
    ratingFilterQuery: FilterQuery<Rating>,
    rating: Partial<Rating>,
    options?: QueryOptions,
  ): Promise<Rating> {
    try {
      const updatedRating = await this.ratingModel.findOneAndUpdate(
        ratingFilterQuery,
        rating,
        options,
      );

      if (!updatedRating) {
        throw new NotFoundException('Rating not found.');
      }

      return updatedRating;
    } catch (error) {
      console.error('Error updating rating:', error);
      throw new InternalServerErrorException('Could not update rating.');
    }
  }


  async deleteOne(ratingFilterQuery: FilterQuery<Rating>): Promise<SuccessResponse> {
    try {
      await this.ratingModel.deleteOne(ratingFilterQuery);
      return { success: true };
    } catch (err) {
      throw new NotFoundException('Could not delete rating.');
    }
  }

}