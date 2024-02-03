import { Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ConfigurationNavComponent } from './configuration-nav/configuration-nav.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ConfigurationService } from './services/configuration.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    HttpClientModule,
    RouterLink,
    RouterModule,
    ConfigurationNavComponent,
  ],
  providers: [ConfigurationService],
  template: `
    <app-configuration-nav></app-configuration-nav>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  name = 'Angular';

  constructor(private http: HttpClient) {
    this.loadModels();
  }

  async loadModels() {
    const models = await firstValueFrom(this.http.get('/models'));
  }
}
