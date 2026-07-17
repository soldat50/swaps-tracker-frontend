import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingRateCardComponent } from './floating-rate-card.component';

describe('FloatingRateCardComponent', () => {
  let component: FloatingRateCardComponent;
  let fixture: ComponentFixture<FloatingRateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingRateCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingRateCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
