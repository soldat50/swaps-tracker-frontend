import { Component, computed, effect, inject, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyEnum, FloatingIndexEnum, SwapDirectionEnum } from '../../../../models/swap.enum';
import { toSignal } from '@angular/core/rxjs-interop';
import { SwapsStore } from '../../store/swaps.store';
import { FloatingRateService } from '../../../../services/floating-rate.service';

@Component({
  selector: 'app-swap-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './swap-form.component.html',
  styleUrl: './swap-form.component.scss',
})
export class SwapFormComponent {
  private readonly _swapStore = inject(SwapsStore);
  private readonly _floatingRateService = inject(FloatingRateService);

  protected swapForm: FormGroup = this.createSwapForm();

  protected readonly directions = Object.values(SwapDirectionEnum);
  protected readonly currencies = Object.values(CurrencyEnum);

  private readonly selectedCurrencySignal: Signal<CurrencyEnum> = toSignal(
    this.swapForm.controls['currency'].valueChanges,
    {
      initialValue: this.swapForm.controls['currency'].value
    }
  );

  protected readonly availableFloatingIndexes = computed<readonly FloatingIndexEnum[]>(() => {
    if (this.selectedCurrencySignal() === CurrencyEnum.EUR) {
      return [FloatingIndexEnum.ESTR, FloatingIndexEnum.EURIBOR6M]
    } else {
      return [FloatingIndexEnum.SOFR]
    }
  })

  public constructor() {
    effect(() => {
      const currency = this.selectedCurrencySignal();

      const defaultFloatingIndex =
        currency === CurrencyEnum.EUR
          ? FloatingIndexEnum.ESTR
          : FloatingIndexEnum.SOFR;

      this.swapForm.controls['floatingIndex'].setValue(defaultFloatingIndex);
    });
  }

  private createSwapForm(): FormGroup {
    return new FormGroup(
      {
        direction: new FormControl(
          SwapDirectionEnum.PAY_FIXED,
          {
            nonNullable: true
          }
        ),
        notional: new FormControl(
          null,
          {
            validators: [
              Validators.required,
              Validators.min(0)
            ]
          }
        ),
        currency: new FormControl(
          CurrencyEnum.EUR,
          {
            nonNullable: true
          }
        ),
        startDate: new FormControl(
          '',
          {
            nonNullable: true,
            validators: [
              Validators.required
            ]
          }
        ),
        endDate: new FormControl(
          '',
          {
            nonNullable: true,
            validators: [
              Validators.required
            ]
          }
        ),
         fixedRate: new FormControl(
          null,
          {
            nonNullable: true,
            validators: [
              Validators.required,
              Validators.min(0),
              Validators.max(10)
            ]
          }
        ),
        floatingIndex: new FormControl(
          FloatingIndexEnum.ESTR,
          {
            nonNullable: true,
          }
        ),
      }
    )
  }

  protected submit(): void {
    if (this.swapForm.invalid) {
      return;
    }

    const formValue = this.swapForm.getRawValue();

    if (
      formValue.notional === null ||
      formValue.fixedRate === null
    ) {
      return;
    }

    this.addSwapToStore(formValue);
    this.resetForm();
  }

  private addSwapToStore(rawData: any) {
    this._swapStore.addSwap({
      id: crypto.randomUUID(),
      direction: rawData.direction,
      notional: rawData.notional,
      currency: rawData.currency,
      startDate:  new Date(rawData.startDate),
      endDate:  new Date(rawData.endDate),

      // Le formulaire saisit 2 pour représenter 2 %.
      // Le modèle stocke 0.02.
      fixedRate: rawData.fixedRate / 100,

      floatingIndex: rawData.floatingIndex,

      // Taux enregistré au moment de la création du swap.
      capturedFloatingRate:
        this._floatingRateService.currentRate()
    });
  }

  
  private resetForm(): void {
    this.swapForm.reset({
      direction: SwapDirectionEnum.PAY_FIXED,
      notional: null,
      currency: CurrencyEnum.EUR,
      startDate: '',
      endDate: '',
      fixedRate: null,
      floatingIndex: FloatingIndexEnum.ESTR
    });
  }

}
