import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICurrency, ICurrencyResponse } from '../currency.structure';

@Injectable({
  providedIn: 'root',
})
export class BackendDataService {
  private url =
    'http://ec2-18-134-206-213.eu-west-2.compute.amazonaws.com/api/v1';
  constructor(private http: HttpClient) {}
  getCurrencies() {
    return this.http.get<ICurrencyResponse>(`${this.url}/currency`);
  }
}
