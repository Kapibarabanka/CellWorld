export class DirectConditionModel {
  public Condition: number[];

  constructor(condition: number[]);
  constructor(defaultState: number);
  constructor(conditionOrDefaultState: number[] | number) {
    if (typeof conditionOrDefaultState === "number") {
      this.Condition = []
      for (var i = 0; i < 9; i++) {
        this.Condition.push(conditionOrDefaultState);
      }
    } else {
      this.Condition = conditionOrDefaultState;
    }
  }

  public get(i: number, j: number): number {
    return this.Condition[i * 3 + j];
  }

  public set(i: number, j: number, val: number) {
    this.Condition[i * 3 + j] = val;
  }
}
