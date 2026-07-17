import { Component, inject, Signal } from '@angular/core';
import { FloatingRateService } from './services/floating-rate.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly _floatingRateService = inject(FloatingRateService);

  protected currentRate: Signal<number> = this._floatingRateService.currentRate;
}
