import { ColorMap } from "./../../colors/color-map";
import { BlockRuleModel } from "./block-rule-model";
export class BlockRulesSet {
  constructor(public Rules: BlockRuleModel[], public ColorMap: ColorMap) {}
}
