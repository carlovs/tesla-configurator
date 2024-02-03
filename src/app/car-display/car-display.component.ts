import { Component, Input } from '@angular/core';
import { CarModel } from '../models/car-model.models';

@Component({
  selector: 'app-car-display',
  templateUrl: './car-display.component.html',
  styleUrl: './car-display.component.css',
  standalone: true,
})
export class CarDisplayComponent {

  @Input('car-model') carModel: CarModel | null = null;



}
