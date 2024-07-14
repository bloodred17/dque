import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { HttpTaskDto } from './http-task.dto';

@Controller('http-task')
export class HttpTaskController {
  constructor(@InjectQueue('http-task') private queue: Queue) {}

  @Post()
  async createHttpTask(@Body(ValidationPipe) body: HttpTaskDto) {
    try {
      if (!body?.options) {
        body.options = { method: 'GET' };
      }
      const job = await this.queue.add(body?.name, body);
      return {
        message: 'Job created successfully',
        data: {
          jobId: job?.id,
        },
      };
    } catch (e) {
      return {
        message: 'Job creation failed',
        error: e?.toString(),
      };
    }
  }
}
