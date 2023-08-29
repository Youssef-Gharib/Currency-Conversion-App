import { Component, OnInit } from '@angular/core';
import { ICurrency, ICurrencyConvert } from 'src/app/models/currency.model';
import { finalize } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
})
export class ConvertComponent implements OnInit {
  loading = false;
  selectedCurrencyFrom: ICurrency = {
    id: 11,
    currencyCode: 'EGP',
    flagUrl: 'https://flagcdn.com/h60/eg.png',
  };
  selectedCurrencyTo: ICurrency = {
    id: 1,
    currencyCode: 'USD',
    flagUrl: 'https://flagcdn.com/h60/eg.png',
  };
  amount: number = 1;
  currencyFrom: ICurrency = this.selectedCurrencyFrom;
  currencyTo: ICurrency = this.selectedCurrencyTo;
  conversion_result!: number;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.submit();
  }

  submit() {
    this.loading = true;
    let data: ICurrencyConvert = {
      from: this.currencyFrom.id,
      to: this.currencyTo.id,
      amount: this.amount,
    };
    this.apiService.fromCurrencyId.next(this.currencyFrom.id);
    this.apiService
      .convert(data)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.conversion_result = res.conversion_result;
        },
      });
  }
}
