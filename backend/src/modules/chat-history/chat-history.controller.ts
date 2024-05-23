import {
  Body,
  Controller,
  Get,
  Post,
  Param
} from '@nestjs/common';
import { ChatHistoryService } from './chat-history.service';
import { CreateUpdateChatHistoryDto } from './dto/create-update-chat-history.dto';
import { ChatHistory } from '../../db/entities/chat-history.model';
import { GetChatHistoryByUserDto } from './dto/chat-history-user.dto';
import { SuccessResponse } from 'src/shared/data.response';

@Controller('/history')
export class ChatHistoryController {
  constructor(private readonly chatHistoryService: ChatHistoryService) { }

  @Post()
  async addChatHistory(
    @Body() createChatHistoryDto: CreateUpdateChatHistoryDto,
  ): Promise<ChatHistory> {
    return await this.chatHistoryService.createChatHistory(createChatHistoryDto);
  }

  @Get('/:id')
  async getSingleChatHistory(@Param('id') id: string): Promise<ChatHistory> {
    return await this.chatHistoryService.getSingleChatHistory(id);
  }

  @Post("/user")
  async getChatHistoryByUser(
    @Body() getChatHistoryByUserDto: GetChatHistoryByUserDto
  ): Promise<ChatHistory> {
    return await this.chatHistoryService.getChatHistoryByUser(getChatHistoryByUserDto.email);
  }

  @Post("/remove")
  async removeChatHistoryByUser(
    @Body() getChatHistoryByUserDto: GetChatHistoryByUserDto
  ): Promise<SuccessResponse> {
    return await this.chatHistoryService.removeChatHistoryByUser(getChatHistoryByUserDto.email);
  }

}