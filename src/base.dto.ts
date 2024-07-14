import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Webhook } from './webhook/webhook.service';
import { BaseJobData } from './base.interface';

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
