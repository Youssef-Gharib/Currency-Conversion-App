import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CompareComponent } from './compare/compare.component';
import { ConvertComponent } from './convert/convert.component';
// import { HeaderComponent } from './core/header/header.component';

@NgModule({
  declarations: [AppComponent, ConvertComponent, CompareComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
