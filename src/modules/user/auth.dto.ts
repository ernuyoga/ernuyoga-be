import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(16, 16)
  accessCode: string;
}
