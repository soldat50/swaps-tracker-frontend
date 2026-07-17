import {
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';

import { Swap } from "../../../models/swap.model";

type SwapState = {
  swaps: readonly Swap[];
};

const initialState: SwapState = {
  swaps: []
};

export const SwapsStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withMethods(store => ({
    addSwap(swap: Swap): void {
      patchState(store, {
        swaps: [swap, ...store.swaps()].slice(0, 5)
      });
    }
  }))
);
