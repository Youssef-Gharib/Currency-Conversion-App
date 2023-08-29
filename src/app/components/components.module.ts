import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleBtnsComponent } from './toggle-btns/toggle-btns.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({

  declarations: [
    ToggleBtnsComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,

  ],
  exports: [
    ToggleBtnsComponent,
    DropdownComponent
  ]

})
export class ComponentsModule {}
