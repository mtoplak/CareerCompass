import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatHistoryRepository } from '../chat-history/chat-history.repository';
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
        max_tokens: 100
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
      const user = await this.userService.getSingleUserByEmail(userEmail);

      const chatHistoryRecord = await this.historyRepository.findOneAndUpdate(
        { user: user._id },
        { $push: { chat_history: { role: 'user', content: content } } } as any,
        { new: true, upsert: true }
      );
      console.log(chatHistoryRecord);

      const recentHistory = chatHistoryRecord.chat_history.slice(-6);
      const historyString = recentHistory.map(entry => `${entry.role}: ${entry.content}`).join('\n');

      const prompt = `Si karierni svetovalec na platformi Career Compass, ki uporabniku pomaga s vprašanji o poklicih.\n${historyString}\nuser: ${content}`;

      const completion = await this.openai.chat.completions.create({
        model: process.env.FINE_TUNE_MODEL,
        messages: [
          { role: 'system', content: prompt }
        ],
        max_tokens: 150,
      });

      const completionText = completion.choices[0].message.content;

      await this.historyRepository.findOneAndUpdate(
        { user: user._id },
        { $push: { chat_history: { role: 'assistant', content: completionText } } } as any
      );

      return completionText;
    } catch (error) {
      console.error('Error generating completion:', error.message);
      throw error;
    }
  }

}