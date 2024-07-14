import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseJobData, Webhook } from './base.interface';

export class BaseDto implements BaseJobData {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  webhooks?: Webhook[];

  @IsOptional()
  @IsNumber()
  timeout?: number;
}
