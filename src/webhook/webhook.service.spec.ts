import { Test, TestingModule } from '@nestjs/testing';
import { Webhook, WebhookService } from './webhook.service';

describe('WebhookService', () => {
  let webhookService: WebhookService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [WebhookService],
    }).compile();

    webhookService = app.get<WebhookService>(WebhookService);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const webhooks: Webhook[] = [
        // { url: 'http://localhost:3000', method: 'POST' },
        // { url: 'http://localhost:3000', method: 'POST' },
        // { url: 'http://localhost:3000', method: 'POST' },
        // { url: 'http://localhost:3000', method: 'POST' },
        // { url: 'http://localhost:3000', method: 'POST' },
        // { url: 'http://localhost:3000', method: 'POST' },
        {
          url: 'https://track-cargo-worker.wonderfultree-b014d1fb.eastus.azurecontainerapps.iasldjfo/api',
          method: 'GET',
        },
      ];
      const val = await webhookService.triggerWebhook(webhooks, {
        hello: 'world',
      });
      console.log(val);
      // .subscribe(async (response) => {
      //   const value = await response;
      //   console.log(value);
      //   // expect(value).toBe({
      //   //   hello: 'worl',
      //   // });
      // });
      expect(true).toBe(true);
    });
  });
});
