import { IsEmail } from "class-validator";

export class GetChatHistoryByUserDto {
    @IsEmail()
    email: string;
  }