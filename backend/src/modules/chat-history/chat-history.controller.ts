import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch
} from '@nestjs/common';
import { SuccessResponse } from '../../shared/data.response';
import { ChatHistoryService } from './chat-history.service';
import { CreateUpdateChatHistoryDto } from './create-update-chat-history.dto';
import { ChatHistory } from '../../db/entities/chat-history.model';

@Controller('/history')
export class ChatHistoryController {
  constructor(private readonly chatHistoryService: ChatHistoryService) { }

  @Post()
  async addChatHistory(
    @Body() createChatHistoryDto: CreateUpdateChatHistoryDto,
  ): Promise<ChatHistory> {
    return await this.chatHistoryService.createChatHistory(createChatHistoryDto);
  }

  @Get()
  async getAllChatHistories(): Promise<ChatHistory[]> {
    return await this.chatHistoryService.getAllChatHistories();
  }

  @Get(':id')
  async getSingleChatHistory(@Param('id') id: string): Promise<ChatHistory> {
    return await this.chatHistoryService.getSingleChatHistory(id);
  }

  @Patch(':id')
  async updateChatHistory(
    @Param('id') chatHistoryId: string,
    @Body() updateChatHistoryDto: CreateUpdateChatHistoryDto,
  ): Promise<ChatHistory> {
    return await this.chatHistoryService.updateChatHistory(chatHistoryId, updateChatHistoryDto);
  }

  @Delete(':id')
  async removeChatHistory(@Param('id') chatHistoryId: string): Promise<SuccessResponse> {
    return this.chatHistoryService.removeChatHistory(chatHistoryId);
  }

}