import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { Environment } from '../enum/environment.enum';

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number = 3000;

  @IsNumber()
  @Min(1)
  THROTTLE_LIMIT: number = 10;

  @IsString()
  SWAGGER_TITLE: string = 'AMS NestJS Boilerplate API';

  @IsString()
  SWAGGER_DESCRIPTION: string = 'API documentation for AMS NestJS Boilerplate';

  @IsString()
  SWAGGER_VERSION: string = 'v1.0.0';

  @IsString()
  SWAGGER_TAG: string = 'ams-nest-boilerplate';
}
