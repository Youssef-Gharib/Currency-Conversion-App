import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyConverterRoutingModule } from './currency-converter-routing.module';
import { CurrencyConverterComponent } from './currency-converter.component';
import { ConvertComponent } from './convert/convert.component';
import { CompareComponent } from './compare/compare.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [
    CurrencyConverterComponent,
    ConvertComponent,
    CompareComponent
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
