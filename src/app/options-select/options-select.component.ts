import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CarDisplayComponent } from '../car-display/car-display.component';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from '../services/configuration.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-options-select',
  templateUrl: './options-select.component.html',
  styleUrl: './options-select.component.css',
  imports: [CarDisplayComponent, CommonModule, RouterModule, FormsModule],
  standalone: true,
})
export class OptionsSelectComponent {
  private modelCode: string | null = null;
  protected carModel = this.configService.selectedModel;
  protected availableOptions = this.configService.availableOptions;
  protected hasSelectedModel = this.configService.hasSelectedModel;
  protected selectedCarConfiguration = this.configService.selectedCarConfiguration;

  protected hasTowHitch = this.configService.hasTowHitch;
  protected hasYoke = this.configService.hasYoke;

  constructor(
    private configService: ConfigurationService,
    private route: ActivatedRoute) {}

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.modelCode = routeParams.get('carCode') || null;

    if( this.modelCode !== this.carModel()?.code){
      await this.configService.loadModels();
      this.configService.setModel(this.modelCode);
      this.configService.loadAvailableOptions();
    }

  }

  selectConfig(event: Event){
    let target = event.target as HTMLSelectElement;
    var configId = parseInt(target.value);
    this.configService.setConfiguration(configId);
  }

  toggleTowHitch(event: Event){
    this.configService.toggleTowHitch();
  }

  toggleYoke(event: Event){
    this.configService.toggleYoke();
  }

}
