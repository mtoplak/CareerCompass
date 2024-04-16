import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateNoteDto {
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  content: string
}
