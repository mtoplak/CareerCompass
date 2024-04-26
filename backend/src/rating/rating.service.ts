import { Injectable, NotFoundException } from '@nestjs/common';
import { RatingResponse, SuccessResponse } from 'src/data.response';
import { RatingRepository } from './rating.repository';
import { CreateUpdateRatingDto } from './create-update-rating.dto';
import { Rating } from 'src/entities/rating.model';

@Injectable()
export class RatingService {
  constructor(private readonly ratingRepository: RatingRepository) { }

  async createRating(ratingData: CreateUpdateRatingDto): Promise<Rating> {
    try {
      return await this.ratingRepository.create(ratingData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getAllRatings(): Promise<RatingResponse[]> {
    try {
      return await this.ratingRepository.find({});
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getSingleRating(ratingId: string): Promise<Rating> {
    try {
      return await this.ratingRepository.findOne({ _id: ratingId });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async updateRating(
    ratingId: string,
    ratingUpdates: CreateUpdateRatingDto,
  ): Promise<Rating> {
    try {
      return await this.ratingRepository.findOneAndUpdate(
        { _id: ratingId },
        ratingUpdates,
        { new: true },
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async removeRating(ratingId: string): Promise<SuccessResponse> {
    return await this.ratingRepository.deleteOne({ _id: ratingId });
  }

}
