import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from './api.service';
import { ICurrency } from '../models/currency.model';

export const currenciesResolver: ResolveFn<ICurrency[]> =
  (route, state, apiService: ApiService = inject(ApiService)) => {
    return apiService.getCurrencies().pipe(tap((res => {
      apiService.currencies = res;
    })));
  };
