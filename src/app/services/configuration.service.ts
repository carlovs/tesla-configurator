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
import { CostSummary } from './cost-summary.models';

@Injectable()
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

  public hasTowHitch = signal<boolean>(false);
  public hasYoke = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  setModel(modelCode?: string | null) {
    if (modelCode === this._selectedModel()?.code) return;

    const model = this.carModels.find((m) => m.code === modelCode) || null;

    this._selectedModel.set(model);

    this._carColors.set(model?.colors!);

    this.setColor(model?.colors[0].code!);

    this._selectedCarConfiguration.set(null);
  }

  setColor(colorCode?: string | null) {
    if (this.carColors === null) return;

    const color = this.carColors()!.find((c) => c.code === colorCode) || null;

    this._selectedColor.set(color);

    this.loadAvailableOptions();
  }

  updateSelectedOptions(options: SelectedCarOptions[]) {}

  async loadModels() {
    if (this.carModels.length > 0) return;

    this.carModels = await firstValueFrom(this.http.get<CarModel[]>('/models'));
  }

  setConfiguration(configId: number) {
    if (configId === this._selectedCarConfiguration()?.id) return;

    const config = this._avaialableOptions()?.configs.find(
      (c) => c.id === configId
    );

    this._selectedCarConfiguration.set(config!);
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

  toggleTowHitch() {
    this.hasTowHitch.set(!this.hasTowHitch());
  }

  toggleYoke() {
    this.hasYoke.set(!this.hasYoke());
  }

  getCostSummary(): CostSummary {
    const costSummary = new CostSummary();

    costSummary.modelName = this.selectedModel()?.description || '';
    costSummary.configuration =
      this.selectedCarConfiguration()?.description || '';
    costSummary.configurationCost = this.selectedCarConfiguration()?.price || 0;
    costSummary.configurationDescription = `Range: ${
      this._selectedCarConfiguration()?.range
    } - Max Speed: ${this._selectedCarConfiguration()?.speed}`;
    costSummary.color = this.selectedColor()?.description || '';
    costSummary.colorCost = this.selectedColor()?.price || 0;

    costSummary.hasTowHitch = this.hasTowHitch();
    costSummary.hasYoke = this.hasYoke();

    costSummary.totalCost =
      costSummary.configurationCost + costSummary.colorCost;

    costSummary.totalCost += costSummary.hasTowHitch
      ? costSummary.towHitchCost
      : 0;
    costSummary.totalCost += costSummary.hasYoke ? costSummary.yokeCost : 0;

    return costSummary;
  }
}
