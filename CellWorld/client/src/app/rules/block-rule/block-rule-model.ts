export class BlockRuleModel {
  constructor (
    public Phase: number,
    public FromBlock: Array<number>,
    public ToBlock: Array<number>
    ){}

    public getFrom(i: number, j: number): number {
      return this.FromBlock[i*2 + j]
    }

    public getTo(i: number, j: number): number {
      return this.ToBlock[i*2 + j]
    }

    public setFrom(i: number, j: number, val: number) {
      this.FromBlock[i*2 + j] = val;
    }

    public setTo(i: number, j: number, val: number) {
      this.ToBlock[i*2 + j] = val;
    }
}