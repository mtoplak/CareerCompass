import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { AverageRatingSchema } from "src/db/entities/average-rating.model";
import { AverageRatingRepository } from "./average-rating.repository";
import { AverageRatingService } from "./average-rating.service";
import { RatingRepository } from "../rating/rating.repository";
import { AiService } from "../ai/ai.service";
import { RatingSchema } from "../../db/entities/rating.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'AverageRating', schema: AverageRatingSchema }]),
        MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
    ],
    controllers: [],
    providers: [AverageRatingService, AverageRatingRepository, RatingRepository, AiService]
})

export class AverageRatingModule {
}
