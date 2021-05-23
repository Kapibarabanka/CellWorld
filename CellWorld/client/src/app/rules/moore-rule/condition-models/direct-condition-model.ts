export class DirectConditionModel {
  constructor (
    public Condition: Array<number>
    ){}

    public get(i: number, j: number): number {
      return this.Condition[i * 3 + j];
    }
  
    public set(i: number, j: number, val: number) {
      this.Condition[i * 3 + j] = val;
    }
}