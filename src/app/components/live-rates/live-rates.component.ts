import { Component, OnInit } from '@angular/core';
import { ICurrency } from 'src/app/models/icurrencies';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-live-rates',
  templateUrl: './live-rates.component.html',
  styleUrls: ['./live-rates.component.scss'],
})
export class LiveRatesComponent implements OnInit {
  selectedCurrencies: string[] = [];
  currenciesArray: ICurrency[] = [];
  currencyDataArray: ICurrency[] = [];
  showFavorites = false;

  constructor(private currencyService: AppService) {}

  ngOnInit(): void {
    this.currenciesArray = this.currencyService.getCurrenciesArray();
    console.log('CURRENCIES ARRAY:' + this.currenciesArray);
    this.currencyService.currenciesDataFetched.subscribe((dataFetched) => {
      if (dataFetched) {
        this.currenciesArray = this.currencyService.getCurrenciesArray();
        console.log('CURRENCIES ARRAY:' + this.currenciesArray);
        // this.currencyDataArray = this.selectedCurrencies
        //   .map((currencyCode) =>
        //     this.currenciesArray.find(
        //       (currency) => currency.currencyCode === currencyCode
        //     )
        //   )
        //   .filter((currency) => currency != undefined) as ICurrency[];
        //bring back

        console.log(
          JSON.stringify(this.currencyDataArray) +
            'CURRENCIES SELECTED AT BEGINNING'
        );
        for (let currency of this.currencyDataArray) {
          console.log(currency.currencyCode + ' CURRENCY CODE');
        }
      }
    });

    this.selectedCurrencies = this.currencyService.getFavCurrencies();
    this.currencyService.triggerReloadCurrencies();
    console.log(
      'SELECTED CURRENCIES IN LIVE RATES: ' + this.selectedCurrencies
    );

    // this.currencyDataArray = this.selectedCurrencies
    //   .map((currencyCode) =>
    //     this.currenciesArray.find(
    //       (currency) => currency.currencyCode === currencyCode
    //     )
    //   )
    //   .filter((currency) => currency != undefined) as ICurrency[];
    //bring back
    console.log(
      this.currencyDataArray + 'CURRENCIES SELECTED AT BEGINNINGGGGGG'
    );

    this.currencyService
      .getConversionResultObservable()
      .subscribe((conversionResult) => {
        if (conversionResult) {
          console.log(
            'From Currency' +
              this.currencyService.getFromCurrency().currencyCode
          );
          // Update rates based on the conversion result
          const fromCurrency = this.currencyService.getFromCurrency();
          const conversionRate = conversionResult.conversion_result;
          // this.currencyDataArray.forEach((currencyData) => {
          //   //logic is hereeeee
          //   console.log('TO CURRENCIES' + currencyData.currencyCode);
          //   // currencyData.rate = conversionResult.conversion_result;

          //   // currencyData.rate = this.currencyService.convertCurrency(
          //   // currencyData,
          //   // 1
          //   // );
          //   // currencyData.rate = response.conversion_result;

          //   console.log(currencyData.currencyCode + 'CURRENCY CODE');
          // });
          //bring backk
        }
      });

    this.selectedCurrencies = this.currencyService.getFavCurrencies();
    this.currencyService.triggerReloadCurrencies();

    this.currencyService
      .getSelectedCurrenciesObservable()
      .subscribe((currencies) => {
        this.selectedCurrencies = currencies;
        this.currencyDataArray = this.selectedCurrencies
          .map((currencyCode) => {
            const currencyData =
              this.currencyService.getCurrencyDataFromSelected(currencyCode);

            return currencyData
              ? {
                  id: currencyData.id,
                  currencyCode: currencyData.currencyCode,
                  flagUrl: currencyData.flagUrl,
                  rate: currencyData.rate,
                }
              : null;
          })
          .filter((currencyData) => currencyData !== null) as ICurrency[];
        console.log(JSON.stringify(this.currencyDataArray) + 'DATA ARRAYYY');

        this.currencyDataArray.forEach((currencyData) => {
          console.log(currencyData.currencyCode + ' CURRENCY CODE');

          // currencyData.rate = this.currencyService.convertCurrency(
          //   currencyData,
          //   1

          this.currencyService
            .convertCurrency(currencyData, 1)
            .subscribe((conversionResult) => {
              currencyData.rate = conversionResult;
            });
          // );
          console.log(currencyData.rate + ' CURRENCY RATE');
        });
      });

    // Subscribe to the conversion result observable
    // this.currencyService.selectedCurrency$.subscribe((selectedCurrency) => {
    //   if (selectedCurrency) {
    //     // Get the "from" currency from the ConvertComponent
    //     const fromCurrency = this.currencyService.fromCurrency;

    //     // Compare the selected currency with the "from" currency
    //     if (fromCurrency && fromCurrency.id === selectedCurrency.id) {
    //       // The selected currency matches the "from" currency
    //       console.log(
    //         'Selected currency matches "from" currency:',
    //         selectedCurrency
    //       );
    //     } else {
    //       console.log(
    //         'Selected currency does not match "from" currency:',
    //         selectedCurrency
    //       );
    //     }
    //   }
    // });
    // this.currencyDataArray = JSON.parse(
    //   localStorage.getItem('selectedCurrencies') || '[]'
    // );
    // const fromCurrency = this.currencyService.getFromCurrency();

    // if (fromCurrency) {
    //   this.currencyDataArray.forEach((currencyData) => {
    //     const toCurrency = this.currencyService.getCurrencyDataFromSelected(
    //       currencyData.currencyCode
    //     );

    // if (toCurrency) {
    //   this.currencyService
    //     .convert({
    //       from: fromCurrency.id,
    //       to: toCurrency.id,
    //       amount: 1,
    //     })
    //     .subscribe((response) => {
    //       currencyData.rate = response.conversion_result;
    //     });
    // }
    //   });
    // }
  }
}
