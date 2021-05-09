using System.Text.Json;
using CellWorld.Automaton;
using CellWorld.Neighborhood;
using CellWorld.Rule.RuleModels;

namespace CellWorld.Rule
{
    internal class DirectRule : IRule
    {
        public CellStateArea ConditionArea { get; }
        public sbyte Result { get; }

        public DirectRule(CellStateArea conditionArea, sbyte result)
        {
            ConditionArea = conditionArea;
            Result = result;
        }

        public sbyte? TryApply(CellStateArea cellNeighbors)
        {
            for (var i = 0; i < StaticData.AreaSize; i++)
            {
                if (cellNeighbors[i] != ConditionArea[i]
                    && ConditionArea[i] != StaticData.AnyState)
                    return null;
            }

            return Result;
        }

        public static IRule GetFromModel(object model)
        {
            var directModel = JsonSerializer.Deserialize<DirectRuleModel>(model.ToString());
            return new DirectRule(new CellStateArea(directModel.Condition), directModel.Result);
        }

    }
}
