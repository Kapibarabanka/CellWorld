using CellWorld.Automaton;
using CellWorld.Neighborhood;

namespace CellWorld.Rule
{
    /// <summary>
    /// When applied, this rule will sum cells from cell's neighborhood that are in same position as "true" in Condition.
    /// If this sum is equal to required, will return Result state to the cell.
    /// </summary>
    public class SumRule : IRule
    {
        public ConditionArea Condition { get; }
        public int RequiredSum { get; }

        public CellState Result;

        public SumRule(ConditionArea area, int requiredSum, CellState result)
        {
            Condition = area;
            RequiredSum = requiredSum;
            Result = result;
        }

        public bool TryApply(CellStateArea cellNeighbors, out CellState result)
        {
            result = CellState.Error;
            var sum = 0;
            for (var i = 0; i < StaticData.AreaSize; i++)
            {
                if (Condition[i])
                {
                    sum += (int)cellNeighbors[i];
                }
            }

            if (sum != RequiredSum) return false;

            result = Result;
            return true;
        }
    }
}
