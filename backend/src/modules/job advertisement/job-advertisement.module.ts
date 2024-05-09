import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { JobAdvertisementSchema } from "../../db/entities/job-advertisement.model";
import { JobAdvertisementService } from "./job-advertisement.service";
import { JobAdvertisementController } from "./job-advertisement.controller";
import { JobAdvertisementRepository } from "./job-advertisement.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'JobAdvertisement', schema: JobAdvertisementSchema }]),
    ],
    controllers: [JobAdvertisementController],
    providers: [JobAdvertisementService, JobAdvertisementRepository]
})

export class JobAdvertisementModule {
}
