import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Final-Project';
  showLoader: boolean = true;
  constructor(private service: ApiService) {
    this.service.getCurrencies().subscribe((data: any) => {
      this.showLoader = false;
      this.service.showLoader = false;
    });
  }
}
