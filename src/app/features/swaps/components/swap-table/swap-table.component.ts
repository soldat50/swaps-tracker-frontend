import { Component, computed, inject } from '@angular/core';
import { SwapsStore } from '../../store/swaps.store';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { calculateDurationInYears } from '../../../../utils/duration.util';

@Component({
  selector: 'app-swap-table',
  standalone: true,
  imports: [
    PercentPipe,
    DecimalPipe
  ],
  templateUrl: './swap-table.component.html',
  styleUrl: './swap-table.component.scss',
})
export class SwapTableComponent {
  private readonly swapStore = inject(SwapsStore);

  protected readonly swapList = computed(() =>
    this.swapStore.swaps().map(swap => ({
      ...swap,
      durationInYears: calculateDurationInYears(
        swap.startDate,
        swap.endDate
      )
    }))
  );
}
