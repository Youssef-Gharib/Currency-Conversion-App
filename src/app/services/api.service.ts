import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ICompareResponse,
  IConvertResponse,
  ICurrency,
  ICurrencyCompare,
  ICurrencyConvert,
} from '../models/currency.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseURL = 'http://ec2-18-134-206-213.eu-west-2.compute.amazonaws.com/api';
  currencies: ICurrency[] = [];
  showLoader = true;
  fromCurrencyId = new BehaviorSubject<number>(0);
  fromCurrency!: ICurrency;
  constructor(private http: HttpClient) {}

  getPortfolio() {
    let myPortfolio = localStorage.getItem('myPortfolio')
      ? JSON.parse(localStorage.getItem('myPortfolio') || '[]')
      : [];
    return myPortfolio;
  }
  getFromCurrency() {
    return this.fromCurrency;
  }
  getFromCurrencyId() {
    return this.fromCurrencyId;
  }

  updatePortfolio(currency: ICurrency) {
    let myPortfolio = this.getPortfolio();
    if (currency.selected) {
      myPortfolio.push(currency);
    } else {
      myPortfolio = myPortfolio.filter(
        (c: ICurrency) => c.currencyCode != currency.currencyCode
      );
    }
    localStorage.setItem('myPortfolio', JSON.stringify(myPortfolio));
  }

  setNewPortfolio(data: ICurrency[]) {
    localStorage.setItem('myPortfolio', JSON.stringify(data));
  }

  getCurrencies(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(`${this.baseURL}/v1/currency`).pipe(
      map((res: any) => {
        this.currencies = res.currency_list;
        this.showLoader = false;
        return res.currency_list;
      })
    );
  }

  convert(data: ICurrencyConvert): Observable<IConvertResponse> {
    return this.http.get<IConvertResponse>(
      `${this.baseURL}/v1/currency/convert/${data.from}/${data.to}/${data.amount}`
    );
  }

  compare(data: ICurrencyCompare): Observable<ICompareResponse> {
    return this.http.post<ICompareResponse>(
      `${this.baseURL}/v1/currency/compare`,
      data
    );
  }
}
