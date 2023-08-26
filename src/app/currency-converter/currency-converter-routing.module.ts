import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter.component';
import { currenciesResolver } from '../services/currencies.resolver';

const routes: Routes = [
  { path: '', component: CurrencyConverterComponent, resolve: { post: currenciesResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyConverterRoutingModule { }
