using System.Collections.Generic;
using CellWorld.Models;

namespace CellWorld.Automaton
{
    public class StartConditions
    {
        public sbyte[][] Matrix { get; set; }
        public IEnumerable<RuleRequest> Rules { get; set; }
        public int Steps { get; set; }
    }
}
