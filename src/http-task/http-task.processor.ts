import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { HttpTaskDto } from './http-task.dto';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom, map } from 'rxjs';
import { WebhookService } from '../services/webhook.service';
import { RequestService } from '../services/request.service';

@Processor('http-task')
export class HttpTaskProcessor extends WorkerHost {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly requestService: RequestService,
  ) {
    super();
  }

  async process(job: Job<HttpTaskDto>) {
    const requestConfig: AxiosRequestConfig = {
      url: job?.data?.url,
      ...job?.data?.options,
    };
    const response$ = this.requestService
      .timedRequest(requestConfig, job?.data?.timeout || 30_000)
      .pipe(map((response) => response?.data));
    return firstValueFrom(response$);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<HttpTaskDto>) {
    console.log('job has completed', job.name, job.returnvalue);
    if (job?.data?.webhooks && job?.data?.webhooks?.length > 0) {
      this.webhookService
        .triggerWebhook(job?.data?.webhooks, job?.returnvalue || {})
        .subscribe()
        .unsubscribe();
    }
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log('job has failed', job.name, job.returnvalue);
  }
}
