import { BlockRuleModel } from '../rules/block-rule/block-rule-model';
import { MooreRuleModel } from '../rules/moore-rule/moore-rule-model';
export class MooreStartConditions {
    constructor (
        public matrix: Array<Array<number>>,
        public ruleSet: Array<MooreRuleModel>,
        public steps: number,
        public defaultValue: number
    ) {
    }
}

export class BlockStartConditions {
  constructor (
      public matrix: Array<Array<number>>,
      public ruleSet: Array<BlockRuleModel>,
      public steps: number
  ) {
  }
}