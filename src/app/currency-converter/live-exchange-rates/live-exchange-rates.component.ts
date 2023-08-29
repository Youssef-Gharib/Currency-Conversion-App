import { Component } from '@angular/core';
import { ICurrency } from 'src/app/models/currency.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'live-exchange-rates',
  templateUrl: './live-exchange-rates.component.html',
  styleUrls: ['./live-exchange-rates.component.scss'],
})
export class LiveExchangeRatesComponent {
  currencies: ICurrency[] = [];
  portfolioCurrencies: ICurrency[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getCurrencies();
    this.getCompare();
  }

  getPortofolioIds() {
    let ids: number[] = [];
    this.portfolioCurrencies.forEach((el) => {
      ids.push(el.id);
    });
    return ids;
  }

  getCompare() {
    this.apiService.fromCurrencyId.subscribe((id) => {
      this.apiService
        .compare({
          amount: 1,
          baseCurrencyId: id,
          targetCurrencyIds: this.getPortofolioIds(),
        })
        .subscribe({
          next: (res) => {
            console.log(res);

            this.portfolioCurrencies.map((c, index) => {
              c.rate = res.compare_result[index];
            });
          },
        });
    });
  }

  getCurrencies() {
    this.getMyPortfolio();
    this.apiService.getCurrencies().subscribe({
      next: (res) => {
        res.forEach((c) => {
          this.portfolioCurrencies.forEach((el) => {
            if (c.currencyCode === el.currencyCode) {
              c.selected = el.selected;
            }
          });
        });
        this.currencies = res;
      },
    });
  }

  getMyPortfolio() {
    this.portfolioCurrencies = this.apiService.getPortfolio();
  }

  getSelectedCurrency(c: ICurrency) {
    this.apiService.updatePortfolio(c);
    this.getMyPortfolio();
  }
}
