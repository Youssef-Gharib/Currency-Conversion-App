import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICurrency } from 'src/app/currency.structure';
import { BackendDataService } from 'src/app/services/backend-data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  @Output() close$ = new EventEmitter<boolean>();
  currencies: ICurrency[] = [];
  rate!: number;
  close() {
    // this.close$.emit(true);
    setTimeout(() => {
      this.close$.emit(true);
    }, 1000);
  }
  constructor(private service: BackendDataService) {}
  ngOnInit() {
    this.service.getCurrencies().subscribe((data) => {
      console.log(data);
      this.currencies = data.currencyList;
    });
    console.log(this.currencies);
  }
}
