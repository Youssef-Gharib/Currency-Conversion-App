import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ICurrency, ICurrencyCompare } from 'src/app/models/currency.model';
import { finalize } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit {
  @Output() onAction: EventEmitter<any> = new EventEmitter();

  loading = false;
  selectedCurrency: ICurrency = {
    "id": 11,
    "currencyCode": "EGP",
    "flagUrl": "https://flagcdn.com/h60/eg.png"

  };
  selectedCurrency1: ICurrency = {
    "id": 1,
    "currencyCode": "USD",
    "flagUrl": "https://flagcdn.com/h60/us.png"
  };
  selectedCurrency2: ICurrency = {
    "id": 3,
    "currencyCode": "GBP",
    "flagUrl": "https://flagcdn.com/h60/gb.png"
  };


  amount: number = 1;
  currencyFrom: ICurrency = this.selectedCurrency;
  currency1To: ICurrency = this.selectedCurrency1;
  currency2To: ICurrency = this.selectedCurrency2;
  result1!: number;
  result2!: number;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.submit();
  }

  submit() {
    this.loading = true;
    let data: ICurrencyCompare = {
      amount: this.amount,
      baseCurrencyId: this.currencyFrom.id,
      targetCurrencyIds: [this.currency1To.id, this.currency2To.id]
    }

    this.apiService.compare(data).pipe(finalize(() => this.loading = false)).subscribe({
      next: (res) => {
        this.result1 = res.compare_result[0];
        this.result2 = res.compare_result[1];

        let res1 = { ...this.currency1To, ...{ rate: this.result1 } };
        let res2 = { ...this.currency2To, ...{ rate: this.result2 } };

        this.onAction.emit([res1, res2]);
      }
    })
  };

}

