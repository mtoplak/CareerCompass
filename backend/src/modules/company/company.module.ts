import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { CompanySchema } from "../../db/entities/company.model";
import { CompanyController } from "./company.controller";
import { CompanyRepository } from "./company.repository";
import { CompanyService } from "./company.service";
import { CompanyMapper } from "./company.mapper";
import { AverageRatingRepository } from "../average-rating/average-rating.repository";
import { AverageRatingSchema } from "../../db/entities/average-rating.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
        MongooseModule.forFeature([{ name: 'AverageRating', schema: AverageRatingSchema }]),
    ],
    controllers: [CompanyController],
    providers: [CompanyService, CompanyRepository, CompanyMapper, AverageRatingRepository]
})

export class CompanyModule {
}
