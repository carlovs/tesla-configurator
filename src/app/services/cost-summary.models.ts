export class CostSummary {
  public modelName: string = '';
  public configuration: string = '';
  public configurationCost: number = 0;
  public configurationDescription: string = '';
  public color: string = '';
  public colorCost: number = 0;

  public hasTowHitch: boolean = false;
  public towHitchDescription: string = 'Tow Hitch Package';
  public towHitchCost: number = 1_000;
  public hasYoke: boolean = false;
  public yokeDescription: string = 'Yoke Steering Wheel';
  public yokeCost: number = 1_000;

  public totalCost: number = 0;
}
