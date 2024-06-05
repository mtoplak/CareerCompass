import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { CreateUpdateUserDto } from './create-update-user.dto';
import { User } from '../../db/entities/user.model';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
    let service: UserService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const mockUserRepository = {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            deleteOne: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: UserRepository, useValue: mockUserRepository },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a user', async () => {
        const userDto: CreateUpdateUserDto = { email: 'test@example.com', name: 'Test User' } as CreateUpdateUserDto;
        const expectedResult = { ...userDto, _id: '12345' };
        (userRepository.create as jest.Mock).mockResolvedValue(expectedResult);

        const result = await service.createUser(userDto);
        expect(result).toEqual(expectedResult);
        expect(userRepository.create).toHaveBeenCalledWith(userDto);
    });

    it('should get all users', async () => {
        const expectedResult = [{ _id: '12345', email: 'test@example.com' }];
        (userRepository.find as jest.Mock).mockResolvedValue(expectedResult);

        const result = await service.getAllUsers();
        expect(result).toEqual(expectedResult);
        expect(userRepository.find).toHaveBeenCalled();
    });

    it('should get a single user by id', async () => {
        const expectedResult = { _id: '12345', email: 'test@example.com' };
        (userRepository.findOne as jest.Mock).mockResolvedValue(expectedResult);

        const result = await service.getSingleUser('12345');
        expect(result).toEqual(expectedResult);
        expect(userRepository.findOne).toHaveBeenCalledWith({ _id: '12345' });
    });

    it('should update a user', async () => {
        const userUpdates: CreateUpdateUserDto = { email: 'updated@example.com', name: 'Updated User' } as CreateUpdateUserDto;
        const expectedResult = { _id: '12345', ...userUpdates };
        (userRepository.findOneAndUpdate as jest.Mock).mockResolvedValue(expectedResult);

        const result = await service.updateUser('12345', userUpdates);
        expect(result).toEqual(expectedResult);
        expect(userRepository.findOneAndUpdate).toHaveBeenCalledWith({ _id: '12345' }, userUpdates, { new: true });
    });

    it('should throw NotFoundException when user to update is not found', async () => {
        const userUpdates = { email: 'updated@example.com', name: 'Updated User' } as CreateUpdateUserDto;
        (userRepository.findOneAndUpdate as jest.Mock).mockRejectedValue(new NotFoundException('User not found.'));

        await expect(service.updateUser('notfound', userUpdates)).rejects.toThrow(NotFoundException);
        expect(userRepository.findOneAndUpdate).toHaveBeenCalledWith({ _id: 'notfound' }, userUpdates, { new: true });
    });

    it('should remove a user', async () => {
        const expectedResult = { success: true };
        (userRepository.deleteOne as jest.Mock).mockResolvedValue(expectedResult);

        const result = await service.removeUser('12345');
        expect(result).toEqual(expectedResult);
        expect(userRepository.deleteOne).toHaveBeenCalledWith({ _id: '12345' });
    });

    it('should throw a NotFoundException when user is not found by email', async () => {
        (userRepository.findOne as jest.Mock).mockResolvedValue(null);

        await expect(service.getSingleUserByEmail('nonexistent@example.com')).rejects.toThrow(NotFoundException);
        expect(userRepository.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
    });

    it('should update a user by email', async () => {
        const updatedUserData: Partial<User> = { name: 'Updated User' };
        const expectedResult = { _id: '12345', email: 'test@example.com', name: 'Updated User' };
        (userRepository.findOneAndUpdate as jest.Mock).mockResolvedValue(expectedResult);

        const result = await service.updateUserByEmail('test@example.com', updatedUserData);
        expect(result).toEqual(expectedResult);
        expect(userRepository.findOneAndUpdate).toHaveBeenCalledWith({ email: 'test@example.com' }, updatedUserData, { new: true });
    });

    it('should remove a user by email', async () => {
        const expectedResult = { success: true };
        (userRepository.deleteOne as jest.Mock).mockResolvedValue(expectedResult);

        const result = await service.removeUserByEmail('test@example.com');
        expect(result).toEqual(expectedResult);
        expect(userRepository.deleteOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
});
