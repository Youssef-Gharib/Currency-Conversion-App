import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
  showLoader = true;
  baseURL = 'http://ec2-18-134-206-213.eu-west-2.compute.amazonaws.com/api';
  currencies: ICurrency[] = [];
  selectedCurrencies: string[] = [];
  private selectedCurrenciesSubject = new BehaviorSubject<string[]>([]);
  private currenciesSubject = new BehaviorSubject<ICurrency[]>([]);
  currenciesDataFetched = new BehaviorSubject<boolean>(false);
  private reloadCurrenciesSubject = new BehaviorSubject<boolean>(true);
  private conversionResultSubject =
    new BehaviorSubject<IConvertResponse | null>(null);
  private selectedCurrencySource = new BehaviorSubject<ICurrency | null>(null);
  selectedCurrency$ = this.selectedCurrencySource.asObservable();

  setSelectedCurrency(currency: ICurrency) {
    this.selectedCurrencySource.next(currency);
  }
  fromCurrency!: ICurrency;
  conversionResult!: number;
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
        this.showLoader = false;
        return res.currency_list;
      })
    );
  }

  convert(data: ICurrencyConvert): Observable<IConvertResponse> {

    // return this.http.get<IConvertResponse>(
    //   `${this.baseURL}/v1/currency/convert/${data.from}/${data.to}/${data.amount}`
    // );
    return this.http
      .get<IConvertResponse>(
        `${this.baseURL}/v1/currency/convert/${data.from}/${data.to}/${data.amount}`
      )
      .pipe(
        tap((response) => {
          this.conversionResultSubject.next(response);
        })
      );
    // return this.http.post<IConvertResponse>(`${this.baseURL}/v1/conversion`, data);
  }

  convert2(data: ICurrencyConvert): Observable<IConvertResponse> {
    // return this.http.get<IConvertResponse>(
    //   `${this.baseURL}/v1/currency/convert/${data.from}/${data.to}/${data.amount}`
    // );
    return this.http
      .get<IConvertResponse>(
        `${this.baseURL}/pair-conversion?base=${data.from}&target=${data.to}&amount=${data.amount}`
      )
      .pipe(
        tap((response) => {
          this.conversionResultSubject.next(response);
        })
      );
    // return this.http.post<IConvertResponse>(`${this.baseURL}/v1/conversion`, data);

  }
  // compare(data: ICurrencyConvert): Observable<IConvertResponse> {
  //   return this.http.post<IConvertResponse>(
  //     `${this.baseURL}/v1/currency/convert/{data.from}/{data.to}/{data.amount}`,
  //     data
  //   );
  //   // return this.http.post<IConvertResponse>(`${this.baseURL2}/v1/conversion`, data);
  // }
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
  getConversionResultObservable(): Observable<IConvertResponse | null> {
    return this.conversionResultSubject.asObservable();
  }
  getFromCurrency() {
    return this.fromCurrency;
  }
  setFromCurrency(currency: ICurrency) {
    this.fromCurrency = currency;
  }
  convertCurrency(toCurrency: ICurrency, amount: number) {
    // console.log('FROM CURRENCY IN SERVICE' + this.fromCurrency.currencyCode);
    // this.conversionResult = amount;
    // this.convert({
    //   from: this.fromCurrency.id,
    //   to: toCurrency.id,
    //   amount: amount,
    // }).subscribe((res) => {
    //   this.conversionResult = res.conversion_result;
    //   console.log('Conversion result:' + res.conversion_result);
    //   return this.conversionResult;
    // });
    // return this.conversionResult;

    return this.convert({
      from: this.fromCurrency.id,
      to: toCurrency.id,
      amount: amount,
    }).pipe(map((response) => response.conversion_result));
  }
  convertCurrency2(toCurrency: ICurrency, amount: number) {
    console.log('FROM CURRENCY IN SERVICE' + this.fromCurrency.currencyCode);
    this.convert2({
      from: this.fromCurrency.id,
      to: toCurrency.id,
      amount: amount,
    }).subscribe((res) => {
      this.conversionResult = res.conversion_result;
      console.log('Conversion result:' + res.conversion_result);
      return this.conversionResult;
    });
    return this.conversionResult;
  }
}
