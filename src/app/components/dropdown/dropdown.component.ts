import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICurrency } from 'src/app/models/icurrencies';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() selectedCurrency!: ICurrency;
  @Output() getSelectedCurrency: EventEmitter<ICurrency> = new EventEmitter();

  constructor(public appService: AppService) { }




}
