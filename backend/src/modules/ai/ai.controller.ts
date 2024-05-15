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

  @Post('/generate')
  async generateCompletion(
    @Body('content') content: string
  ) {
    return this.aiService.generateCompletion(content);
  }

  /*
    @Get('list-jobs/:limit')
    async listJobs(@Param('limit') limit: number) {
      return this.aiService.listFineTuningJobs(limit);
    }
  
    @Get('retrieve-job/:jobId')
    async retrieveJob(@Param('jobId') jobId: string) {
      return this.aiService.retrieveFineTuneJob(jobId);
    }
  
    @Post('cancel-job/:jobId')
    async cancelJob(@Param('jobId') jobId: string) {
      return this.aiService.cancelFineTuneJob(jobId);
    }
  
    @Get('list-events/:jobId/:limit')
    async listEvents(@Param('jobId') jobId: string, @Param('limit') limit: number) {
      return this.aiService.listFineTuneJobEvents(jobId, limit);
    }
  */

}
