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
                "direct" => DirectCondition.GetFromModel(model.Condition),
                "sum" => SumCondition.GetFromModel(model.Condition),
                "complex" => ComplexCondition.GetFromModel(model.Condition),
                _ => throw new ArgumentException($"Unknown rule type {model.ConditionType}")
            };
        }
    }
}
