export class ColorMap {
  public statesToColors: Map<number, string>;
  public currentState: number;
  public get States(): number[] {
    return Array.from(this.statesToColors.keys()).sort();
  }
  public defaultStateColor = '#ccc';
  constructor();
  constructor(map: Map<number, string>)
  constructor(map?: Map<number, string>) {
    this.statesToColors = map || new Map<number, string>([
      [0, '#ffffff'],
      [1, '#000000']
    ]);
    if (this.States.length > 0) {
      this.currentState = this.States[0]
    } else {
      this.currentState = 0;
    }
  }

  public getColor(state: number): string {
    if (state === -1) {
      return this.defaultStateColor;
    }
    return this.statesToColors.get(state);
  }

  public toggleState() {
    const idx = this.States.indexOf(this.currentState);
    if (idx < this.States.length - 1) {
      this.currentState = this.States[idx + 1]
    } else {
      this.currentState = this.States[0]
    }
  }

  public addState() {
    const idx = this.States[this.statesToColors.size - 1] + 1;
    this.statesToColors.set(idx, this.defaultStateColor);
  }
}