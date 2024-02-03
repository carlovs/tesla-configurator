import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CarColor, CarModel } from '../models/car-model.models';
import {
  CarOptionConfig,
  CarOptions,
  SelectedCarOptions,
} from '../models/car-options.model';
import { FormRecord } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private _selectedModel = signal<CarModel | null>(null);
  public selectedModel = this._selectedModel.asReadonly();
  public hasSelectedModel = computed<boolean>(
    () => this._selectedModel() !== null && this._selectedColor() !== null
  );

  private _selectedColor = signal<CarColor | null>(null);
  public selectedColor = this._selectedColor.asReadonly();

  private _selectedCarConfiguration = signal<CarOptionConfig | null>(null);
  public hasSelectedConfiguration = computed<boolean>(
    () => this._selectedCarConfiguration() !== null
  );
  public selectedCarConfiguration = this._selectedCarConfiguration.asReadonly();

  private _selectedOptions = signal<[string, { price: number }] | null>(null);

  public carModels: CarModel[] = [];
  private _carColors = signal<CarColor[] | null>(null);
  public carColors = this._carColors.asReadonly();

  private _avaialableOptions = signal<CarOptions | null>(null);
  public availableOptions = this._avaialableOptions.asReadonly();

  constructor(private http: HttpClient) {}

  setModel(modelCode: string) {
    if (modelCode === this._selectedModel()?.code) return;

    const model = this.carModels.find((m) => m.code === modelCode) || null;

    this._selectedModel.set(model);

    this._carColors.set(model?.colors!);

    if (model?.colors.length !== 0) {
      this._selectedColor.set(model?.colors[0]!);
    } else {
      this._selectedColor.set(null);
    }

    this._selectedOptions.set(null);
  }

  setColor(colorCode: string) {
    if (colorCode === this._selectedColor()?.code) return;

    if (this.carColors === null) return;

    const color = this.carColors()!.find((c) => c.code === colorCode) || null;

    this._selectedColor.set(color);
  }

  updateSelectedOptions(options: SelectedCarOptions[]) {}

  async loadModels() {
    if (this.carModels.length > 0) return;

    this.carModels = await firstValueFrom(this.http.get<CarModel[]>('/models'));
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
