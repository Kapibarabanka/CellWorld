export class BlockRuleModel {
  constructor (
    public Phase: number,
    public FromBlock: Array<number>,
    public ToBlock: Array<number>
    ){}
}