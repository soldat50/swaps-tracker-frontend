import { DecimalPipe, PercentPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { SwapsStore } from '../../store/swaps.store';
import { FloatingRateService } from '../../../../services/floating-rate.service';

import { CurrencyEnum } from '../../../../models/swap.enum';
import { calculateDurationInYears, calculateNpv, convertCurrency } from '../../../../helpers/swap-calculation.helper';

@Component({
  selector: 'app-swap-table',
  standalone: true,
  imports: [
    PercentPipe,
    DecimalPipe,
  ],
  templateUrl: './swap-table.component.html',
  styleUrl: './swap-table.component.scss',
})
export class SwapTableComponent {
  private readonly swapStore = inject(SwapsStore);
  private readonly floatingRateService = inject(FloatingRateService);

  protected readonly CurrencyEnum = CurrencyEnum;

  protected readonly displayCurrency =
    this.swapStore.displayCurrency;

  protected readonly currentFloatingRate =
    this.floatingRateService.currentRate;

  protected readonly swapList = computed(() => {
    const floatingRate = this.currentFloatingRate();
    const displayCurrency = this.displayCurrency();

    return this.swapStore.swaps().map(swap => {
      const durationInYears = calculateDurationInYears(
        swap.startDate,
        swap.endDate
      );

      const npvInSwapCurrency = calculateNpv(
        swap.direction,
        floatingRate,
        swap.fixedRate,
        swap.notional,
        durationInYears
      );

      const displayedNpv = convertCurrency(
        npvInSwapCurrency,
        swap.currency,
        displayCurrency
      );

      return {
        ...swap,
        durationInYears,
        displayedNpv,
      };
    });
  });

  protected setDisplayCurrency(currency: CurrencyEnum): void {
    this.swapStore.setDisplayCurrency(currency);
  }
}
