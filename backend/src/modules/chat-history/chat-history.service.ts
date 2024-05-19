
import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatHistory } from '../../db/entities/chat-history.model';
import { SuccessResponse } from '../../shared/data.response';
import { ChatHistoryRepository } from './chat-history.repository';
import { CreateUpdateChatHistoryDto } from './create-update-chat-history.dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class ChatHistoryService {
  constructor(
    private readonly chatHistoryRepository: ChatHistoryRepository,
    private readonly userRepository: UserRepository
  ) { }

  async createChatHistory(chatHistoryData: CreateUpdateChatHistoryDto): Promise<ChatHistory> {
    try {
      return await this.chatHistoryRepository.create(chatHistoryData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getAllChatHistories(): Promise<ChatHistory[]> {
    try {
      return await this.chatHistoryRepository.find();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getSingleChatHistory(chatHistoryId: string): Promise<ChatHistory> {
    try {
      return await this.chatHistoryRepository.findOne({ _id: chatHistoryId });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getChatHistoryByUser(userEmail: string): Promise<ChatHistory> {
    try {
      const user = await this.userRepository.findOne({ email: userEmail });
      if (!user) {
        throw new Error('User not found');
      }
      return await this.chatHistoryRepository.findOne({ user: user._id });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async updateChatHistory(
    chatHistoryId: string,
    chatHistoryUpdates: CreateUpdateChatHistoryDto,
  ): Promise<ChatHistory> {
    try {
      return await this.chatHistoryRepository.findOneAndUpdate(
        { _id: chatHistoryId },
        chatHistoryUpdates,
        { new: true },
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async removeChatHistory(chatHistoryId: string): Promise<SuccessResponse> {
    return await this.chatHistoryRepository.deleteOne({ _id: chatHistoryId });
  }

}
