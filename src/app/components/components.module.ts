import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleBtnsComponent } from './toggle-btns/toggle-btns.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    CustomInputComponent,
    ToggleBtnsComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,

  ],
  exports: [
    CustomInputComponent,
    ToggleBtnsComponent,
    DropdownComponent
  ]
})
export class ComponentsModule { }
