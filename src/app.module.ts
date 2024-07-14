import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import { AppProcessor } from './app.processor';
import { HttpTaskModule } from './http-task/http-task.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    BullModule.forRoot({
      connection: {
        host: 'redisurl',
        port: 3000,
        username: 'default',
        password: 'password',
      },
    }),
    BullModule.registerQueue({
      name: 'main',
    }),
    HttpTaskModule,
  ],
  controllers: [AppController],
  providers: [AppProcessor, AppService],
})
export class AppModule {}
