using System.Text.Json;
using CellWorld.Automaton;
using CellWorld.Models;

namespace CellWorld.Moore.Rules
{
    internal class DirectRule : IMooreRule
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
            for (var i = 0; i < StaticData.MoorAreaSize; i++)
            {
                if (cellNeighbors[i] != ConditionArea[i]
                    && ConditionArea[i] != StaticData.AnyState)
                    return null;
            }

            return Result;
        }

        public static IMooreRule GetFromModel(object model)
        {
            var directModel = JsonSerializer.Deserialize<DirectRuleModel>(model.ToString());
            return new DirectRule(new CellStateArea(directModel.Condition), directModel.Result);
        }

    }
}
