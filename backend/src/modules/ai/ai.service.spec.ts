import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { ChatHistoryRepository } from '../chat-history/chat-history.repository';
import { UserService } from '../user/user.service';
import OpenAI from 'openai';

jest.mock('openai');

describe('AiService', () => {
  let service: AiService;
  let openaiMock: any;

  beforeEach(async () => {
    openaiMock = {
      chat: {
        completions: {
          create: jest.fn()
        }
      }
    };

    const mockChatHistoryRepository = {
      findOneAndUpdate: jest.fn(),
    };

    const mockUserService = {
      getSingleUserByEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        { provide: ChatHistoryRepository, useValue: mockChatHistoryRepository },
        { provide: UserService, useValue: mockUserService },
        { provide: OpenAI, useValue: openaiMock },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    (service as any).openai = openaiMock;
  });

  describe('checkComment', () => {
    it('should return true if the comment does not contain prohibited content', async () => {
      const comment = 'To je super služba.';
      openaiMock.chat.completions.create.mockResolvedValue({
        choices: [
          { message: { content: 'No, it does not contain any prohibited content.' } },
        ],
      });

      const result = await service.checkComment(comment);

      expect(result).toBe(true);
    });

    it('should return false if the comment contains prohibited content', async () => {
      const comment = 'Direktor Luka Novak je super.';
      openaiMock.chat.completions.create.mockResolvedValue({
        choices: [
          { message: { content: 'Yes, it contains personal information.' } },
        ],
      });

      const result = await service.checkComment(comment);

      expect(result).toBe(false);
    });

    it('should throw an error if OpenAI API call fails', async () => {
      const comment = 'This is a test comment';
      openaiMock.chat.completions.create.mockRejectedValue(new Error('OpenAI API error'));

      await expect(service.checkComment(comment)).rejects.toThrow('Failed to check comment');
    });
  });

});
