using System.Collections.Generic;
using System.Linq;

namespace CellWorld.Neighborhood
{
    public enum CellState
    {
        Dead = 0,
        Alive = 1,
        Error = 42
    }

    public class CellStateArea : Area<CellState>
    {
        public CellStateArea(CellState[] neighbors) : base(neighbors)
        {
        }

        public CellStateArea(IEnumerable<int> neighbors) : base(neighbors.Select(c => (CellState)c).ToArray())
        {
        }
    }
}
