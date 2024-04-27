import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { Environment } from '../enum/environment.enum';

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number = 3000;
}
