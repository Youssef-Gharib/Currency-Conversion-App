import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IToggleDataModel } from 'src/app/models/toggle.model';

@Component({
  selector: 'toggle-btns',
  templateUrl: './toggle-btns.component.html',
  styleUrls: ['./toggle-btns.component.scss']
})
export class ToggleBtnsComponent implements OnInit {
  @Input() toggleData: IToggleDataModel[] = [];
  @Input() activeBtn?: string;

  @Output() setActive$ = new EventEmitter<string>();

  ngOnInit(): void {
    if (!this.activeBtn && this.toggleData?.length) {
      this.activeBtn = this.toggleData[0].status;
    }
  }

  setActiveBtn(status: string) {
    this.activeBtn = status;
    this.setActive$.emit(status);
  }
}
