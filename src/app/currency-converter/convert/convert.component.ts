import { Component } from '@angular/core';
import { ICurrency, ICurrencyConvert } from 'src/app/models/icurrencies';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],

})
export class ConvertComponent {
  selectedCurrency: ICurrency =  {
    "id": 11,
    "currencyCode": "EGP",
    "flagUrl": "https://flagcdn.com/h60/eg.png"
};

  currencyFrom!: ICurrency;
  currencyTo!: ICurrency;
  result!: number;
  constructor(private appService: AppService) { }

  submit() {
    let data: ICurrencyConvert = {
      from: this.currencyFrom.currencyCode,
      to: this.currencyTo.currencyCode,
      amount: 1
    }

    this.appService.convert(data).subscribe({
      next: (res) => {
        this.result = res.result;
      }
    })
  }

  getSelected(e: ICurrency) {
    console.log(e);
  }
}
