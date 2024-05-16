import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { RatingResponse, SuccessResponse } from '../../shared/data.response';
import { RatingRepository } from './rating.repository';
import { CreateUpdateRatingDto } from './create-update-rating.dto';
import { Rating } from '../../db/entities/rating.model';
import { CompanyRepository } from '../../modules/company/company.repository';
import { AverageRatingService } from '../average-rating/average-rating.service';

@Injectable()
export class RatingService {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly averageService: AverageRatingService,
  ) { }

  async createRating(ratingData: CreateUpdateRatingDto): Promise<Rating> {
    try {
      const requiredFields = [
        'team', 'personal_development', 'flexibility', 'work_life_balance',
        'work_environment', 'leadership', 'benefits', 'remote_work', 'bonuses',
        'experience', 'difficulty'
      ];

      for (const field of requiredFields) {
        if (ratingData[field] == null) {
          throw new HttpException(`Field ${field} is missing`, HttpStatus.BAD_REQUEST);
        }
      }

      const newRating = await this.ratingRepository.create(ratingData);
      const company = await this.companyRepository.findOne({ slug: newRating.company_slug });

      if (!company) {
        throw new Error(`Could not find company with slug ${newRating.company_slug}`);
      } else {
        await this.averageService.calculateAverageRating(newRating._id, company.id);
        return newRating;
      }
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

  async getSingleRating(ratingId: string): Promise<RatingResponse> {
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
