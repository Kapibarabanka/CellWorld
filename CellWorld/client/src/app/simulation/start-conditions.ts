import { ComplexRuleModel } from './../rules/rule-models/complex-rule-model';
import { SumRuleModel } from './../rules/rule-models/sum-rule-model';
import { RuleRequest } from './../rules/rule-request';
import { DirectRuleModel } from './../rules/rule-models/direct-rule-model';
export class StartConditions {
    constructor (
        public matrix: Array<Array<number>>,
        public rules: Array<RuleRequest>,
        public steps: number
    ) {
    }
}