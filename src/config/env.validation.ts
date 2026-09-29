import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(NodeEnv) NODE_ENV: NodeEnv = NodeEnv.Development;
  @IsInt() @Min(1) @Max(65535) PORT: number = 3000;

  @IsString() @IsNotEmpty() DATABASE_HOST: string;
  @IsInt() DATABASE_PORT: number;
  @IsString() @IsNotEmpty() DATABASE_USERNAME: string;
  @IsString() DATABASE_PASSWORD: string;
  @IsString() @IsNotEmpty() DATABASE_NAME: string;

  @IsString() @IsNotEmpty() ACCESS_CODE_PEPPER: string;

  @IsString() @IsNotEmpty() JWT_SECRET: string;
  @IsInt() @Min(1) JWT_EXPIRES_IN: number;

  @IsString() @IsNotEmpty() FRONTEND_URL: string;

  @IsInt() @Min(1) MAX_FILE_SIZE: number;
  @IsString() @IsNotEmpty() UPLOAD_PATH: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated);
  if (errors.length > 0) throw new Error(errors.toString());
  return validated;
}
