import { RuleRequest } from './../rule-request';
export class ComplexRuleModel {
  constructor (
    public RightRule: RuleRequest,
    public LeftRule: RuleRequest,
    public Operator: string,
    public Result: number
    ){}
}