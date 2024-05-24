import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatHistoryRepository } from '../chat-history/chat-history.repository';
import { ChatHistoryModel } from '../../db/entities/chat-history.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(
    private readonly historyRepository: ChatHistoryRepository,
    private readonly userService: UserService,
  ) {
    const apiKey = process.env.OPENAI_API_KEY;
    this.openai = new OpenAI({ apiKey });
  }

  async checkComment(comment: string): Promise<boolean> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        messages: [
          { role: 'system', content: 'Does this comment contain any personal information (including lowercase name or surname), curse words, or insults?' },
          { role: 'user', content: comment }
        ],
        max_tokens: 64
      });

      let fullText = '';
      if (response?.choices?.length > 0) {
        fullText = response.choices[0].message.content.toLowerCase();
      }

      const prohibitedContentIndicators = ["yes", "contains", "present"];
      const doesContain = prohibitedContentIndicators.some(indicator =>
        fullText.includes(indicator));

      console.log(fullText)

      return !doesContain;
    } catch (error) {
      console.error('Error checking comment:', error);
      throw new Error('Failed to check comment');
    }
  }

  async generateCompletion(userEmail: string, content: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: "system", content: "Career Compass vam pomaga najti pravo rešitev za novo poklicno pot!" },
          { role: 'user', content: content }
        ],
        model: process.env.FINE_TUNE_MODEL,
      });
      const completionText = completion.choices[0].message.content;

      const user = await this.userService.getSingleUserByEmail(userEmail);
      if (!user) {
        throw new Error('User not found');
      }

      let chatHistoryRecord = await this.historyRepository.findOne({ user: user._id });
      if (!chatHistoryRecord) {
        chatHistoryRecord = new ChatHistoryModel({ user: user._id, chat_history: [] });
      }

      chatHistoryRecord.chat_history.push({ role: 'user', content: content });
      chatHistoryRecord.chat_history.push({ role: 'assistant', content: completionText });

      await chatHistoryRecord.save();

      return completionText;
    } catch (error) {
      console.error('Error generating completion:', error.message);
    }
  }

}