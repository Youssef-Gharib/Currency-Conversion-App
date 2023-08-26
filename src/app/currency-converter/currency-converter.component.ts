import { Component } from '@angular/core';
import { ToggleStaticsData } from '../static/data.static';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent {
  toggleData = ToggleStaticsData;
  activeTab = ToggleStaticsData[0].status;

}
