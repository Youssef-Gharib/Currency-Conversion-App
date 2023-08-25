import { Component , Input, Output, EventEmitter, OnInit} from '@angular/core';

export interface ToggleDataModel{
  title: string;
  status: string;
}

@Component({
  selector: 'toggle-btns',
  template: `<button 
  class="toggle-btn"
  *ngFor="let e of toggleData" 
  [ngClass]="{'toggle-btn-active':activeBtn == e.status}"
  (click)=" setActiveBtn(e.status)"
  >
  {{e.title}}
  </button>`,
  styleUrls: ['./toggle-btns.component.scss']
})
export class ToggleBtnsComponent implements OnInit {
  @Input() toggleData: ToggleDataModel[]=[] ;
  @Input() activeBtn?: string ;

  @Output() setActive$ = new EventEmitter<string>();

  ngOnInit(): void {
    if (!this.activeBtn && this.toggleData?.length) {
      this.activeBtn = this.toggleData[0].status;
    }
  }

  setActiveBtn(status: string){
    this.activeBtn = status;
    this.setActive$.emit(status);
  }
}
