import { Component, ViewChild } from '@angular/core';
import { ToggleStaticsData } from '../static/data.static';
import { ApiService } from '../services/api.service';
import { LiveExchangeRatesComponent } from './live-exchange-rates/live-exchange-rates.component';
import { ICurrency } from '../models/currency.model';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent {
  @ViewChild('exchangeRatesRef') exchangeRatesRef!: LiveExchangeRatesComponent;

  toggleData = ToggleStaticsData;
  activeTab = ToggleStaticsData[0].status;


  constructor(private apiService: ApiService) { }



  checkForChanges(rates:any) {
    console.log(rates);
    const oldPortfolio = this.apiService.getPortfolio();
    console.log(oldPortfolio);
    oldPortfolio.forEach((el:ICurrency) => {
      rates.forEach((r:any) => {
        if (el.currencyCode === r.currencyCode) {
          el.rate = r.rate;
        }
      })
    });
    this.apiService.setNewPortfolio(oldPortfolio);
    this.exchangeRatesRef.getMyPortfolio();
  }

}
