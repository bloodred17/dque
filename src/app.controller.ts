import { Controller, Get, Post, Req } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      message: 'API is working.',
    };
  }

  @Post('/dump')
  async dump(@Req() req) {
    console.log('Dump: ', req.body);
    return {
      body: req.body,
    };
  }
}
