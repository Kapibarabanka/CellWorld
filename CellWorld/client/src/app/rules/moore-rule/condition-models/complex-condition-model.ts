import { ConditionModel } from "./../condition-model";
export class ComplexConditionModel {
  public LeftCondition: ConditionModel;
  public RightCondition: ConditionModel;
  public Operator: string;
  constructor();
  constructor(
    leftCondition: ConditionModel,
    rightCondition: ConditionModel,
    operator: string
  );
  constructor(
    leftCondition?: ConditionModel,
    rightCondition?: ConditionModel,
    operator?: string
  ) {
    this.LeftCondition = leftCondition || null;
    this.RightCondition = rightCondition || null;
    this.Operator = operator || "and";
  }
}
