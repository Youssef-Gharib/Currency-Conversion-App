import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyConverterRoutingModule } from './currency-converter-routing.module';
import { CurrencyConverterComponent } from './currency-converter.component';
import { ConvertComponent } from './convert/convert.component';
import { CompareComponent } from './compare/compare.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AddToFavComponent } from './add-to-fav/add-to-fav.component';
import { LiveExchangeRatesComponent } from './live-exchange-rates/live-exchange-rates.component';
import { PortfolioCardComponent } from './live-exchange-rates/portfolio-card/portfolio-card.component';


@NgModule({
  declarations: [
    CurrencyConverterComponent,
    ConvertComponent,
    CompareComponent,
    AddToFavComponent,
    LiveExchangeRatesComponent,
    PortfolioCardComponent
  ],
  imports: [
    CommonModule,
    CurrencyConverterRoutingModule,
    ComponentsModule,
    FormsModule,
    ProgressSpinnerModule
  ]
})
export class CurrencyConverterModule { }
