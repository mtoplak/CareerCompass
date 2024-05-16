import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { AverageRatingSchema } from "../../db/entities/average-rating.model";
import { AverageRatingRepository } from "./average-rating.repository";
import { AverageRatingService } from "./average-rating.service";
import { RatingRepository } from "../rating/rating.repository";
import { AiService } from "../ai/ai.service";
import { RatingSchema } from "../../db/entities/rating.model";
import { ChatHistorySchema } from "../../db/entities/chat-history.model";
import { ChatHistoryRepository } from "../chat-history/chat-history.repository";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";
import { UserSchema } from "../../db/entities/user.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'AverageRating', schema: AverageRatingSchema }]),
        MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
        MongooseModule.forFeature([{ name: 'ChatHistory', schema: ChatHistorySchema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [],
    providers: [
        AverageRatingService, AverageRatingRepository,
        RatingRepository, AiService, ChatHistoryRepository,
        UserService, UserRepository
    ]
})

export class AverageRatingModule {
}
