import { Injectable, Scope } from '@nestjs/common';
import { delay, map, Observable, of, race } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * To use RequestService, add HttpModule in imports and add RequestService in providers
 */
@Injectable({ scope: Scope.DEFAULT })
export class RequestService {
  constructor(private readonly httpService: HttpService) {}

  timedRequest<T>(
    requestConfig: AxiosRequestConfig,
    timeout: number,
  ): Observable<AxiosResponse<T>> {
    return race(
      of(new Error('Timeout!')).pipe(delay(timeout)),
      this.httpService.request<T>(requestConfig),
    ).pipe(
      map((response) => {
        if (response instanceof Error) {
          throw response;
        }
        return response;
      }),
    );
  }
}
