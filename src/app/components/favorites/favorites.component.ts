import { Component, EventEmitter, Output } from '@angular/core';
import { ICurrency } from 'src/app/models/icurrencies';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  @Output() close$ = new EventEmitter<boolean>();
  currency!: string;
  rate!: number;
  currencies!: ICurrency[];
  favCurrencies: string[] = [];
  constructor(private currencyService: AppService) {}
  close() {
    // this.close$.emit(true);
    setTimeout(() => {
      this.close$.emit(true);
    }, 1000);
  }
  ngOnInit() {
    this.currencyService.getCurrencies().subscribe((res) => {
      this.currencies = res;
      this.currencyService.setCurrencies(res);
      this.currencyService.currenciesDataFetched.next(true);
    });

    // console.log(this.currencies);
    // this.currencies.forEach((currency) => {
    //   console.log(currency.id);
    //   console.log(currency.currencyCode);
    //   console.log(currency.flagUrl);
    // });

    // this.currencyService.renderCurrencies().subscribe((res:any) => {
    //   this.currencies = res.currency_list;
    //   console.log(this.currencies);
    //   this.currencies.forEach((currency) => {
    //     console.log(currency.id);
    //     console.log(currency.currencyCode);
    //     console.log(currency.flagUrl);
    //   });
    // });
  }
  onCheckboxChange(selectedCurrency: ICurrency) {
    // if error change to any
    const selectedCurrencies = JSON.parse(
      localStorage.getItem('selectedCurrencies') || '[]'
    );
    if (selectedCurrencies.includes(selectedCurrency.currencyCode)) {
      const index = selectedCurrencies.indexOf(selectedCurrency.currencyCode);
      selectedCurrencies.splice(index, 1);
      this.favCurrencies.push(selectedCurrency.currencyCode);
    } else {
      selectedCurrencies.push(selectedCurrency.currencyCode);
    }
    localStorage.setItem(
      'selectedCurrencies',
      JSON.stringify(selectedCurrencies)
    );
    this.currencyService.setSelectedCurrencies(selectedCurrencies);
    console.log('Finished onCheckBoxChange');
    console.log('Selected Currencies in onCheckBox: ' + selectedCurrencies);
  }
}
