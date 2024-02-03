import { Component } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { CarDisplayComponent } from '../car-display/car-display.component';
import { CarColor, CarModel } from '../models/car-model.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-select',
  templateUrl: './car-select.component.html',
  styleUrl: './car-select.component.css',
  standalone: true,
  imports: [CarDisplayComponent, CommonModule, FormsModule],
})
export class CarSelectComponent {
  protected cars: CarModel[] = [];
  protected colors = this.configService.carColors;

  protected selectedModel = this.configService.selectedModel;
  protected selectedColor = this.configService.selectedColor;

  constructor(private configService: ConfigurationService) {}

  async ngOnInit() {
    await this.configService.loadModels();

    this.cars = this.configService.carModels;
  }

  modelSelected(event: Event) {
    let target = event.target as HTMLSelectElement;
    this.configService.setModel(target.value);
  }

  colorSelected(event: Event) {
    let target = event.target as HTMLSelectElement;
    this.configService.setColor(target.value);
  }

}
