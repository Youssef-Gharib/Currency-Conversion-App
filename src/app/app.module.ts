import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LiveRatesComponent } from './components/live-rates/live-rates.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CurrencyBlockComponent } from './components/currency-block/currency-block.component';
import { AppService } from './services/app.service';
// import { HeaderComponent } from './core/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LiveRatesComponent,
    FavoritesComponent,
    CurrencyBlockComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
