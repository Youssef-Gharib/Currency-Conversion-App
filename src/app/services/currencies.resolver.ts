import { ResolveFn } from '@angular/router';
import { ICurrency } from '../models/icurrencies';
import { AppService } from './app.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const currenciesResolver: ResolveFn<ICurrency[]> =
  (route, state, appService: AppService = inject(AppService)) => {
    return appService.getCurrencies().pipe(tap((res => {
      appService.currencies = res;
    })));
  };
