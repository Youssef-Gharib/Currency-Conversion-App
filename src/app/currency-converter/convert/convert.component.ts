import { Component } from '@angular/core';
import { ICurrency, ICurrencyConvert } from 'src/app/models/icurrencies';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
})
export class ConvertComponent {
  loading = false;
  selectedCurrency: ICurrency = {
    id: 11,
    currencyCode: 'EGP',
    flagUrl: 'https://flagcdn.com/h60/eg.png',
  };
  amount: number = 1;
  currencyFrom: ICurrency = this.selectedCurrency;
  currencyTo: ICurrency = this.selectedCurrency;
  conversion_result: number = 1;
  constructor(private appService: AppService) {}

  submit() {
    this.loading = true;
    let data: ICurrencyConvert = {
      from: this.currencyFrom.id,
      to: this.currencyTo.id,
      amount: this.amount,
    };
    console.log('FROM' + this.currencyFrom.currencyCode);
    console.log('TO' + this.currencyTo.currencyCode);
    console.log('AMOUNT:' + this.amount);
    this.appService.setFromCurrency(this.currencyFrom);
    console.log(
      'FROM IN APP SERVICE ' + this.appService.getFromCurrency().currencyCode
    );

    this.appService.convert(data).subscribe({
      next: (res) => {
        this.conversion_result = res.conversion_result;
        this.loading = false;
      },
    });
  }

  getSelected(e: ICurrency) {
    this.appService.setSelectedCurrency(e); // new
    console.log(e);
  }
  // performConversion() {
  //   const fromCurrency = this.currencyFrom.id;
  //   const toCurrency = this.currencyTo.id;
  //   const amount = this.amount;
  //   this.appService.setFromCurrency(this.currencyFrom);
  //   console.log('FROM CURRENCY:' + this.currencyFrom.currencyCode);
  //   this.appService
  //     .convert({ from: fromCurrency, to: toCurrency, amount: amount })
  //     .subscribe((res) => {
  //       this.conversion_result = res.conversion_result;
  //       console.log('Conversion result:' + res);
  //     });
  // }
  // convertCurrency(toCurrency: ICurrency, amount: number) {
  //   this.appService.setFromCurrency(this.currencyFrom);
  //   console.log('CONVERT SENDS TO SERVICE' + this.currencyFrom.currencyCode);
  //   this.appService
  //     .convert({
  //       from: this.currencyFrom.id,
  //       to: toCurrency.id,
  //       amount: amount,
  //     })
  //     .subscribe((res) => {
  //       this.conversion_result = res.conversion_result;
  //       console.log('Conversion result:' + res);
  //       this.appService.fromCurrency = this.currencyFrom;
  //       console.log('FROM CURRENCY IN CONVERT' + this.currencyFrom);
  //       return this.conversion_result;
  //     });
  // }
}
