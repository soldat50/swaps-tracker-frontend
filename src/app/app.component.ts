import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { FloatingRateCardComponent } from './features/swaps/components/floating-rate-card/floating-rate-card.component';
import { SwapFormComponent } from './features/swaps/components/swap-form/swap-form.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FloatingRateCardComponent,
    SwapFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
