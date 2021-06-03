import { ConditionModel } from './condition-model';
export class MooreRuleModel{
  constructor(
    public ConditionModel: ConditionModel,
    public Result: number
  ){}

  public isDirect(): boolean {
    return this.ConditionModel.isDirect();
  }

  public isSum(): boolean {
    return this.ConditionModel.isSum();
  }

  public isComplex(): boolean {
    return this.ConditionModel.isComplex();
  }
}