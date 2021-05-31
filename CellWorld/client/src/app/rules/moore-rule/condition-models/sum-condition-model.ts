export class SumConditionModel {
  constructor (
    public CellsToSum: Array<boolean>,
    public RequiredSum: number
    ){}

    public get(i: number, j: number): boolean {
      return this.CellsToSum[i * 3 + j];
    }
  
    public set(i: number, j: number, val: boolean) {
      this.CellsToSum[i * 3 + j] = val;
    }
}