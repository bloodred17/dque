import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { HttpTaskController } from './http-task.controller';
import { HttpTaskProcessor } from './http-task.processor';
import { HttpModule } from '@nestjs/axios';
import { WebhookService } from '../services/webhook.service';
import { RequestService } from '../services/request.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'http-task',
    }),
    HttpModule,
  ],
  controllers: [HttpTaskController],
  providers: [HttpTaskProcessor, WebhookService, RequestService],
})
export class HttpTaskModule {}
