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

    public static Rule126 = [
      new RuleRequest("direct", new DirectRuleModel([0, 1, 1, -1, -1, -1, -1, -1, 1], 0)),
      new RuleRequest("direct", new DirectRuleModel([0, 1, 0, -1, -1, -1, -1, -1, 1], 1)),
      new RuleRequest("direct", new DirectRuleModel([0, 0, 1, -1, -1, -1, -1, -1, 1], 1)),
      new RuleRequest("direct", new DirectRuleModel([0, 0, 0, -1, -1, -1, -1, -1, 1], 1)),
      new RuleRequest("direct", new DirectRuleModel([0, 1, 1, -1, -1, -1, -1, -1, 0], 1)),
      new RuleRequest("direct", new DirectRuleModel([0, 1, 0, -1, -1, -1, -1, -1, 0], 1)),
      new RuleRequest("direct", new DirectRuleModel([0, 0, 1, -1, -1, -1, -1, -1, 0], 1)),
      new RuleRequest("direct", new DirectRuleModel([0, 0, 0, -1, -1, -1, -1, -1, 0], 0)),

      new RuleRequest("direct", new DirectRuleModel([1, -1, -1, -1, -1, -1, -1, -1, -1], 1)),
    ]

    private static AllNeighborsMustCount = [
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true
        ]

    private static Sum2 = new RuleRequest("sum", new SumRuleModel(StartConditions.AllNeighborsMustCount, 2, 1))
    private static Sum3 = new RuleRequest("sum", new SumRuleModel(StartConditions.AllNeighborsMustCount, 3, 1))
    private static XisAlive = new RuleRequest("direct", new DirectRuleModel([1, -1, -1, -1, -1, -1, -1, -1, -1], 1))

    public static RuleLife = [
      StartConditions.Sum3,
      new RuleRequest("complex",
       new ComplexRuleModel(StartConditions.XisAlive, StartConditions.Sum2, "and", 1))
    ]
}