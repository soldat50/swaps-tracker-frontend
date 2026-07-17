import { SwapDirectionEnum, FloatingIndexEnum, CurrencyEnum } from "./swap.enum";

export interface Swap {
    direction: SwapDirectionEnum;
    notional: number;
    currency: CurrencyEnum;
    startDate: Date;
    endDate: Date
    fixedRate: number
    floatingIndex: FloatingIndexEnum 
}
