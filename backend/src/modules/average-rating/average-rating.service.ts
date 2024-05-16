import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { SuccessResponse } from '../../shared/data.response';
import { AverageRatingRepository } from './average-rating.repository';
import { AverageRating, AverageRatingModel } from '../../db/entities/average-rating.model';
import { RatingRepository } from '../rating/rating.repository';
import { AiService } from '../ai/ai.service';
import { AverageRatingDto } from './average-rating.dto';

@Injectable()
export class AverageRatingService {
  constructor(
    private readonly averageRatingRepository: AverageRatingRepository,
    private readonly ratingRepository: RatingRepository,
    private readonly aiService: AiService
  ) { }

  async calculateAverageRating(ratingId: string, companyId: string): Promise<void> {
    const rating = await this.ratingRepository.findOne({ _id: ratingId });

    let averageRating = await this.averageRatingRepository.findOne({ company: companyId });

    if (!averageRating) {
      averageRating = new AverageRatingModel({
        company: companyId,
        avg_rating: 0,
        ratings_count: 0,
        avg_team: 0,
        avg_personal_development: 0,
        avg_flexibility: 0,
        avg_work_life_balance: 0,
        avg_work_environment: 0,
        avg_leadership: 0,
        avg_benefits: 0,
        avg_bonuses: 0,
        general_assessment_comments: [],
        salary_and_benefits_comments: [],
        interviews_comments: [],
        avg_duration: [],
        remote_work_distribution: {
          yes: 0,
          no: 0
        },
        remote_work_percentage: {
          yes: 0,
          no: 0
        },
        experience_distribution: {
          pozitivna: 0,
          nevtralna: 0,
          negativna: 0
        },
        experience_percentage: {
          pozitivna: 0,
          nevtralna: 0,
          negativna: 0
        },
        difficulty_distribution: {
          enostavno: 0,
          srednje: 0,
          težko: 0
        },
        difficulty_percentage: {
          enostavno: 0,
          srednje: 0,
          težko: 0
        }
      });
    }

    const categories = [
      'team', 'personal_development', 'flexibility', 'work_life_balance',
      'work_environment', 'leadership', 'benefits', 'bonuses'
    ];

    categories.forEach(category => {
      if (rating[category] != null) {
        const avgField = `avg_${category}`;
        const currentAvg = averageRating[avgField] || 0;
        const newAvg = ((currentAvg * averageRating.ratings_count) + rating[category]) / (averageRating.ratings_count + 1);
        averageRating[avgField] = newAvg;
      }
    });

    const sumOfAverages = categories.reduce((acc, category) => {
      const avgField = `avg_${category}`;
      return acc + (averageRating[avgField] || 0);
    }, 0);

    averageRating.avg_rating = sumOfAverages / categories.length;

    // remote work
    if (rating.remote_work === true) {
      averageRating.remote_work_distribution.yes += 1;
    } else if (rating.remote_work === false) {
      averageRating.remote_work_distribution.no += 1;
    }
    const remoteWorkPercentages = await this.calculateRemoteWorkPercentages(averageRating.remote_work_distribution);
    averageRating.remote_work_percentage = {
      yes: parseFloat(remoteWorkPercentages.yes),
      no: parseFloat(remoteWorkPercentages.no),
    };

    // experience
    if (rating.experience) {
      averageRating.experience_distribution[rating.experience.toLowerCase()] += 1;
      const experiencePercentages = await this.calculateExperiencePercentages(averageRating.experience_distribution);
      averageRating.experience_percentage = {
        pozitivna: parseFloat(experiencePercentages.pozitivna),
        nevtralna: parseFloat(experiencePercentages.nevtralna),
        negativna: parseFloat(experiencePercentages.negativna),
      };
    }

    // difficulty
    if (rating.difficulty) {
      averageRating.difficulty_distribution[rating.difficulty.toLowerCase()] += 1;
      const difficultyPercentages = await this.calculateDifficultyPercentages(averageRating.difficulty_distribution);
      averageRating.difficulty_percentage = {
        enostavno: parseFloat(difficultyPercentages.enostavno),
        srednje: parseFloat(difficultyPercentages.srednje),
        težko: parseFloat(difficultyPercentages.težko),
      };
    }

    // Check and add comments
    const commentCheckResults = [
      { comment: rating.general_assessment_comment, field: 'general_assessment_comment' },
      { comment: rating.salary_and_benefits_comment, field: 'salary_and_benefits_comment' },
      { comment: rating.interviews_comment, field: 'interviews_comment' },
      { comment: rating.duration, field: 'duration' }
    ];

    for (const { comment, field } of commentCheckResults) {
      if (comment) {
        const isAppropriate = await this.checkAndAddComment(comment, averageRating[`${field}s`]);
        if (!isAppropriate) {
          throw new HttpException(`Comment for ${field} is inappropriate`, HttpStatus.BAD_REQUEST);
        }
      }
    }

    averageRating.ratings_count += 1;

    await averageRating.save();
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

  async checkAndAddComment(comment: string, commentsArray: string[]): Promise<boolean> {
    const isAppropriate = await this.aiService.checkComment(comment);
    if (isAppropriate) {
      commentsArray.push(comment);
    }
    return isAppropriate;
  }

  async getSingleAverageRating(averageRatingId: string): Promise<AverageRating> {
    try {
      return await this.averageRatingRepository.findOne({ _id: averageRatingId });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async updateAverageRating(
    averageRatingId: string,
    averageRatingUpdates: AverageRatingDto,
  ): Promise<AverageRating> {
    try {
      return await this.averageRatingRepository.findOneAndUpdate(
        { _id: averageRatingId },
        averageRatingUpdates,
        { new: true },
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async removeAverageRating(averageRatingId: string): Promise<SuccessResponse> {
    return await this.averageRatingRepository.deleteOne({ _id: averageRatingId });
  }
}
