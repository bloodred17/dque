import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly webhookService: WebhookService,
  ) {}

  @Get()
  async getHello() {
    // return await this.appService.createJob();
    return {
      message: 'API is working',
    };
  }

  @Post('/dump')
  async dump(@Req() req) {
    console.log('Dump: ', req.body);
    return {
      body: req.body,
    };
  }

  // @Post('/test')
  // async webhookTest() {
  //   this.webhookService
  //     .triggerWebhook(
  //       [
  //         { url: 'http://localhost:3000/dump', method: 'POST' },
  //         // {
  //         //   url: 'https://track-cargo-worker.wonderfultree-b014d1fb.eastus.azurecontainerapps.iasldjfo/api',
  //         //   method: 'GET',
  //         // },
  //       ],
  //       { hello: 'world' },
  //     )
  //     .subscribe((response) => {
  //       console.log(response);
  //     });
  //   return 'done';
  // }
}
