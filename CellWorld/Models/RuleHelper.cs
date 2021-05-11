﻿using System;
using CellWorld.Margolus;
using CellWorld.Moore.Rules;

namespace CellWorld.Models
{
    internal static class RuleHelper
    {
        public static IMooreRule GetMooreRule(RuleRequest request)
        {
            return request.RuleType.ToLower() switch
            {
                "direct" => DirectRule.GetFromModel(request.RuleModel),
                "sum" => SumRule.GetFromModel(request.RuleModel),
                "complex" => ComplexRule.GetFromModel(request.RuleModel),
                _ => throw new ArgumentException($"Unknown rule type {request.RuleType}")
            };
        }

        public static BlockRule GetBlockRule(RuleRequest request)
        {
            return BlockRule.GetFromModel(request.RuleModel);
        }
    }
}
