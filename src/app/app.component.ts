import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { ICurrencies } from './models/icurrencies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Final-Project';
  showLoader: boolean = true;
  constructor(private service: AppService) {
    this.service.getCurrencies().subscribe((data: any) => {
      this.showLoader = false;
      this.service.showLoader = false;
    });
  }
}
