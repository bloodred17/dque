import { AxiosRequestConfig } from 'axios';

export type Webhook = AxiosRequestConfig;

export interface BaseJobData {
  name: string;
  webhooks?: Webhook[];
  timeout?: number;
}
