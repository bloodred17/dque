import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BullModule } from '@nestjs/bullmq';
import { HttpTaskModule } from './http-task/http-task.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import bullConfig from './configs/bull.config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [bullConfig],
    }),
    BullModule.forRootAsync({
      useFactory: () => {
        const { host, port, username, password } = bullConfig();
        return {
          connection: { host, port: +port, username, password },
        };
      },
    }),
    HttpTaskModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
