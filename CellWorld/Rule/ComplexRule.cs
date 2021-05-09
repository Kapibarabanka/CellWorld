using System;
using System.Text.Json;
using CellWorld.Neighborhood;
using CellWorld.Rule.RuleModels;

namespace CellWorld.Rule
{
    /// <summary>
    /// Combines two rules with logical operator and returns ResultState if applied.
    /// Result states of internal rules are ignored.
    /// If operator is NOT, returns NOT(RightRule).
    /// </summary>
    internal class ComplexRule : IRule
    {
        public IRule LeftRule { get; }
        public IRule RightRule { get; }
        public string Operator { get; }
        public sbyte Result { get; }

        public ComplexRule(IRule leftRule, IRule rightRule, string op, sbyte resultState)
        {
            LeftRule = leftRule;
            RightRule = rightRule;
            Operator = op.ToLower();
            Result = resultState;
        }

        public sbyte? TryApply(CellStateArea cellNeighbors)
        {
            return Operator switch
            {
                "not" when RightRule.TryApply(cellNeighbors) == null => Result,
                "and" when LeftRule.TryApply(cellNeighbors) != null &&
                                         RightRule.TryApply(cellNeighbors) != null => Result,
                "or" when LeftRule.TryApply(cellNeighbors) != null ||
                                        RightRule.TryApply(cellNeighbors) != null => Result,
                "xor" when LeftRule.TryApply(cellNeighbors) != null ^
                                         RightRule.TryApply(cellNeighbors) != null => Result,
                _ => null
            };
        }

        public static IRule GetFromModel(object model)
        {
            var complexModel = JsonSerializer.Deserialize<ComplexRuleModel>(model.ToString());
            var rightRule = RuleHelper.ConvertModel(complexModel.RightRuleName, complexModel.RightRuleModel);
            var leftRule = RuleHelper.ConvertModel(complexModel.LeftRuleName, complexModel.LeftRuleModel);
            return new ComplexRule(leftRule, rightRule, complexModel.Operator, complexModel.Result);
        }
    }
}
