import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { UserResponse, SuccessResponse } from 'src/shared/data.response';
import { User } from 'src/db/entities/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') public userModel: Model<User>,
  ) { }

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    try {
      return await this.userModel
        .findOne(userFilterQuery)
    } catch (err) {
      throw new NotFoundException('Could not get the user.');
    }
  }

  async find(usersFilterQuery: FilterQuery<User>): Promise<UserResponse[]> {
    try {
      return await this.userModel
        .find(usersFilterQuery)
    } catch (err) {
      throw new NotFoundException('Could not find the users.');
    }
  }

  async create(user: User): Promise<User> {
    try {
      return await new this.userModel(user).save();
    } catch (err) {
      throw new NotFoundException('Could not create user.');
    }
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
    options?: QueryOptions,
  ): Promise<User> {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        userFilterQuery,
        user,
        options,
      );

      if (!updatedUser) {
        throw new NotFoundException('User not found.');
      }

      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Could not update user.');
    }
  }


  async deleteOne(userFilterQuery: FilterQuery<User>): Promise<SuccessResponse> {
    try {
      await this.userModel.deleteOne(userFilterQuery);
      return { success: true };
    } catch (err) {
      throw new NotFoundException('Could not delete user.');
    }
  }

}