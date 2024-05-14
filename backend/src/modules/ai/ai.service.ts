import { Injectable } from '@nestjs/common';
//import { createReadStream, existsSync } from 'fs';
//import { resolve } from 'path';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY not found in environment:', process.env);
      throw new Error('OPENAI_API_KEY environment variable is missing');
    }
    this.openai = new OpenAI({ apiKey });
  }

  async checkComment(comment: string): Promise<boolean> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        messages: [
          { role: 'system', content: 'Does this comment contain personal information, curse words, or insults?' },
          { role: 'user', content: comment }
        ],
        max_tokens: 64
      });

      let fullText = '';
      if (response && response.choices && response.choices.length > 0) {
        fullText = response.choices[0].message.content.toLowerCase();
      }

      const prohibitedContentIndicators = ["yes", "contains", "present"];
      const doesContain = prohibitedContentIndicators.some(indicator =>
        fullText.includes(indicator));

      console.log(fullText);
      return !doesContain;
    } catch (error) {
      console.error('Error checking comment:', error);
      throw new Error('Failed to check comment');
    }
  }

  /*
  async uploadAndFineTune() {
    try {
      const prodFilePath = resolve(__dirname, 'dataset_fixed.jsonl');
      const devFilePath = resolve(__dirname, '..', '..', 'src', 'modules', 'ai', 'dataset_fixed.jsonl');
      let filePath;

      if (existsSync(prodFilePath)) {
        filePath = prodFilePath;
      } else if (existsSync(devFilePath)) {
        filePath = devFilePath;
      } else {
        throw new Error(`File not found: ${prodFilePath} or ${devFilePath}`);
      }

      console.log('Resolved file path:', filePath);

      const uploadResponse = await this.openai.files.create({
        file: createReadStream(filePath),
        purpose: 'fine-tune',
      });

      console.log('File uploaded successfully:', uploadResponse);

      const fineTuneResponse = await this.openai.fineTuning.jobs.create({
        training_file: uploadResponse.id,
        model: 'gpt-3.5-turbo',
      });

      console.log('Fine-tuning job created successfully:', fineTuneResponse);
    } catch (error) {
      console.error('Error during file upload and fine-tuning:', error.message);
    }
  }

  async uploadAndTune() {
    try {
      const filePath = resolve(__dirname, 'dataset_fixed.jsonl');
      console.log('Resolved file path:', filePath);
      const uploadResponse = await this.openai.files.create({
        file: createReadStream(filePath),
        purpose: 'fine-tune',
      });

      console.log('File uploaded successfully:', uploadResponse);

      await this.FineTune(uploadResponse);

    } catch (error) {
      console.error('Error during file upload and fine-tuning:', error.message);
    }
  }

  async FineTune(uploadResponse: OpenAI.Files.FileObject) {
    try {
      const fineTuneResponse = await this.openai.fineTuning.jobs.create({
        training_file: uploadResponse.id,
        model: 'gpt-3.5-turbo',
      });

      console.log('Fine-tuning job created successfully:', fineTuneResponse);
    } catch (error) {
      console.error('Error during fine-tuning:', error.message);
    }
  }

  async listFineTuningJobs(limit: number = 10) {
    try {
      const page = await this.openai.fineTuning.jobs.list({ limit });
      console.log('Fine-tuning jobs:', page);
      return page;
    } catch (error) {
      console.error('Error listing fine-tuning jobs:', error.message);
    }
  }

  async retrieveFineTuneJob(jobId: string) {
    try {
      const fineTune = await this.openai.fineTuning.jobs.retrieve(jobId);
      console.log('Fine-tune job details:', fineTune);
      return fineTune;
    } catch (error) {
      console.error('Error retrieving fine-tune job:', error.message);
    }
  }

  async cancelFineTuneJob(jobId: string) {
    try {
      const status = await this.openai.fineTuning.jobs.cancel(jobId);
      console.log('Cancelled fine-tune job status:', status);
      return status;
    } catch (error) {
      console.error('Error cancelling fine-tune job:', error.message);
    }
  }

  async listFineTuneJobEvents(jobId: string, limit: number = 10) {
    try {
      const events = await this.openai.fineTuning.jobs.listEvents(jobId, { limit });
      console.log('Fine-tune job events:', events);
      return events;
    } catch (error) {
      console.error('Error listing fine-tune job events:', error.message);
    }
  }

    async deleteFineTunedModel(modelId: string) {
      try {
        const response = await this.openai.models.deleteModel({ id: modelId });
        console.log('Deleted fine-tuned model:', response);
        return response;
      } catch (error) {
        console.error('Error deleting fine-tuned model:', error.message);
      }
    }

  async generateCompletion(modelId: string) {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
        model: modelId,
      });
      console.log('Generated completion:', completion.choices[0]);
      return completion.choices[0];
    } catch (error) {
      console.error('Error generating completion:', error.message);
    }
  }
  */
}
