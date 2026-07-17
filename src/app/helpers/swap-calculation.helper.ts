import { CurrencyEnum, SwapDirectionEnum } from "../models/swap.enum";
import { Swap } from "../models/swap.model";

const DAYS_PER_YEAR = 365;
const EUR_TO_USD_RATE = 1.15;

export function calculateDurationInYears(
  startDate: Date,
  endDate: Date
): number {
  const millisecondsPerYear = DAYS_PER_YEAR * 24 * 60 * 60 * 1000;

  return (
    (endDate.getTime() - startDate.getTime()) /
    millisecondsPerYear
  );
}

export function calculateNpv(
  direction: SwapDirectionEnum,
  floatingRate: number,
  fixedRate: number,
  notional: number,
  durationInYears: number
): number {
  if (direction === SwapDirectionEnum.PAY_FIXED) {
    return (
      (floatingRate - fixedRate) *
      notional *
      durationInYears
    );
  }

  return (
    (fixedRate - floatingRate) *
    notional *
    durationInYears
  );
}

export function convertCurrency(
  amount: number,
  sourceCurrency: CurrencyEnum,
  targetCurrency: CurrencyEnum
): number {
  if (sourceCurrency === targetCurrency) {
    return amount;
  }

  if (
    sourceCurrency === CurrencyEnum.EUR &&
    targetCurrency === CurrencyEnum.USD
  ) {
    return amount * EUR_TO_USD_RATE;
  }

  return amount / EUR_TO_USD_RATE;
}