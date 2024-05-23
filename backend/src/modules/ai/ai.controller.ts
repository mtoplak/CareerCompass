import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) { }

  @Post()
  async generateCompletion(
    @Body('userEmail') userEmail: string,
    @Body('content') content: string
  ): Promise<string> {
    return this.aiService.generateCompletion(userEmail, content);
  }

}
