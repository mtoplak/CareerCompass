import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { RatingSchema } from "src/entities/rating.model";
import { RatingController } from "./rating.controller";
import { RatingRepository } from "./rating.repository";
import { RatingService } from "./rating.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
    ],
    controllers: [RatingController],
    providers: [RatingService, RatingRepository]
})

export class RatingModule {
}
