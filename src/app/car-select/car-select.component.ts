import { Component } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { CarDisplayComponent } from '../car-display/car-display.component';

@Component({
  selector: 'app-car-select',
  templateUrl: './car-select.component.html',
  styleUrl: './car-select.component.css',
  standalone: true,
  imports:[CarDisplayComponent]
})
export class CarSelectComponent {

  protected cars: string[] = [];
  protected colors: string[] = [];


  protected selectedModel = this.configService.selectedModel;

  constructor(private configService: ConfigurationService) {
    configService.getModels();
  }


  onNgInit() {
    this.cars = ["Model 3", "Model Y", "Cybertruck"];
    this.loadColorsForCar(this.cars[0]);
  }

  loadColorsForCar(carName: string) {
    this.colors = ["Blue", "Red", "Black", "Silver"];
  }

}
