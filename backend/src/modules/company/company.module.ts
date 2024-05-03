import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { CompanySchema } from "src/db/entities/company.model";
import { CompanyController } from "./company.controller";
import { CompanyRepository } from "./company.repository";
import { CompanyService } from "./company.service";
import { CompanyMapper } from "./company.mapper";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    ],
    controllers: [CompanyController],
    providers: [CompanyService, CompanyRepository, CompanyMapper]
})

export class CompanyModule {
}
