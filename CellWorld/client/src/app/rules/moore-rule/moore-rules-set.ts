import { MooreRuleModel } from "./moore-rule-model";
import { ColorMap } from "./../../colors/color-map";
export class MooreRulesSet {
  public readonly isMoore = true;
  constructor(public Rules: MooreRuleModel[], public ColorMap: ColorMap) {}
}
