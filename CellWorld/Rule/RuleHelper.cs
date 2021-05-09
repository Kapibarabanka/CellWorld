using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CellWorld.Rule
{
    internal static class RuleHelper
    {
        public static IRule ConvertModel(string ruleType, object model)
        {
            return ruleType.ToLower() switch
            {
                "direct" => DirectRule.GetFromModel(model),
                "sum" => SumRule.GetFromModel(model),
                "complex" => ComplexRule.GetFromModel(model),
                _ => throw new ArgumentException($"Unknown rule type {ruleType}")
            };
        }
    }
}
