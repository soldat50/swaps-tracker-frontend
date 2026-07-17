import { Component, inject } from '@angular/core';
import { FloatingRateService } from '../../../../services/floating-rate.service';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-floating-rate-card',
  standalone: true,
  imports: [PercentPipe],
  templateUrl: './floating-rate-card.component.html',
  styleUrl: './floating-rate-card.component.scss',
})
export class FloatingRateCardComponent {
  private readonly _floatingRateService = inject(FloatingRateService);

  protected readonly floatingRateValue = this._floatingRateService.currentRate;
}
