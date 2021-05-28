using System;
using CellWorld.Moore;
using CellWorld.Moore.Conditions;

namespace CellWorld.Models
{
    internal static class RuleHelper
    {
        public static MooreRule GetMooreRule(MooreRuleModel model)
        {
            var condition = GetCondition(model.ConditionModel);
            return new MooreRule(condition, model.Result);
        }

        public static IMooreCondition GetCondition(ConditionModel model)
        {
            return model.ConditionType.ToLower() switch
            {
                "direct" => new DirectCondition(model.Condition),
                "sum" => new SumCondition(model.Condition),
                "complex" => new ComplexCondition(model.Condition),
                _ => throw new ArgumentException($"Unknown rule type {model.ConditionType}")
            };
        }
    }
}
