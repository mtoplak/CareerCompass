import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { SuccessResponse } from '../../shared/data.response';
import { ChatHistory } from '../../db/entities/chat-history.model';

@Injectable()
export class ChatHistoryRepository {
  constructor(
    @InjectModel('ChatHistory') public chatHistoryModel: Model<ChatHistory>,
  ) { }

  async findOne(chatHistoryFilterQuery: FilterQuery<ChatHistory>): Promise<ChatHistory> {
    try {
      return await this.chatHistoryModel
        .findOne(chatHistoryFilterQuery);
    } catch (err) {
      throw new NotFoundException('Could not get the chat history from database.');
    }
  }

  async find(): Promise<ChatHistory[]> {
    try {
      return await this.chatHistoryModel.find();
    } catch (err) {
      throw new NotFoundException('Error fetching chat histories.');
    }
  }

  async findPaginated(filter: any, options: any = {}): Promise<ChatHistory[]> {
    try {
      return await this.chatHistoryModel.find(filter, null, options);
    } catch (err) {
      throw new NotFoundException('Error fetching chat histories.');
    }
  }

  async create(chatHistory: ChatHistory): Promise<ChatHistory> {
    try {
      return await new this.chatHistoryModel(chatHistory).save();
    }
    catch (err) {
      console.error('Error creating chat history:', err);
      throw new NotFoundException('Could not create chat history.');
    }

  }

  async findOneAndUpdate(
    chatHistoryFilterQuery: FilterQuery<ChatHistory>,
    chatHistory: Partial<ChatHistory>,
    options?: QueryOptions,
  ): Promise<ChatHistory> {
    try {
      const updatedChatHistory = await this.chatHistoryModel.findOneAndUpdate(
        chatHistoryFilterQuery,
        chatHistory,
        options,
      );

      if (!updatedChatHistory) {
        throw new NotFoundException('Chat history not found.');
      }

      return updatedChatHistory;
    } catch (error) {
      console.error('Error updating chat history:', error);
      throw new InternalServerErrorException('Could not update chat history.');
    }
  }

  async deleteOne(chatHistoryFilterQuery: FilterQuery<ChatHistory>): Promise<SuccessResponse> {
    try {
      await this.chatHistoryModel.deleteOne(chatHistoryFilterQuery);
      return { success: true };
    } catch (err) {
      throw new NotFoundException('Could not delete chat history.');
    }
  }

}