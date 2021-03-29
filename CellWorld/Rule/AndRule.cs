using CellWorld.Automaton;
using CellWorld.Neighborhood;

namespace CellWorld.Rule
{
    public class AndRule : IRule
    {
        public ConditionStateArea Area { get; }
        public CellState Result { get; }

        public AndRule(ConditionStateArea area, CellState result)
        {
            Area = area;
            Result = result;
        }

        public bool TryApply(CellStateArea cellNeighbors, out CellState result)
        {
            result = CellState.Error;

            for (var i = 0; i < StaticData.AreaSize; i++)
            {
                if ((int) cellNeighbors[i] != (int) Area[i]
                    && Area[i] != ConditionState.Any)
                    return false;
            }

            result = Result;
            return true;
        }
    }
}
