import { DirectConditionModel } from './condition-models/direct-condition-model';
import { ConditionModel } from './condition-model';
export class MooreRuleModel{
  constructor(
    public ConditionModel: ConditionModel,
    public Result: number
  ){}

  public isDirect(): boolean {
    return this.ConditionModel.ConditionType == "direct";
  }

  public isSum(): boolean {
    return this.ConditionModel.ConditionType == "sum";
  }
}