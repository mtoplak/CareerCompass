import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Patch
} from '@nestjs/common';
import { UserResponse, SuccessResponse } from 'src/data.response';
import { CreateUpdateUserDto } from './create-update-user.dto';
import { User } from 'src/entities/user.model';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async addUser(
        @Body() createUserDto: CreateUpdateUserDto,
    ): Promise<User> {
        return await this.userService.createUser(createUserDto);
    }

    @Get()
    async getAllUsers(): Promise<UserResponse[]> {
        return await this.userService.getAllUsers();
    }

    @Get(':id')
    async getSingleUser(@Param('id') id: string): Promise<User> {
        return await this.userService.getSingleUser(id);
    }

    @Patch(':id')
    async updateUser(
      @Param('id') userId: string,
      @Body() updateUserDto: CreateUpdateUserDto,
    ): Promise<User> {
      return await this.userService.updateUser(userId, updateUserDto);
    }
  
    @Delete(':id')
    async removeUser(@Param('id') userId: string): Promise<SuccessResponse> {
      return this.userService.removeUser(userId);
    }

    @Get('/get/:email')
    async getSingleUserByEmail(@Param('email') email: string): Promise<User> {
      return this.userService.getSingleUserByEmail(email);
    }

    @Patch('/patch/:email')
    async updateUserByEmail(
      @Param('email') email: string,
      @Body() updatedUserData: Partial<User>,
    ): Promise<User> {
      return this.userService.updateUserByEmail(email, updatedUserData);
    }

    @Delete('/delete/:email')
    async removeUserByEmail(
      @Param('email') email: string,
    ): Promise<SuccessResponse> {
      return await this.userService.removeUserByEmail(email);
    }

}
