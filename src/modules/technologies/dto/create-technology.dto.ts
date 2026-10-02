import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTechnologyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  category: string;
}
