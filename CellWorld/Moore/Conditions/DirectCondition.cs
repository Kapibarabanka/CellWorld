using System.Text.Json;
using CellWorld.Automaton;
using CellWorld.Models;

namespace CellWorld.Moore.Conditions
{
    internal class DirectCondition : IMooreCondition
    {
        public CellStateArea ConditionArea { get; }

        public DirectCondition(CellStateArea conditionArea)
        {
            ConditionArea = conditionArea;
        }

        public DirectCondition(object model)
        {
            var directModel = JsonSerializer.Deserialize<DirectConditionModel>(model.ToString());
            ConditionArea = new CellStateArea(directModel.Condition);
        }

        public bool IsApplicable(CellStateArea cellNeighbors)
        {
            for (var i = 0; i < StaticData.MoorAreaSize; i++)
            {
                if (cellNeighbors[i] != ConditionArea[i]
                    && ConditionArea[i] != StaticData.AnyState)
                    return false;
            }

            return true;
        }
    }
}
