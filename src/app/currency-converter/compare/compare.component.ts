import { Component } from '@angular/core';
import { ICurrency, ICurrencyConvert } from 'src/app/models/icurrencies';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent {
  loading = false;
  selectedCurrency: ICurrency = {
    "id": 11,
    "currencyCode": "EGP",
    "flagUrl": "https://flagcdn.com/h60/eg.png"
  };
  selectedCurrency1: ICurrency =  {
    "id": 1,
    "currencyCode": "USD",
    "flagUrl": "https://flagcdn.com/h60/us.png"
  };
  selectedCurrency2: ICurrency = {
    "id": 3,
    "currencyCode": "GBP",
    "flagUrl": "https://flagcdn.com/h60/gb.png"
  };
  amount: number= 1;
  currencyFrom!: ICurrency;
  currencyTo!: ICurrency;
  result: number=1;
  constructor(private appService: AppService) { }
  
  submit() {
    this.loading = true;
    let data: ICurrencyConvert = {
      from: this.currencyFrom.currencyCode,
      to: this.currencyTo.currencyCode,
      amount: this.amount,
    }

    this.appService.convert(data).subscribe({
      next: (res) => {
        this.result = res.result;
        this.loading = false;
      }
    })
  }

  getSelected(e: ICurrency) {
    console.log(e);
  }
}
