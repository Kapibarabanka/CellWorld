import { BlockRuleModel } from './../rules/rule-models/block-rule-model';
import { ComplexRuleModel } from './../rules/rule-models/complex-rule-model';
import { DirectRuleModel } from './../rules/rule-models/direct-rule-model';
import { SumRuleModel } from './../rules/rule-models/sum-rule-model';
import { RuleRequest } from './../rules/rule-request';

export class ConstantRules {
  private static Rule126 = [
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

  private static Sum2 = new RuleRequest("sum", new SumRuleModel(ConstantRules.AllNeighborsMustCount, 2, 1))
  private static Sum3 = new RuleRequest("sum", new SumRuleModel(ConstantRules.AllNeighborsMustCount, 3, 1))
  private static XisAlive = new RuleRequest("direct", new DirectRuleModel([1, -1, -1, -1, -1, -1, -1, -1, -1], 1))

  private static RuleLife = [
    ConstantRules.Sum3,
    new RuleRequest("complex",
      new ComplexRuleModel(ConstantRules.XisAlive, ConstantRules.Sum2, "and", 1))
  ]

  private static HppGasRule = [
    new RuleRequest("block", new BlockRuleModel(-1, [0, 0, 0, 0], [0, 0, 0, 0])),

    new RuleRequest("block", new BlockRuleModel(-1, [1, 0, 0, 0], [0, 0, 1, 0])),
    new RuleRequest("block", new BlockRuleModel(-1, [0, 1, 0, 0], [0, 0, 0, 1])),
    new RuleRequest("block", new BlockRuleModel(-1, [0, 0, 1, 0], [1, 0, 0, 0])),
    new RuleRequest("block", new BlockRuleModel(-1, [0, 0, 0, 1], [0, 1, 0, 0])),

    new RuleRequest("block", new BlockRuleModel(-1, [1, 0, 1, 0], [0, 1, 0, 1])),
    new RuleRequest("block", new BlockRuleModel(-1, [0, 1, 0, 1], [1, 0, 1, 0])),

    new RuleRequest("block", new BlockRuleModel(-1, [1, 0, 0, 1], [0, 1, 1, 0])),
    new RuleRequest("block", new BlockRuleModel(-1, [1, 1, 0, 0], [0, 0, 1, 1])),
    new RuleRequest("block", new BlockRuleModel(-1, [0, 1, 1, 0], [1, 0, 0, 1])),
    new RuleRequest("block", new BlockRuleModel(-1, [0, 0, 1, 1], [1, 1, 0, 0])),

    new RuleRequest("block", new BlockRuleModel(-1, [1, 1, 0, 1], [0, 1, 1, 1])),
    new RuleRequest("block", new BlockRuleModel(-1, [1, 1, 1, 0], [1, 0, 1, 1])),
    new RuleRequest("block", new BlockRuleModel(-1, [0, 1, 1, 1], [1, 1, 0, 1])),
    new RuleRequest("block", new BlockRuleModel(-1, [1, 0, 1, 1], [1, 1, 1, 0])),

    new RuleRequest("block", new BlockRuleModel(-1, [1, 1, 1, 1], [1, 1, 1, 1]))
  ]

  public static Rules: Map<string, RuleRequest[]> = new Map<string, RuleRequest[]>([
    ["life", ConstantRules.RuleLife],
    ["126", ConstantRules.Rule126],
    ["hpp", ConstantRules.HppGasRule]
  ])
}