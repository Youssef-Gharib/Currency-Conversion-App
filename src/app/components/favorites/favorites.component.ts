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
  selectedCurrencyCodes: any;
  constructor(private currencyService: AppService) {}
  close() {
    setTimeout(() => {
      this.close$.emit(true);
    }, 1000);
  }
  ngOnInit() {
    const storedSelectedCurrencies = this.currencyService.getFavCurrencies();
    this.selectedCurrencyCodes = storedSelectedCurrencies;
    this.currencyService.setSelectedCurrencies(storedSelectedCurrencies);
    console.log(
      'SELECTED CURRENCIES IN SERVICE: ' +
        this.currencyService.getFavCurrencies()
    );
    this.currencyService.triggerReloadCurrencies();

    console.log('FAV CURRENCIES ' + this.selectedCurrencyCodes);
    this.currencyService.getCurrencies().subscribe((res) => {
      this.currencies = res;
      this.currencies.forEach((currency) => {
        if (this.selectedCurrencyCodes.includes(currency.currencyCode)) {
          currency.checked = true;
        }
      });
      this.currencyService.setCurrencies(res);
      this.currencyService.currenciesDataFetched.next(true);
      this.favCurrencies = storedSelectedCurrencies;
      this.selectedCurrencyCodes.forEach((currencyCode: any) => {
        const currency = this.currencies.find(
          (c) => c.currencyCode === currencyCode
        );
        if (currency) {
          this.favCurrencies.push(currency.currencyCode);
        }
      });
    });
  }
  onCheckboxChange(selectedCurrency: ICurrency) {
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
