//import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) { }

  @Post('/check')
  async checkAIComments(@Body() body: { comment: string }): Promise<boolean> {
    const comment = body.comment;
    return await this.aiService.checkComment(comment);
  }
  /*
    @Post('upload')
    async uploadAndFineTune() {
      return this.aiService.uploadAndFineTune();
    }
  
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
  
    @Get('generate-completion/:modelId')
    async generateCompletion(@Param('modelId') modelId: string) {
      return this.aiService.generateCompletion(modelId);
    }
    */
}
