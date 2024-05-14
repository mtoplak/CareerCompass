import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { RatingSchema } from "../../db/entities/rating.model";
import { RatingController } from "./rating.controller";
import { RatingRepository } from "./rating.repository";
import { RatingService } from "./rating.service";
import { CompanyRepository } from "../../modules/company/company.repository";
import { CompanySchema } from "../../db/entities/company.model";
import { AiService } from "../ai/ai.service";
import { AverageRatingService } from "../average-rating/average-rating.service";
import { AverageRatingRepository } from "../average-rating/average-rating.repository";
import { AverageRatingSchema } from "../../db/entities/average-rating.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
        MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
        MongooseModule.forFeature([{ name: 'AverageRating', schema: AverageRatingSchema }]),
    ],
    controllers: [RatingController],
    providers: [RatingService, RatingRepository, CompanyRepository, AiService, AverageRatingService, AverageRatingRepository]
})

export class RatingModule {
}
