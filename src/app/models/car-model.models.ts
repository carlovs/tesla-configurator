export class CarModel{
    public code: string = '';
    public description: string = '';
    public colors: CarColor[] = [];
}

export class CarColor{
    public code: string = '';
    public description: string = '';
    public price: number = 0;
}