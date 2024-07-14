import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BullModule } from '@nestjs/bullmq';
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
    HttpTaskModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
