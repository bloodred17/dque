import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { HttpTaskDto } from './http-task.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { delay, firstValueFrom, map, of, race, throwError } from 'rxjs';

@Processor('http-task')
export class HttpTaskProcessor extends WorkerHost {
  constructor(
    private readonly httpService: HttpService,
    // private readonly webhookService: WebhookService
  ) {
    super();
  }

  async process(job: Job<HttpTaskDto>) {
    const requestConfig: AxiosRequestConfig = {
      url: job?.data?.url,
      ...job?.data?.options,
    };
    const response$ = race(
      // throwError(() => new Error('Timeout!')).pipe(
      //   delay(30_000),
      // ),
      of({ data: { error: 'Timeout!!!' } }).pipe(
        delay(job?.data?.timeout || 30_000),
      ),
      this.httpService.request(requestConfig),
    ).pipe(
      map((response) => {
        if (response?.data?.error) {
          throw new Error(response?.data?.error);
        }
        return response?.data;
      }),
    );
    return firstValueFrom(response$);

    // const timedResponse = await Promise.race([
    //   this.timeout(job?.data?.timeout || 30_000),
    //   this.httpService.request(requestConfig),
    //   // fetch(job?.data?.url, job?.data?.options),
    // ]);
    // const response = await timedResponse;
    // return response?.text();
  }

  async timeout(ms: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject('TIMEOUT!'), ms);
    });
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<HttpTaskDto>) {
    console.log('job has completed', job.name, job.returnvalue);
    if (job?.data?.webhooks) {
      // this.webhookService.triggerWebhook(job?.data?.webhooks, job?.returnvalue);
    }
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log('job has failed', job.name, job.returnvalue);
  }
}
