import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrencies } from './icurrencies';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}
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
