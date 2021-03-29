using CellWorld.Neighborhood;

namespace CellWorld.Rule
{
    public interface IRule
    {
        public bool TryApply(CellStateArea cellNeighbors, out CellState result);
    }
}