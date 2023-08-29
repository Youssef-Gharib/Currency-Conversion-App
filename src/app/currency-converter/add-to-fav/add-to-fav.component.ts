import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { ICurrency } from 'src/app/models/currency.model';

@Component({
  selector: 'add-to-fav-btn',
  templateUrl: './add-to-fav.component.html',
  styleUrls: ['./add-to-fav.component.scss']
})
export class AddToFavComponent {
  @ViewChild('dropdownBtn') dropdownBtn!: ElementRef;
  @ViewChild('dropdown') dropdown!: ElementRef;
  @Input() currencies: ICurrency[] = [];
  @Output() onSelectCurrency: EventEmitter<ICurrency> = new EventEmitter();

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (this.dropdown && this.dropdown.nativeElement.contains(event.target) || this.dropdownBtn && this.dropdownBtn.nativeElement.contains(event.target)) {
      console.log("clicked inside");
    }  else {
      console.log("clicked outside");
      this.isDropdownOpen = false;
    }
  }

  constructor() { }

  isDropdownOpen = false;

  // Function to toggle the dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSelect(currency: ICurrency) {
    currency.selected = !currency.selected;
    this.onSelectCurrency.emit(currency);
  }

}
