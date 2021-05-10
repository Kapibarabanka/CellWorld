using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CellWorld.Rule
{
    internal static class RuleHelper
    {
        public static IRule ConvertModel(RuleRequest request)
        {
            return request.RuleType.ToLower() switch
            {
                "direct" => DirectRule.GetFromModel(request.RuleModel),
                "sum" => SumRule.GetFromModel(request.RuleModel),
                "complex" => ComplexRule.GetFromModel(request.RuleModel),
                _ => throw new ArgumentException($"Unknown rule type {request.RuleType}")
            };
        }
    }
}
