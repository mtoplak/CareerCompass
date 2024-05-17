import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AiService } from "../ai/ai.service";
import { AiController } from "./ai.controller";
import { ChatHistoryRepository } from "../chat-history/chat-history.repository";
import { ChatHistorySchema } from "../../db/entities/chat-history.model";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";
import { UserSchema } from "../../db/entities/user.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'ChatHistory', schema: ChatHistorySchema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [AiController],
    providers: [AiService, ChatHistoryRepository, UserService, UserRepository]
})

export class AiModule {
}
