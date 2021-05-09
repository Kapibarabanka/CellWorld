using CellWorld.Automaton;
using CellWorld.Neighborhood;

namespace CellWorld.Rule
{
    public class DirectRule : IRule
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

    }
}
