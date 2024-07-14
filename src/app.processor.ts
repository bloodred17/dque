import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('main')
export class AppProcessor extends WorkerHost {
  async process(job: Job<any, any, string>) {
    console.log('processing job', job.name);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<any, any, string>) {
    console.log('job is completed', job.name);
  }
}
