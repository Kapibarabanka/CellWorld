export class BlockRuleModel {
  public Phase: number;
  public FromBlock: number[];
  public ToBlock: number[];

  constructor();
  constructor(phase: number, fromBlock: Array<number>, toBlock: Array<number>);
  constructor(phase?: number, fromBlock?: Array<number>, toBlock?: Array<number>) {
    this.Phase = phase || 0;
    this.FromBlock = fromBlock || [0, 0, 0, 0];
    this.ToBlock = toBlock || [0, 0, 0, 0];
  }

  public getFrom(i: number, j: number): number {
    return this.FromBlock[i * 2 + j];
  }

  public getTo(i: number, j: number): number {
    return this.ToBlock[i * 2 + j];
  }

  public setFrom(i: number, j: number, val: number) {
    this.FromBlock[i * 2 + j] = val;
  }

  public setTo(i: number, j: number, val: number) {
    this.ToBlock[i * 2 + j] = val;
  }
}
