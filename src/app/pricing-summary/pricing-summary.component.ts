import { Component } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { CarDisplayComponent } from '../car-display/car-display.component';
import { CostSummary } from '../models/cost-summary.models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pricing-summary',
  templateUrl: './pricing-summary.component.html',
  styleUrl: './pricing-summary.component.css',
  standalone: true,
  imports: [CarDisplayComponent, CommonModule, RouterModule],
})
export class PricingSummaryComponent {
  protected costSummary: CostSummary = new CostSummary();
  protected hasConfiguration = this.configService.hasSelectedConfiguration;

  constructor(private configService: ConfigurationService) {}

  ngOnInit() {
    this.costSummary = this.configService.getCostSummary();
  }
}
