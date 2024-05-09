import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { RatingSchema } from "../../db/entities/rating.model";
import { RatingController } from "./rating.controller";
import { RatingRepository } from "./rating.repository";
import { RatingService } from "./rating.service";
import { CompanyRepository } from "../../modules/company/company.repository";
import { CompanySchema } from "../../db/entities/company.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
        MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    ],
    controllers: [RatingController],
    providers: [RatingService, RatingRepository, CompanyRepository]
})

export class RatingModule {
}
