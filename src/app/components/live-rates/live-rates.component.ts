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
  updateConversionRates(fromCurrencyCode: string) {
    if (fromCurrencyCode) {
      const fromCurrency = this.currencyDataArray.find(
        (currency) => currency.currencyCode === fromCurrencyCode
      );
      if (fromCurrency) {
        this.currencyDataArray.forEach((currency) => {
          if (currency.currencyCode !== fromCurrency.currencyCode) {
            this.currencyService
              .convert({
                from: fromCurrency.id,
                to: currency.id,
                amount: 1,
              })
              .subscribe((response) => {
                currency.rate = response.result;
              });
          } else {
            currency.rate = 1;
          }
        });
      }
    }
  }
  ngOnInit(): void {
    const storedSelectedCurrencies = this.currencyService.getFavCurrencies();
    this.selectedCurrencies = storedSelectedCurrencies;
    this.currencyService.triggerReloadCurrencies();
    const fromCurrencyCode = 'YOUR_SELECTED_FROM_CURRENCY_CODE';
    const fromCurrency =
      this.currencyService.getCurrencyDataFromSelected(fromCurrencyCode);

    if (fromCurrency) {
      this.currencyDataArray.forEach((currencyData) => {
        const toCurrency = this.currencyService.getCurrencyDataFromSelected(
          currencyData.currencyCode
        );

        if (toCurrency) {
          this.currencyService
            .convert({
              from: fromCurrency.id,
              to: toCurrency.id,
              amount: 1,
            })
            .subscribe((response) => {
              currencyData.rate = response.result;
            });
        }
      });
    }
    if (this.currencies) {
      this.currencies.forEach((currency: any) => {
        if (this.selectedCurrencies.includes(currency.currencyCode)) {
          // currency.checked = true;
          currency.checked = this.selectedCurrencies.includes(
            currency.currencyCode
          );
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
              console.log('ID:' + currencyData.id);
              console.log('CODE:' + currencyData.currencyCode);
              console.log('FLAG:' + currencyData.flagUrl);
              console.log('RATE:' + currencyData.rate);
              return {
                id: currencyData.id,
                currencyCode: currencyData.currencyCode,
                flagUrl: currencyData.flagUrl,
                rate: currencyData.rate,
              };
            }
            return null;
          })
          .filter((currencyData) => currencyData !== null) as ICurrency[];
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
      console.log(this.currencyDataArray + 'CURRENCIES SELECTED AT BEGINING');
    });
  }
}
