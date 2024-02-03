import { Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ConfigurationNavComponent } from './configuration-nav/configuration-nav.component';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    HttpClientModule,
    ConfigurationNavComponent,
    RouterLink,
    RouterModule,
  ],
  template: `
    <app-configuration-nav></app-configuration-nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  name = 'Angular';

  constructor(private http: HttpClient) {
    this.loadModels();

    console.log('Hello from AppComponent');
  }

  async loadModels() {
    const models = await firstValueFrom(this.http.get('/models'));
    console.log(models);
  }
}
