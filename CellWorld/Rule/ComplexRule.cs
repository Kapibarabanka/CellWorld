using System;
using CellWorld.Neighborhood;

namespace CellWorld.Rule
{
    public enum ComplexOperator
    {
        And,
        Or,
        Xor,
        Not
    }

    /// <summary>
    /// Combines two rules with logical operator and returns ResultState if applied.
    /// Result states of internal rules are ignored.
    /// If operator is NOT, returns NOT(RightRule).
    /// </summary>
    internal class ComplexRule : IRule
    {
        public IRule LeftRule { get; }
        public IRule RightRule { get; }
        public ComplexOperator Operator { get; }
        public sbyte Result { get; }

        public ComplexRule(IRule leftRule, IRule rightRule, ComplexOperator op, sbyte resultState)
        {
            LeftRule = leftRule;
            RightRule = rightRule;
            Operator = op;
            Result = resultState;
        }

        public sbyte? TryApply(CellStateArea cellNeighbors)
        {
            return Operator switch
            {
                ComplexOperator.Not when RightRule.TryApply(cellNeighbors) == null => Result,
                ComplexOperator.And when LeftRule.TryApply(cellNeighbors) != null &&
                                         RightRule.TryApply(cellNeighbors) != null => Result,
                ComplexOperator.Or when LeftRule.TryApply(cellNeighbors) != null ||
                                        RightRule.TryApply(cellNeighbors) != null => Result,
                ComplexOperator.Xor when LeftRule.TryApply(cellNeighbors) != null ^
                                         RightRule.TryApply(cellNeighbors) != null => Result,
                _ => null
            };
        }
    }
}
