import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AppService {
  constructor(@InjectQueue('main') private mainQueue: Queue) {}

  createJob() {
    return this.mainQueue.add('doSomething', { foo: 'bar' });
  }
}
