import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  @Output() close$ = new EventEmitter<boolean>();
  currency!: string;
  rate!: number;
  close() {
    // this.close$.emit(true);
    setTimeout(() => {
      this.close$.emit(true);
    }, 1000);
  }
}
