import { Injectable, Scope } from '@nestjs/common';
import { catchError, from, mergeMap, of, tap } from 'rxjs';
import { RequestService } from './request.service';
import { Webhook } from '../base.interface';

@Injectable({ scope: Scope.DEFAULT })
export class WebhookService {
  constructor(private readonly requestService: RequestService) {}

  triggerWebhook(webhooks: Webhook[], data: any) {
    console.log('webhooks triggered');
    return from(webhooks).pipe(
      mergeMap((webhook) => {
        if (webhook.method.toLowerCase() === 'post') {
          webhook.data = data;
        }
        return this.requestService.timedRequest(
          webhook,
          webhook?.timeout || 30_000,
        );
      }),
      catchError((err) => {
        // Todo: Log error
        console.error(err?.toString());
        return of();
      }),
      tap((data) => console.log(data)),
    );
  }
}
