import { Routes } from '@angular/router';
import { CarSelectComponent } from './car-select/car-select.component';
import { OptionsSelectComponent } from './options-select/options-select.component';
import { PricingSummaryComponent } from './pricing-summary/pricing-summary.component';

export const routes: Routes = [
    { path: '', component: CarSelectComponent },
    { path: 'configuration/:carCode', component: OptionsSelectComponent },
    { path: 'summary', component: PricingSummaryComponent },
];
