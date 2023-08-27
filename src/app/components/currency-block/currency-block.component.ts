import { Component, Input } from '@angular/core';
import { Currency } from 'src/app/models/icurrencies';

@Component({
  selector: 'app-currency-block',
  templateUrl: './currency-block.component.html',
  styleUrls: ['./currency-block.component.scss'],
})
export class CurrencyBlockComponent {
  @Input() currency!: Currency;
}
