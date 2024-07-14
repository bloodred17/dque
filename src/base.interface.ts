import { Webhook } from './webhook/webhook.service';

export interface BaseJobData {
  name: string;
  webhooks?: Webhook[];
  timeout?: number;
}
