import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
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
  baseURL = 'http://ec2-18-134-206-213.eu-west-2.compute.amazonaws.com/api';
  baseURL2 = 'http://www.amrcurrencyconversion.site/api';
  currencies: ICurrency[] = [];
  selectedCurrencies: string[] = [];
  private selectedCurrenciesSubject = new BehaviorSubject<string[]>([]);
  private currenciesSubject = new BehaviorSubject<ICurrency[]>([]);
  currenciesDataFetched = new BehaviorSubject<boolean>(false);
  private reloadCurrenciesSubject = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    this.reloadCurrenciesSubject.subscribe((reload) => {
      if (reload) {
        this.getCurrencies().subscribe();
      }
    });
  }
  triggerReloadCurrencies() {
    this.reloadCurrenciesSubject.next(true);
  }
  // renderCurrencies(): Observable<ICurrency[]> {
  //   return this.http.get<ICurrency[]>(`${this.baseURL}/v1/currency`);
  // }

  getCurrencies(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(`${this.baseURL}/v1/currency`).pipe(
      map((res: any) => {
        this.currencies = res.currency_list;
        return res.currency_list;
      })
    );
  }

  convert(data: ICurrencyConvert): Observable<IConvertResponse> {
    return this.http.post<IConvertResponse>(
      `${this.baseURL}/v1/currency/convert/{data.from}/{data.to}/{data.amount}`,
      data
    );
    // return this.http.post<IConvertResponse>(`${this.baseURL2}/v1/conversion`, data);
  }
  getCurrenciesObservable(): Observable<ICurrency[]> {
    return this.currenciesSubject.asObservable();
  }
  getFavCurrencies() {
    return JSON.parse(localStorage.getItem('selectedCurrencies') || '[]');
  }
  getSelectedCurrenciesObservable(): Observable<string[]> {
    return this.selectedCurrenciesSubject.asObservable();
  }
  setSelectedCurrencies(currencies: string[]) {
    this.selectedCurrencies = currencies;
    this.selectedCurrenciesSubject.next(currencies);
  }
  getSelectedCurrencies() {
    console.log('getSelectedCurrenciesFetched ' + this.selectedCurrencies);
    return this.selectedCurrencies;
  }
  setCurrencies(currencies: ICurrency[]) {
    this.currencies = currencies;
  }
  getCurrenciesArray() {
    return this.currencies;
  }
  getCurrencyDataFromSelected(currencyCode: string): ICurrency | undefined {
    return this.currencies.find(
      (currency) => currency.currencyCode === currencyCode
    );
  }
}
