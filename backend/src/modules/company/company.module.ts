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

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
        MongooseModule.forFeature([{ name: 'AverageRating', schema: AverageRatingSchema }]),
        MongooseModule.forFeature([{ name: 'JobAdvertisement', schema: JobAdvertisementSchema }]),
    ],
    controllers: [CompanyController],
    providers: [
        CompanyService, CompanyRepository, CompanyMapper,
        AverageRatingRepository, JobAdvertisementRepository
    ]
})

export class CompanyModule {
}
