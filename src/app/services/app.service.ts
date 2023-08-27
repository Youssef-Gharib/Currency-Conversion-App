import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Currency,
  CurrencyResponse,
  IConvertResponse,
  ICurrencies,
  ICurrency,
  ICurrencyConvert,
} from '../models/icurrencies';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseURL = 'http://www.amrcurrencyconversion.site/api';
  base = 'http://ec2-18-134-206-213.eu-west-2.compute.amazonaws.com/api';
  currencies: ICurrency[] = [];

  constructor(private http: HttpClient) {}

  renderCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.base}/v1/currency`);
  }
  // renderCurrencies(): Observable<Currency[]> {
  //   return this.http.get<CurrencyResponse>(`${this.base}/v1/currency`).pipe(
  //     map((response: CurrencyResponse) => {
  //       console.log('Response' + response);
  //       return response.currencyList;
  //     })
  //   );
  // }

  getCurrencies(): Observable<ICurrency[]> {
    return this.http
      .get<ICurrency[]>(`${this.baseURL}/v1`)
      .pipe(map((res: any) => res.currencies));
  }

  convert(data: ICurrencyConvert): Observable<IConvertResponse> {
    return this.http.post<IConvertResponse>(
      `${this.baseURL}/v1/conversion`,
      data
    );
  }
}
function tap(
  arg0: (response: any) => void
): import('rxjs').OperatorFunction<CurrencyResponse, unknown> {
  throw new Error('Function not implemented.');
}
