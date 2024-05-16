import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) { }

  @Post('/check')
  async checkAIComments(@Body() body: { comment: string }): Promise<boolean> {
    const comment = body.comment;
    return await this.aiService.checkComment(comment);
  }

  @Post()
  async generateCompletion(
    @Body('userEmail') userEmail: string,
    @Body('content') content: string
  ): Promise<string> {
    return this.aiService.generateCompletion(userEmail, content);
  }

}
