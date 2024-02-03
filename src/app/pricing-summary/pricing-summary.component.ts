import { Component } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { CarDisplayComponent } from '../car-display/car-display.component';

@Component({
  selector: 'app-pricing-summary',
  templateUrl: './pricing-summary.component.html',
  styleUrl: './pricing-summary.component.css',
  standalone: true,
  imports: [CarDisplayComponent],
})
export class PricingSummaryComponent {
  protected options :string = '';// this.configService.options;
  protected selectedModel = this.configService.selectedModel;

  constructor(private configService: ConfigurationService) {}
}
