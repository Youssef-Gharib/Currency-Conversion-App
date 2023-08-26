import { Component } from '@angular/core';
import { ToggleStaticsData } from '../../static/data.static';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],

})
export class ConvertComponent {
  toggleData = ToggleStaticsData;
  activeTab = ToggleStaticsData[0].status;

  
}
