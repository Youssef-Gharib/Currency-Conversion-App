import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveExchangeRatesComponent } from './live-exchange-rates.component';

describe('LiveExchangeRatesComponent', () => {
  let component: LiveExchangeRatesComponent;
  let fixture: ComponentFixture<LiveExchangeRatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveExchangeRatesComponent]
    });
    fixture = TestBed.createComponent(LiveExchangeRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
