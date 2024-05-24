import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { CompanySchema } from "../../db/entities/company.model";
import { CompanyController } from "./company.controller";
import { CompanyRepository } from "./company.repository";
import { CompanyService } from "./company.service";
import { CompanyMapper } from "./company.mapper";
import { AverageRatingRepository } from "../average-rating/average-rating.repository";
import { AverageRatingSchema } from "../../db/entities/average-rating.model";
import { JobAdvertisementRepository } from "../job-advertisement/job-advertisement.repository";
import { JobAdvertisementSchema } from "../../db/entities/job-advertisement.model";
import { AverageRatingService } from "../average-rating/average-rating.service";
import { RatingRepository } from "../rating/rating.repository";
import { AiService } from "../ai/ai.service";
import { RatingSchema } from "../../db/entities/rating.model";
import { ChatHistoryRepository } from "../chat-history/chat-history.repository";
import { UserService } from "../user/user.service";
import { ChatHistorySchema } from "../../db/entities/chat-history.model";
import { UserRepository } from "../user/user.repository";
import { UserSchema } from "../../db/entities/user.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
        MongooseModule.forFeature([{ name: 'AverageRating', schema: AverageRatingSchema }]),
        MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
        MongooseModule.forFeature([{ name: 'JobAdvertisement', schema: JobAdvertisementSchema }]),
        MongooseModule.forFeature([{ name: 'ChatHistory', schema: ChatHistorySchema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [CompanyController],
    providers: [
        CompanyService, CompanyRepository, CompanyMapper,
        AverageRatingRepository, AverageRatingService,
        RatingRepository,
        JobAdvertisementRepository,
        AiService,
        ChatHistoryRepository,
        UserService, UserRepository
    ]
})

export class CompanyModule {
}
