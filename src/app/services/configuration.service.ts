import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CarModel } from '../models/car-model.models';
import {
  CarOptionConfig,
  CarOptions,
  SelectedCarOptions,
} from '../models/car-options.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private _selectedModel = signal<CarModel | null>(null);
  public selectedModel = this._selectedModel.asReadonly();
  public hasSelectedModel = computed<boolean>(
    () => this._selectedModel() !== null
  );
  private _selectedCarConfiguration = signal<CarOptionConfig | null>(null);
  public hasSelectedConfiguration = computed<boolean>(
    () => this._selectedCarConfiguration() !== null
  );
  public selectedCarConfiguration = this._selectedCarConfiguration.asReadonly();

  private _selectedOptions = signal<[string, { price: number }] | null>(null);

  private carModels: CarModel[] = [];

  private _avaialableOptions = signal<CarOptions | null>(null);
  public availableOptions = this._avaialableOptions.asReadonly();
  
  constructor(private http: HttpClient) {}

  setModel(model: CarModel) {
    if (model == this._selectedModel()) return;

    this._selectedModel.set(model);
    this._selectedOptions.set(null);
  }

  updateSelectedOptions(options: SelectedCarOptions[]) {}

  async getModels(): Promise<CarModel[]> {
    if (this.carModels.length > 0) {
      return this.carModels;
    }

    this.carModels = await firstValueFrom(this.http.get<CarModel[]>('/models'));

    return this.carModels;
  }

  async loadAvailableOptions() {
    if (!this._selectedModel || this.selectedModel()?.code.length === 0) {
      this._avaialableOptions.set(null);
      return;
    }

    const endpoint = '/options/' + this._selectedModel()!.code;
    const options = await firstValueFrom(this.http.get<CarOptions>(endpoint));
    this._avaialableOptions.set(options);
  }
}
