import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleBtnsComponent } from './toggle-btns/toggle-btns.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyBlockComponent } from './currency-block/currency-block.component';

@NgModule({
  declarations: [CustomInputComponent, ToggleBtnsComponent, DropdownComponent, CurrencyBlockComponent],
  imports: [CommonModule, FormsModule, DropdownModule],
  exports: [CustomInputComponent, ToggleBtnsComponent, DropdownComponent],
})
export class ComponentsModule {}
