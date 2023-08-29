import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LiveRatesComponent } from './components/live-rates/live-rates.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CurrencyBlockComponent } from './components/currency-block/currency-block.component';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
// import { HeaderComponent } from './core/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LiveRatesComponent,
    FavoritesComponent,
    CurrencyBlockComponent,
    PageLoaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
