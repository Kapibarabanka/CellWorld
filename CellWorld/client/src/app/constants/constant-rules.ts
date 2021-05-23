import { MooreRulesSet } from './../rules/moore-rule/moore-rules-set';
import { BlockRulesSet } from './../rules/block-rule/block-rules-set';
import { ConstantColorMaps } from './constant-color-maps';
import { BlockRuleModel } from '../rules/block-rule/block-rule-model';
import { ConditionModel } from '../rules/moore-rule/condition-model';
import { ComplexConditionModel } from '../rules/moore-rule/condition-models/complex-condition-model';
import { DirectConditionModel } from '../rules//moore-rule/condition-models/direct-condition-model';
import { SumConditionModel } from '../rules//moore-rule/condition-models/sum-condition-model';
import { MooreRuleModel } from '../rules//moore-rule/moore-rule-model';
import { ColorMap } from '../colors/color-map';

export class ConstantRules {
  private static Rule126 = [
    //                                                                        ne	n	  nw 	e	  x	   w	se	 s	sw
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([1,	1,	1,	-1,	0,	-1,	-1,	-1,	-1])), 0),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([1,	1,	0,	-1,	0,	-1,	-1,	-1,	-1])), 1),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([1,	0,	1,	-1,	0,	-1,	-1,	-1,	-1])), 1),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([1,	0,	0,	-1,	0,	-1,	-1,	-1,	-1])), 1),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([0,	1,	1,	-1,	0,	-1,	-1,	-1,	-1])), 1),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([0,	1,	0,	-1,	0,	-1,	-1,	-1,	-1])), 1),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([0,	0,	1,	-1,	0,	-1,	-1,	-1,	-1])), 1),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([0,	0,	0,	-1,	0,	-1,	-1,	-1,	-1])), 0),
    new MooreRuleModel(new ConditionModel("direct", new DirectConditionModel([-1,	-1,	-1,	-1, 1,	-1,	-1,	-1,	-1])), 1),
  ]

  private static AllNeighborsMustCount = [
    true,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true
  ]

  private static IfSum3TheAlive = new MooreRuleModel(new ConditionModel("sum", new SumConditionModel(ConstantRules.AllNeighborsMustCount, 3)), 1)
  private static Sum2 = new ConditionModel("sum", new SumConditionModel(ConstantRules.AllNeighborsMustCount, 2))
  private static XisAlive = new ConditionModel("direct", new DirectConditionModel([-1, -1, -1, -1, 1, -1, -1, -1, -1]))

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
  ]

  public static MooreRules: Map<string, MooreRulesSet> = new Map<string, MooreRulesSet>([
    ["life", new MooreRulesSet(ConstantRules.RuleLife, new ColorMap(ConstantColorMaps.OptionalWhiteBlack))],
    ["126",new MooreRulesSet(ConstantRules.Rule126, new ColorMap(ConstantColorMaps.OptionalWhiteBlack))]
  ])

  public static BlockRules: Map<string, BlockRulesSet> = new Map<string, BlockRulesSet>([
    ["hpp", new BlockRulesSet(ConstantRules.HppGasRule, new ColorMap(ConstantColorMaps.WhiteBlack))]
  ])
}