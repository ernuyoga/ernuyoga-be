import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  headline: string;

  @IsString()
  @IsNotEmpty()
  bio: string;
}
