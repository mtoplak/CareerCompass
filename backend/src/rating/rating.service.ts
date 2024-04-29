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

    // remote work
    if (rating.remote_work === true) {
      company.remote_work_distribution.yes += 1;
    } else if (rating.remote_work === false) {
      company.remote_work_distribution.no += 1;
    }
    const remoteWorkPercentages = await this.calculateRemoteWorkPercentages(company.remote_work_distribution);
    company.remote_work_percentage = {
      yes: parseFloat(remoteWorkPercentages.yes),
      no: parseFloat(remoteWorkPercentages.no),
    };

    // experience and difficulty
    company.experience_distribution[rating.experience.toLowerCase()] += 1;
    company.difficulty_distribution[rating.difficulty.toLowerCase()] += 1;
    const experiencePercentages = await this.calculateExperiencePercentages(company.experience_distribution);
    const difficultyPercentages = await this.calculateDifficultyPercentages(company.difficulty_distribution);
    company.experience_percentage = {
      pozitivna: parseFloat(experiencePercentages.pozitivna),
      nevtralna: parseFloat(experiencePercentages.nevtralna),
      negativna: parseFloat(experiencePercentages.negativna),
    };
    company.difficulty_percentage = {
      enostavno: parseFloat(difficultyPercentages.enostavno),
      srednje: parseFloat(difficultyPercentages.srednje),
      težko: parseFloat(difficultyPercentages.težko),
    };

    company.ratings_count += 1;

    await company.save();
  }

  async calculateRemoteWorkPercentages(distribution) {
    const totalRemote = distribution.yes + distribution.no;
    return {
      yes: ((distribution.yes / totalRemote) * 100).toFixed(2),
      no: ((distribution.no / totalRemote) * 100).toFixed(2)
    };
  }

  async calculateExperiencePercentages(distribution) {
    const total = distribution.pozitivna + distribution.nevtralna + distribution.negativna;
    return {
      pozitivna: (distribution.pozitivna / total * 100).toFixed(2),
      nevtralna: (distribution.nevtralna / total * 100).toFixed(2),
      negativna: (distribution.negativna / total * 100).toFixed(2)
    };
  }

  async calculateDifficultyPercentages(distribution) {
    const total = distribution.enostavno + distribution.srednje + distribution.težko;
    return {
      enostavno: (distribution.enostavno / total * 100).toFixed(2),
      srednje: (distribution.srednje / total * 100).toFixed(2),
      težko: (distribution.težko / total * 100).toFixed(2)
    };
  }

}
