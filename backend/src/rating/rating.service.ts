import { Injectable, NotFoundException } from '@nestjs/common';
import { RatingResponse, SuccessResponse } from 'src/data.response';
import { RatingRepository } from './rating.repository';
import { CreateUpdateRatingDto } from './create-update-rating.dto';
import { Rating } from 'src/entities/rating.model';
import { CompanyRepository } from 'src/company/company.repository';

@Injectable()
export class RatingService {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly companyRepository: CompanyRepository
  ) { }

  async createRating(ratingData: CreateUpdateRatingDto): Promise<Rating> {
    try {
      const newRating = await this.ratingRepository.create(ratingData);
      const company = await this.companyRepository.findOne({ _id: newRating.company });
      if (!company) {
        throw new Error(`Could not find company with id ${newRating.company}`);
      } else {
        await this.calculateAverageRating(newRating._id, company._id);
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


  async calculateAverageRating(ratingId: string, companyId: string): Promise<void> {
    const rating = await this.ratingRepository.findOne({ _id: ratingId });
    const company = await this.companyRepository.findOne({ _id: companyId });

    const categories = [
      'team', 'personal_development', 'flexibility', 'work_life_balance',
      'work_enviroment', 'leadership', 'benefits', 'bonuses'
    ];
    categories.forEach(category => {
      const avgField = `avg_${category}`;
      const currentAvg = company[avgField] || 0;
      const newAvg = ((currentAvg * company.ratings_count) + rating[category]) / (company.ratings_count + 1);
      company[avgField] = newAvg;
    });

    const sumOfAverages = categories.reduce((acc, category) => {
      const avgField = `avg_${category}`;
      return acc + (company[avgField] || 0);
    }, 0);

    company.avg_rating = sumOfAverages / categories.length;
    company.ratings_count += 1;

    await company.save();
  }

}
