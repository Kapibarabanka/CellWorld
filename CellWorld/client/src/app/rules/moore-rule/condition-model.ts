export class ConditionModel {
  constructor(
    public ConditionType: string,
    public Condition: any
  ){}

  public isDirect(): boolean {
    return this.ConditionType == "direct";
  }

  public isSum(): boolean {
    return this.ConditionType == "sum";
  }

  public isComplex(): boolean {
    return this.ConditionType == "complex";
  }
}