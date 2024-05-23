import {
  Body,
  Controller,
  Get,
  Post,
  Param
} from '@nestjs/common';
import { RatingResponse } from '../../shared/data.response';
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

  @Get(':id')
  async getSingleRating(@Param('id') id: string): Promise<RatingResponse> {
    return await this.ratingService.getSingleRating(id);
  }

}
