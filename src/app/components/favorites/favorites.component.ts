import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Currency } from 'src/app/models/icurrencies';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  @Output() close$ = new EventEmitter<boolean>();
  currency!: string;
  rate!: number;
  currencies!: Currency[];
  constructor(private currencyService: AppService) {}
  close() {
    // this.close$.emit(true);
    setTimeout(() => {
      this.close$.emit(true);
    }, 1000);
  }
  ngOnInit() {
    this.currencyService.renderCurrencies().subscribe((res: any) => {
      this.currencies = res.currency_list;
      console.log(this.currencies);
      this.currencies.forEach((currency) => {
        console.log(currency.id);
        console.log(currency.currencyCode);
        console.log(currency.flagUrl);
      });
    });
  }
  // ngOnInit() {
  //   this.currencyService.renderCurrencies().subscribe((data) => {
  //     console.log('Data' + data);
  //     this.currencies = data;
  //   });
  // }
  filterCurrencies() {
    localStorage.setItem('favorites', JSON.stringify(this.currencies));
  }
}
