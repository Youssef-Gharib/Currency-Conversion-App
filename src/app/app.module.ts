import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CompareComponent } from './components/compare/compare.component';
import { ConvertComponent } from './components/convert/convert.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';
import { ToggleBtnsComponent } from './components/toggle-btns/toggle-btns.component';
import { DropdwonComponent } from './components/dropdwon/dropdwon.component';
import { FormsModule } from '@angular/forms';
// import { HeaderComponent } from './core/header/header.component';

@NgModule({
  declarations: [AppComponent,
      ConvertComponent, 
      CompareComponent,
      CustomInputComponent,
      CurrencyCardComponent, 
      ToggleBtnsComponent, 
      DropdwonComponent
    ],
  imports: [BrowserModule,
      AppRoutingModule,
      HttpClientModule, 
      FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
