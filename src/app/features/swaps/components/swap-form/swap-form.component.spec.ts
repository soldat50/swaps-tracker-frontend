import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapFormComponent } from './swap-form.component';

describe('SwapFormComponent', () => {
  let component: SwapFormComponent;
  let fixture: ComponentFixture<SwapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwapFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
