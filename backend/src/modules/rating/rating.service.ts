import { Injectable, NotFoundException } from '@nestjs/common';
import { RatingResponse, SuccessResponse } from '../../shared/data.response';
import { RatingRepository } from './rating.repository';
import { CreateUpdateRatingDto } from './create-update-rating.dto';
import { Rating } from '../../db/entities/rating.model';
import { CompanyRepository } from '../../modules/company/company.repository';
import { AiService } from '../../ai/ai.service';

@Injectable()
export class RatingService {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly aiService: AiService
  ) { }

  async createRating(ratingData: CreateUpdateRatingDto): Promise<Rating> {
    try {
      const newRating = await this.ratingRepository.create(ratingData);
      console.log(newRating);
      
      const company = await this.companyRepository.findOne({ slug: newRating.company_slug });
      if (!company) {
        throw new Error(`Could not find company with slug ${newRating.company_slug}`);
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
      'work_environment', 'leadership', 'benefits', 'bonuses'
    ];
    categories.forEach(category => {
      if (rating[category] != null) {
        const avgField = `avg_${category}`;
        const currentAvg = company[avgField] || 0;
        const newAvg = ((currentAvg * company.ratings_count) + rating[category]) / (company.ratings_count + 1);
        company[avgField] = newAvg;
      }
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
    if (rating.experience) {
      company.experience_distribution[rating.experience.toLowerCase()] += 1;
      const experiencePercentages = await this.calculateExperiencePercentages(company.experience_distribution);
      company.experience_percentage = {
        pozitivna: parseFloat(experiencePercentages.pozitivna),
        nevtralna: parseFloat(experiencePercentages.nevtralna),
        negativna: parseFloat(experiencePercentages.negativna),
      };
    }

    if (rating.difficulty) {
      company.difficulty_distribution[rating.difficulty.toLowerCase()] += 1;
      const difficultyPercentages = await this.calculateDifficultyPercentages(company.difficulty_distribution);
      company.difficulty_percentage = {
        enostavno: parseFloat(difficultyPercentages.enostavno),
        srednje: parseFloat(difficultyPercentages.srednje),
        težko: parseFloat(difficultyPercentages.težko),
      };
    }

    //TODO: odkomentiraj
    /* 
        await this.checkAndAddComment(rating.general_assessment_comment, company.general_assessment_comments);
        await this.checkAndAddComment(rating.salary_and_benefits_comment, company.salary_and_benefits_comments);
        await this.checkAndAddComment(rating.interviews_comment, company.interviews_comments);
        await this.checkAndAddComment(rating.duration, company.avg_duration);
    */

    //TODO: zakomentiraj
    if (rating.general_assessment_comment) {
      company.general_assessment_comments.push(rating.general_assessment_comment);
    }
    if (rating.salary_and_benefits_comment) {
      company.salary_and_benefits_comments.push(rating.salary_and_benefits_comment);
    }
    if (rating.interviews_comment) {
      company.interviews_comments.push(rating.interviews_comment);
    }
    if (rating.duration) {
      company.avg_duration.push(rating.duration);
    }

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

  private async checkAndAddComment(comment: string, commentsArray: string[]) {
    if (comment) {
      const isAppropriate = await this.aiService.checkComment(comment);
      if (isAppropriate) {
        commentsArray.push(comment);
      }
    }
  }

}
