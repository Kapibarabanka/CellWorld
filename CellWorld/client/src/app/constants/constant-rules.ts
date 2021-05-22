import { BlockRuleModel } from '../rules/block-rule/block-rule-model';
import { ConditionModel } from '../rules/moore-rule/condition-model';
import { ComplexConditionModel } from '../rules/moore-rule/condition-models/complex-condition-model';
import { DirectConditionModel } from '../rules//moore-rule/condition-models/direct-condition-model';
import { SumConditionModel } from '../rules//moore-rule/condition-models/sum-condition-model';
import { MooreRuleModel } from '../rules//moore-rule/moore-rule-model';

export class ConstantRules {
  private static Rule126 = [
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([0, 1, 1, -1, -1, -1, -1, -1, 1])), 0),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([0, 1, 0, -1, -1, -1, -1, -1, 1])), 1),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([0, 0, 1, -1, -1, -1, -1, -1, 1])), 1),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([0, 0, 0, -1, -1, -1, -1, -1, 1])), 1),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([0, 1, 1, -1, -1, -1, -1, -1, 0])), 1),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([0, 1, 0, -1, -1, -1, -1, -1, 0])), 1),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([0, 0, 1, -1, -1, -1, -1, -1, 0])), 1),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([0, 0, 0, -1, -1, -1, -1, -1, 0])), 0),

    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([1, -1, -1, -1, -1, -1, -1, -1, -1])), 1),
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

  private static IfSum3TheAlive = new MooreRuleModel(new ConditionModel("sum", new SumConditionModel(ConstantRules.AllNeighborsMustCount, 3)), 1)
  private static Sum2 = new ConditionModel("sum", new SumConditionModel(ConstantRules.AllNeighborsMustCount, 2))
  private static XisAlive = new ConditionModel("direct", new DirectConditionModel([1, -1, -1, -1, -1, -1, -1, -1, -1]))

  private static RuleLife = [
    ConstantRules.IfSum3TheAlive,
    new MooreRuleModel(new ConditionModel("complex",
      new ComplexConditionModel(ConstantRules.XisAlive, ConstantRules.Sum2, "and")), 1)
  ]

  private static HppGasRule = [
    new BlockRuleModel(-1, [0, 0, 0, 0], [0, 0, 0, 0]),

    new BlockRuleModel(-1, [1, 0, 0, 0], [0, 0, 0, 1]),
    new BlockRuleModel(-1, [0, 1, 0, 0], [0, 0, 1, 0]),
    new BlockRuleModel(-1, [0, 0, 1, 0], [0, 1, 0, 0]),
    new BlockRuleModel(-1, [0, 0, 0, 1], [1, 0, 0, 0]),

    new BlockRuleModel(-1, [1, 0, 1, 0], [0, 1, 0, 1]),
    new BlockRuleModel(-1, [0, 1, 0, 1], [1, 0, 1, 0]),

    new BlockRuleModel(-1, [1, 0, 0, 1], [0, 1, 1, 0]),
    new BlockRuleModel(-1, [1, 1, 0, 0], [0, 0, 1, 1]),
    new BlockRuleModel(-1, [0, 1, 1, 0], [1, 0, 0, 1]),
    new BlockRuleModel(-1, [0, 0, 1, 1], [1, 1, 0, 0]),

    new BlockRuleModel(-1, [1, 1, 0, 1], [1, 0, 1, 1]),
    new BlockRuleModel(-1, [1, 1, 1, 0], [0, 1, 1, 1]),
    new BlockRuleModel(-1, [0, 1, 1, 1], [1, 1, 1, 0]),
    new BlockRuleModel(-1, [1, 0, 1, 1], [1, 1, 0, 1]),

    new BlockRuleModel(-1, [1, 1, 1, 1], [1, 1, 1, 1])
    //new BlockRuleModel(-1, [1, 1, 1, 1], [0, 0, 0, 0])
  ]

  public static MooreRules: Map<string, MooreRuleModel[]> = new Map<string, MooreRuleModel[]>([
    ["life", ConstantRules.RuleLife],
    ["126", ConstantRules.Rule126]
  ])

  public static BlockRules: Map<string, BlockRuleModel[]> = new Map<string, BlockRuleModel[]>([
    ["hpp", ConstantRules.HppGasRule]
  ])
}