import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUpdateUserDto } from './create-update-user.dto';
import { User } from 'src/db/entities/user.model';
import { UserResponse, SuccessResponse } from 'src/data.response';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async createUser(userData: CreateUpdateUserDto): Promise<User> {
    try {
      return await this.userRepository.create(userData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getAllUsers(): Promise<UserResponse[]> {
    try {
      return await this.userRepository.find({});
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getSingleUser(userId: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ _id: userId });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async updateUser(
    userId: string,
    userUpdates: CreateUpdateUserDto,
  ): Promise<User> {
    try {
      return await this.userRepository.findOneAndUpdate(
        { _id: userId },
        userUpdates,
        { new: true },
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async removeUser(userId: string): Promise<SuccessResponse> {
    return await this.userRepository.deleteOne({ _id: userId });
  }

  async getSingleUserByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ email });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async updateUserByEmail(
    email: string,
    updatedUserData: Partial<User>,
  ): Promise<User> {
    try {
      const updatedUser = await this.userRepository.findOneAndUpdate(
        { email },
        updatedUserData,
        { new: true },
      );
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async removeUserByEmail(email: string): Promise<SuccessResponse> {
    return await this.userRepository.deleteOne({
      email: email,
    });
  }

}
