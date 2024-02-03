export class CarOptions {
  public code: string = '';
  public configs: CarOptionConfig[] = [];
  public towHitch: boolean = false;
  public yoke: boolean = false;
}

export class CarOptionConfig {
  public id: number = 0;
  public description: string = '';
  public range: number = 0;
  public speed: number = 0;
  public price: number = 0;
}

export class SelectedCarOptions {
  public description: string = '';
  public price: number = 0;
}
