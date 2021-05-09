using System.Collections.Generic;
using System.Linq;
using CellWorld.Automaton;

namespace CellWorld.Neighborhood
{
    /// <summary>
    /// Represents neighborhood with its states.
    /// When used as condition for rule, state -1 equals 'any' (<see cref="StaticData.AnyState"/>).
    /// </summary>
    public class CellStateArea : Area<sbyte>
    {
        public CellStateArea(IEnumerable<sbyte> neighbors) : base(neighbors.ToArray())
        {
        }
    }
}
