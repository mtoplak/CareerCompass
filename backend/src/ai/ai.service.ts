import { Injectable } from '@nestjs/common';
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

            console.log(fullText)
            return !doesContain;
        } catch (error) {
            console.error('Error checking comment:', error);
            throw new Error('Failed to check comment');
        }
    }
}
