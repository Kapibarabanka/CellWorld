import { RuleRequest } from './../rules/rule-request';
export class StartConditions {
    constructor (
        public matrix: Array<Array<number>>,
        public rules: Array<RuleRequest>,
        public steps: number
    ) {
    }
}