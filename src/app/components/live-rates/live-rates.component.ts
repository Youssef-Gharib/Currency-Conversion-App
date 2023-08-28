import { Component, OnInit } from '@angular/core';
import { ICurrency } from 'src/app/models/icurrencies';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-live-rates',
  templateUrl: './live-rates.component.html',
  styleUrls: ['./live-rates.component.scss'],
})
export class LiveRatesComponent implements OnInit {
  showFavorites = false;
  selectedCurrencies: string[] = [];
  currencies!: any;
  currenciesArray: ICurrency[] = [];
  currencyDataArray: ICurrency[] = [];
  currencyCode!: string;
  currencyRate!: number;
  currencyFlagUrl!: string;
  constructor(private currencyService: AppService) {}
  ngOnInit(): void {
    const storedSelectedCurrencies = this.currencyService.getFavCurrencies();
    this.selectedCurrencies = storedSelectedCurrencies;
    this.currencyService.triggerReloadCurrencies();

    if (this.currencies) {
      this.currencies.forEach((currency: any) => {
        if (this.selectedCurrencies.includes(currency.currencyCode)) {
          currency.checked = true;
          console.log(
            'Currency: LR',
            currency.currencyCode,
            'Checked: LR',
            currency.checked
          );
        }
      });
    }

    console.log(
      'SELECTED CURRENCIES IN LIVE RATES: ' + this.selectedCurrencies
    );
    this.currencyService
      .getSelectedCurrenciesObservable()
      .subscribe((currencies) => {
        this.selectedCurrencies = currencies;
        this.currencyDataArray = this.selectedCurrencies
          .map((currencyCode) => {
            const currencyData =
              this.currencyService.getCurrencyDataFromSelected(currencyCode);
            if (currencyData) {
              // this.currencyCode = currencyData.currencyCode;
              // this.currencyFlagUrl = currencyData.flagUrl;
              console.log('CODE:' + currencyData.currencyCode);
              console.log('FLAG:' + currencyData.flagUrl);
              return {
                currencyCode: currencyData.currencyCode,
                flagUrl: currencyData.flagUrl,
              };
            }
            return null;
          })
          .filter((currencyData) => currencyData !== null) as ICurrency[];
        // console.log(this.selectedCurrencies + 'selected currencies');
      });
    this.currenciesArray = this.currencyService.getCurrenciesArray();
    console.log(this.currenciesArray + 'currenciesArray in Live Rates');
    this.currencyService.currenciesDataFetched.subscribe((dataFetched) => {
      if (dataFetched) {
        this.currenciesArray = this.currencyService.getCurrenciesArray();
        console.log(
          JSON.stringify(this.currenciesArray) + 'currenciesArray in Live Rates'
        );
        this.currencyDataArray = this.selectedCurrencies
          .map((currencyCode) => {
            return this.currenciesArray.find(
              (currency) => currency.currencyCode === currencyCode
            );
          })
          .filter((currency) => currency != undefined) as ICurrency[];
      }
    });
  }
}
