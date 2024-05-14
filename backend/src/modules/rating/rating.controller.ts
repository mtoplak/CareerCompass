import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch
} from '@nestjs/common';
import { RatingResponse, SuccessResponse } from '../../shared/data.response';
import { Rating } from '../../db/entities/rating.model';
import { RatingService } from './rating.service';
import { CreateUpdateRatingDto } from './create-update-rating.dto';
import { AiService } from '../ai/ai.service';

@Controller('/rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService,
    private readonly aiService: AiService
  ) { }

  @Post()
  async addRating(
    @Body() createRatingDto: CreateUpdateRatingDto,
  ): Promise<Rating> {
    return await this.ratingService.createRating(createRatingDto);
  }

  @Get()
  async getAllRatings(): Promise<RatingResponse[]> {
    return await this.ratingService.getAllRatings();
  }

  @Get(':id')
  async getSingleRating(@Param('id') id: string): Promise<RatingResponse> {
    return await this.ratingService.getSingleRating(id);
  }

  @Patch(':id')
  async updateRating(
    @Param('id') ratingId: string,
    @Body() updateRatingDto: CreateUpdateRatingDto,
  ): Promise<Rating> {
    return await this.ratingService.updateRating(ratingId, updateRatingDto);
  }

  @Delete(':id')
  async removeRating(@Param('id') ratingId: string): Promise<SuccessResponse> {
    return this.ratingService.removeRating(ratingId);
  }

}
