import { Injectable, Scope } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { catchError, from, map, mergeMap, of, tap } from 'rxjs';
import { HttpService } from '@nestjs/axios';

export type Webhook = AxiosRequestConfig;

@Injectable({ scope: Scope.DEFAULT })
export class WebhookService {
  constructor(private readonly httpService: HttpService) {}

  triggerWebhook(webhooks: Webhook[], data: any) {
    return from(webhooks).pipe(
      mergeMap((webhook) => {
        if (webhook.method.toLowerCase() === 'post') {
          webhook.data = data;
        }
        return this.httpService.request(webhook);
      }),
      map((response) => response?.data),
      catchError((err) => {
        // Todo: Log error
        console.error(err?.toString());
        return of();
      }),
      tap((data) => console.log(data)),
    );
  }
}
