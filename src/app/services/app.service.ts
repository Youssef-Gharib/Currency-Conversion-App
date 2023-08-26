import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IConvertResponse, ICurrencies, ICurrency, ICurrencyConvert } from '../models/icurrencies';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseURL = 'http://www.amrcurrencyconversion.site/api';
  currencies: ICurrency[] = [];

  constructor(private http: HttpClient) { }


  getCurrencies(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(`${this.baseURL}/v1`).pipe(map((res: any) => res.currencies));
  }

  convert(data: ICurrencyConvert): Observable<IConvertResponse> {
    return this.http.post<IConvertResponse>(`${this.baseURL}/v1/conversion`, data);
  }

  renderCurrency(): Observable<ICurrencies[]> {
    return this.http.get<ICurrencies[]>(
      'https://v6.exchangerate-api.com/v6/ecf10bab01b34bf0de9636e1/latest/USD'
    );
  }

  fetchCurrencyById(currencyId: string): Observable<ICurrencies> {
    return this.http.get<ICurrencies>(
      `https://dummyjson.com/products/${currencyId}`
    );
  }

}
