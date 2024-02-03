import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDisplayComponent } from '../car-display/car-display.component';
import { CommonModule } from '@angular/common';
import { CarModel } from '../models/car-model.models';
import { CarOptions } from '../models/car-options.model';
import { ConfigurationService } from '../services/configuration.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-options-select',
  templateUrl: './options-select.component.html',
  styleUrl: './options-select.component.css',
  imports: [CarDisplayComponent, CommonModule],
  standalone: true,
})
export class OptionsSelectComponent {
  private modelCode: string | null = null;
  protected carModel: CarModel | null = null;
  protected availableOptions = this.configService.availableOptions;

  constructor(
    private configService: ConfigurationService,
    private route: ActivatedRoute) {}

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.modelCode = routeParams.get('modelCode') || null;


  }
}
