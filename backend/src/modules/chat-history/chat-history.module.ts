import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { ChatHistorySchema } from "../../db/entities/chat-history.model";
import { UserSchema } from "../../db/entities/user.model";
import { ChatHistoryController } from "./chat-history.controller";
import { ChatHistoryService } from "./chat-history.service";
import { ChatHistoryRepository } from "./chat-history.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'ChatHistory', schema: ChatHistorySchema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [ChatHistoryController],
    providers: [ChatHistoryService, ChatHistoryRepository]
})

export class ChatHistoryModule {
}
