import { Component } from '@angular/core';
import { AppService } from './app.service';
import { ICurrencies } from './icurrencies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Final-Project';
  currencies!: ICurrencies[];
  constructor(private service: AppService) {}
  ngOnInit() {
    this.service.renderCurrency().subscribe((data: any) => {
      this.currencies = data.conversion_rates;
      console.log(data.conversion_rates);
      for (let key in this.currencies) {
        console.log(key + ': ' + this.currencies[key]);
      }
    });
  }
}
