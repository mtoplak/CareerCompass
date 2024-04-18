import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { PodjetjeSchema } from "src/entities/podjetje.model";
import { PodjetjeController } from "./podjetje.controller";
import { PodjetjeService } from "./podjetje.service";
import { PodjetjeRepository } from "./podjetje.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Podjetje', schema: PodjetjeSchema }]),
    ],
    controllers: [PodjetjeController],
    providers: [PodjetjeService, PodjetjeRepository]
})

export class PodjetjeModule {
}
