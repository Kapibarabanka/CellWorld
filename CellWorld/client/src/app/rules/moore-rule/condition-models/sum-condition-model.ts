export class SumConditionModel {
  public CellsToSum: Array<boolean>;
  public RequiredSum: number;

  constructor();
  constructor(cellsToSum: boolean[], requiredSum: number);
  constructor(cellsToSum?: boolean[], requiredSum?: number) {
    this.RequiredSum = requiredSum || 0;
    this.CellsToSum = cellsToSum || [];
    if (cellsToSum === undefined) {
      for (var i = 0; i < 9; i++) {
        this.CellsToSum.push(false);
      }
    }
  }


  public get(i: number, j: number): boolean {
    return this.CellsToSum[i * 3 + j];
  }

  public set(i: number, j: number, val: boolean) {
    this.CellsToSum[i * 3 + j] = val;
  }
}
