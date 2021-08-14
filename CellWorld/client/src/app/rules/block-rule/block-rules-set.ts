import { ColorMap } from "./../../colors/color-map";
import { BlockRuleModel } from "./block-rule-model";
export class BlockRulesSet {
  public readonly isMoore = false;
  constructor(public Rules: BlockRuleModel[], public ColorMap: ColorMap) {}
}
