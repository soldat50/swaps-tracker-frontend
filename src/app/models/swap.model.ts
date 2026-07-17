import { SwapDirectionEnum, FloatingIndexEnum, CurrencyEnum } from "./swap.enum";

export interface Swap {
    id: string;
    direction: SwapDirectionEnum;
    notional: number;
    currency: CurrencyEnum;
    startDate: Date;
    endDate: Date;
    fixedRate: number;
    floatingIndex: FloatingIndexEnum;
    capturedFloatingRate: number;
}
