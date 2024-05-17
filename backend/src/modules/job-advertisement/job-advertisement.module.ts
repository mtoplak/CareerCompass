import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { JobAdvertisementSchema } from "../../db/entities/job-advertisement.model";
import { JobAdvertisementService } from "./job-advertisement.service";
import { JobAdvertisementController } from "./job-advertisement.controller";
import { JobAdvertisementRepository } from "./job-advertisement.repository";
import { CompanyRepository } from "../company/company.repository";
import { CompanySchema } from "../../db/entities/company.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'JobAdvertisement', schema: JobAdvertisementSchema }]),
        MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    ],
    controllers: [JobAdvertisementController],
    providers: [
        JobAdvertisementService,
        JobAdvertisementRepository,
        CompanyRepository
    ]
})

export class JobAdvertisementModule {
}
