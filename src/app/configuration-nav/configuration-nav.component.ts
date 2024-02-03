import { Component, effect } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-configuration-nav',
  templateUrl: './configuration-nav.component.html',
  styleUrl: './configuration-nav.component.css',
  standalone: true,
  imports: [RouterModule],
})
export class ConfigurationNavComponent {
  protected hasSelectedModel = this.configService.hasSelectedModel;
  protected hasOptions = this.configService.hasSelectedConfiguration;
  protected selectedModel = this.configService.selectedModel;

  constructor(private configService: ConfigurationService) {

    console.log(configService.selectedModel()?.code);

    effect(() => {

      console.log("nav menu see a change");
    });

    
  }


  getCarCode():string{

    return this.configService.selectedModel()?.code || '';

  }
}
