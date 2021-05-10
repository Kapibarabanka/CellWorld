using System.Text.Json;
using CellWorld.Models;

namespace CellWorld.Moore.Rules
{
    /// <summary>
    /// Combines two rules with logical operator and returns ResultState if applied.
    /// Result states of internal rules are ignored.
    /// If operator is NOT, returns NOT(RightRule).
    /// </summary>
    internal class ComplexRule : IMooreRule
    {
        public IMooreRule LeftRule { get; }
        public IMooreRule RightRule { get; }
        public string Operator { get; }
        public sbyte Result { get; }

        public ComplexRule(IMooreRule leftRule, IMooreRule rightRule, string op, sbyte resultState)
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

        public static IMooreRule GetFromModel(object model)
        {
            var complexModel = JsonSerializer.Deserialize<ComplexRuleModel>(model.ToString());
            var rightRule = RuleHelper.GetMooreRule(complexModel.RightRule);
            var leftRule = RuleHelper.GetMooreRule(complexModel.LeftRule);
            return new ComplexRule(leftRule, rightRule, complexModel.Operator, complexModel.Result);
        }
    }
}
