import { Component } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-display',
  templateUrl: './car-display.component.html',
  styleUrl: './car-display.component.css',
  standalone: true,
  imports:[CommonModule]
  
})
export class CarDisplayComponent {
  protected selectedColor = this.configService.selectedColor;
  protected selectedModel = this.configService.selectedModel;
  protected hasSelectedModel = this.configService.hasSelectedModel;

  constructor(private configService: ConfigurationService) {

    // this.selectedColor = this.configService.selectedColor;
    // this.selectedModel = this.configService.selectedModel;
    // this.hasSelectedModel = this.configService.hasSelectedModel;
  }
}
