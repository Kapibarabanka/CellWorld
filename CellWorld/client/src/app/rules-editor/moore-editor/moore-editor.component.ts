import { ComplexConditionModel } from "./../../rules/moore-rule/condition-models/complex-condition-model";
import { DirectConditionModel } from "./../../rules/moore-rule/condition-models/direct-condition-model";
import { MooreRuleModel } from "./../../rules/moore-rule/moore-rule-model";
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { MooreRulesSet } from "src/app/rules/moore-rule/moore-rules-set";
import { ColorMap } from "src/app/colors/color-map";
import { ConditionModel } from "src/app/rules/moore-rule/condition-model";
import { SumConditionModel } from "src/app/rules/moore-rule/condition-models/sum-condition-model";

@Component({
  selector: "moore-editor",
  templateUrl: "./moore-editor.component.html",
  styleUrls: ["./moore-editor.component.css"],
})
export class MooreEditorComponent implements OnInit, OnChanges {
  @Input() RulesSet: MooreRulesSet;

  public get ColorMap(): ColorMap {
    return this.RulesSet.ColorMap;
  }
  public get RuleModels(): MooreRuleModel[] {
    return this.RulesSet.Rules;
  }

  constructor() {}
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  public updateRule(idx: number, rule: MooreRuleModel) {
    this.RuleModels[idx] = rule;
  }

  public deleteRule(idx: number) {
    this.RuleModels.splice(idx, 1);
  }

  public getColor(state: number) {
    return this.ColorMap.getColor(state);
  }

  public changeResultState(idx: number) {
    this.RuleModels[idx].Result = this.ColorMap.currentState;
  }

  public addDirectRule() {
    const defaultState = 0;
    this.RuleModels.push(
      new MooreRuleModel(
        new ConditionModel("direct", new DirectConditionModel(defaultState)),
        defaultState
      )
    );
  }

  public addSumRule() {
    const defaultState = 0;
    this.RuleModels.push(
      new MooreRuleModel(
        new ConditionModel("sum", new SumConditionModel()),
        defaultState
      )
    );
  }

  public addComplexRule() {
    const defaultState = 0;
    this.RuleModels.push(
      new MooreRuleModel(
        new ConditionModel("complex", new ComplexConditionModel()),
        defaultState
      )
    );
  }
}
