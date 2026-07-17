import {
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';

import { Swap } from '../../../models/swap.model';
import { CurrencyEnum } from '../../../models/swap.enum';

type SwapState = {
  swaps: readonly Swap[];
  displayCurrency: CurrencyEnum;
};

const initialState: SwapState = {
  swaps: [],
  displayCurrency: CurrencyEnum.EUR,
};

export const SwapsStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withMethods(store => ({
    addSwap(swap: Swap): void {
      patchState(store, {
        swaps: [swap, ...store.swaps()].slice(0, 5),
      });
    },

    setDisplayCurrency(currency: CurrencyEnum): void {
      patchState(store, {
        displayCurrency: currency,
      });
    },
  }))
);
