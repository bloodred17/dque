import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { BaseDto } from '../base.dto';
import { AxiosRequestConfig } from 'axios';

export class HttpTaskDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url: string;

  @IsObject()
  @IsOptional()
  options?: AxiosRequestConfig;
}
