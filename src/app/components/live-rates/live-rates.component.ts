import { Component, OnInit } from '@angular/core';
import { BackendDataService } from 'src/app/services/backend-data.service';

@Component({
  selector: 'app-live-rates',
  templateUrl: './live-rates.component.html',
  styleUrls: ['./live-rates.component.scss'],
})
export class LiveRatesComponent implements OnInit {
  showFavorites = false; // add access modifier
  private currencies = [];
  constructor(private service: BackendDataService) {}
  ngOnInit() {}
}
