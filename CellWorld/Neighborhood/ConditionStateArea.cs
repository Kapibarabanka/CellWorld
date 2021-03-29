using System.Collections.Generic;
using System.Linq;

namespace CellWorld.Neighborhood
{
    public enum ConditionState
    {
        Any = -1,
        Dead = 0,
        Alive = 1
    }
    public class ConditionStateArea : Area<ConditionState>
    {
        public ConditionStateArea(ConditionState[] neighbors) : base(neighbors)
        {
        }

        public ConditionStateArea(IEnumerable<int> neighbors) : base(neighbors.Select(c => (ConditionState)c).ToArray())
        {
        }
    }
}
