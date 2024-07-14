import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { HttpTaskController } from './http-task.controller';
import { HttpTaskProcessor } from './http-task.processor';
import { WebhookModule } from '../webhook/webhook.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'http-task',
    }),
    HttpModule,
    WebhookModule,
  ],
  controllers: [HttpTaskController],
  providers: [HttpTaskProcessor],
})
export class HttpTaskModule {}
