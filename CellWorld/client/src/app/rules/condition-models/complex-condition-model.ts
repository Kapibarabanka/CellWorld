import { ConditionModel } from './../condition-model';
export class ComplexConditionModel {
  constructor (
    public LeftCondition: ConditionModel,
    public RightCondition: ConditionModel,
    public Operator: string
    ){}
}