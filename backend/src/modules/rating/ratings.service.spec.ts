import { Test, TestingModule } from '@nestjs/testing';
import { RatingService } from './rating.service';
import { RatingRepository } from './rating.repository';
import { CompanyRepository } from '../company/company.repository';
import { AverageRatingService } from '../average-rating/average-rating.service';
import { CreateUpdateRatingDto } from './create-update-rating.dto';

describe('RatingService', () => {
  let service: RatingService;
  let ratingRepository: RatingRepository;
  let companyRepository: CompanyRepository;
  let averageService: AverageRatingService;

  beforeEach(async () => {
    const mockRatingRepository = {
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
      deleteOne: jest.fn(),
    };

    const mockCompanyRepository = {
      findOne: jest.fn(),
    };

    const mockAverageService = {
      calculateAverageRating: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingService,
        { provide: RatingRepository, useValue: mockRatingRepository },
        { provide: CompanyRepository, useValue: mockCompanyRepository },
        { provide: AverageRatingService, useValue: mockAverageService },
      ],
    }).compile();

    service = module.get<RatingService>(RatingService);
    ratingRepository = module.get<RatingRepository>(RatingRepository);
    companyRepository = module.get<CompanyRepository>(CompanyRepository);
    averageService = module.get<AverageRatingService>(AverageRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 1) CREATE RATING
  it('should create a rating', async () => {
    const ratingDto: CreateUpdateRatingDto = {
      company_slug: 'test-company',
      team: 4,
      personal_development: 4,
      flexibility: 3,
      work_life_balance: 5,
      work_environment: 4,
      leadership: 4,
      benefits: 3,
      remote_work: true,
      bonuses: 3,
      experience: 'positive',
      difficulty: 'medium',
    } as any;

    const expectedNewRating = { _id: '12345', ...ratingDto };

    (ratingRepository.create as jest.Mock).mockResolvedValue(expectedNewRating);
    (companyRepository.findOne as jest.Mock).mockResolvedValue({
      id: 'company1',
      average: null,
      save: jest.fn(),
    });
    (averageService.calculateAverageRating as jest.Mock).mockResolvedValue(4.2);

    const result = await service.createRating(ratingDto);
    expect(result).toEqual(expectedNewRating);

    expect(ratingRepository.create).toHaveBeenCalledWith(ratingDto);
    expect(companyRepository.findOne).toHaveBeenCalledWith({ slug: 'test-company' });
    expect(averageService.calculateAverageRating).toHaveBeenCalled();
  });

  // 2) GET ALL RATINGS
  it('should get all ratings', async () => {
    const expectedRatings = [
      { _id: '1', company_slug: 'abc' },
      { _id: '2', company_slug: 'xyz' },
    ];

    (ratingRepository.find as jest.Mock).mockResolvedValue(expectedRatings);

    const result = await service.getAllRatings();
    expect(result).toEqual(expectedRatings);
    expect(ratingRepository.find).toHaveBeenCalledWith({});
  });


  // 3) UPDATE RATING
  it('should update a rating', async () => {
    const updates: Partial<CreateUpdateRatingDto> = { team: 5 };
    const expectedUpdatedRating = { _id: '12345', team: 5 };

    (ratingRepository.findOneAndUpdate as jest.Mock)
      .mockResolvedValue(expectedUpdatedRating);

    const result = await service.updateRating('12345', updates as any);

    expect(result).toEqual(expectedUpdatedRating);
    expect(ratingRepository.findOneAndUpdate)
      .toHaveBeenCalledWith({ _id: '12345' }, updates, { new: true });
  });
});
