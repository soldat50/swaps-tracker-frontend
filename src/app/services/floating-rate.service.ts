import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FloatingRateService {
  private readonly INITIAL_RATE: number = 0.02;
  private readonly INTERVAL_MS: number = 3000;
  private readonly MAX_VARIATION: number = 0.0005;
  private readonly MIN_VARIATION: number = -0.0005;

  private readonly _rate = signal(this.INITIAL_RATE);
  public readonly currentRate = this._rate.asReadonly();
  
  constructor() {
    setInterval(() => {
      const variation = this.getVariation();
      this._rate.update(currRate => currRate + variation); 
    }, this.INTERVAL_MS);
  }

  private getVariation(): number {
   return (
      Math.random() * (this.MAX_VARIATION - this.MIN_VARIATION) + this.MIN_VARIATION
    );
  }
}
