import { ComplexConditionModel } from "./../condition-models/complex-condition-model";
import { Component, Input } from "@angular/core";
import { ColorMap } from "src/app/colors/color-map";
import { ConditionModel } from "../condition-model";
import { DirectConditionModel } from "../condition-models/direct-condition-model";
import { SumConditionModel } from "../condition-models/sum-condition-model";

@Component({
  selector: "complex-condition",
  templateUrl: "./complex-condition.component.html",
  styleUrls: ["./complex-condition.component.css"],
})
export class ComplexConditionComponent {
  @Input() conditionModel: ComplexConditionModel;
  @Input() ColorMap: ColorMap;

  public Operators = ["AND", "OR", "XOR", "NOT"];

  public get left(): ConditionModel {
    return this.conditionModel.LeftCondition;
  }

  public get selectedOperator(): string {
    return this.conditionModel.Operator.toUpperCase();
  }

  public get right(): ConditionModel {
    return this.conditionModel.RightCondition;
  }

  public selectOperator(op: string) {
    this.conditionModel.Operator = op;
  }

  public addDirectRule(isLeft: boolean) {
    const defaultState = 0;
    const newCondition = new ConditionModel("direct", new DirectConditionModel(defaultState))
    if (isLeft) {
      this.conditionModel.LeftCondition = newCondition;
    } else {
      this.conditionModel.RightCondition = newCondition;
    }
  }

  public addSumRule(isLeft: boolean) {
    const newCondition = new ConditionModel("sum", new SumConditionModel())
    if (isLeft) {
      this.conditionModel.LeftCondition = newCondition;
    } else {
      this.conditionModel.RightCondition = newCondition;
    }
  }
}
