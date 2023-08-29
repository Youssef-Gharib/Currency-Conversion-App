import { Component, Input } from '@angular/core';
import { ICurrency } from 'src/app/models/currency.model';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent {
  @Input() currency!: ICurrency;
}
