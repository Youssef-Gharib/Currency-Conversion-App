import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IConvertResponse, ICurrencies, ICurrency, ICurrencyConvert } from '../models/icurrencies';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseURL = 'http://ec2-18-134-206-213.eu-west-2.compute.amazonaws.com/api';
  baseURL2 = 'http://www.amrcurrencyconversion.site/api';
  currencies: ICurrency[] = [];

  constructor(private http: HttpClient) { }


  getCurrencies(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(`${this.baseURL}/v1/currency`).pipe(map((res: any) => res.currency_list));
  }

  convert(data: ICurrencyConvert): Observable<IConvertResponse> {
    return this.http.post<IConvertResponse>(`${this.baseURL2}/v1/conversion`, data);
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
