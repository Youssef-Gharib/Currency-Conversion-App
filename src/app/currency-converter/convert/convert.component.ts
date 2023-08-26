import { Component } from '@angular/core';
import { ICurrency, ICurrencyConvert } from 'src/app/models/icurrencies';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],

})
export class ConvertComponent {
  selectedCurrency: ICurrency = {
    code: 'EGP',
    desc: 'Egyptian Pound'
  };

  currencyFrom!: ICurrency;
  currencyTo!: ICurrency;
  result!: number;
  constructor(private appService: AppService) { }

  submit() {
    let data: ICurrencyConvert = {
      from: this.currencyFrom.code,
      to: this.currencyTo.code,
      amount: 100
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
