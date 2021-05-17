import { BlockRuleModel } from '../rules/block-rule-model';
import { MooreRuleModel } from '../rules/moore-rule-model';
export class MooreStartConditions {
    constructor (
        public matrix: Array<Array<number>>,
        public rules: Array<MooreRuleModel>,
        public steps: number,
        public defaultValue: number
    ) {
    }
}

export class BlockStartConditions {
  constructor (
      public matrix: Array<Array<number>>,
      public rules: Array<BlockRuleModel>,
      public steps: number
  ) {
  }
}