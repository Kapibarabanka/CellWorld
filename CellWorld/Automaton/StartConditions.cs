using System;
using System.Collections.Generic;
using CellWorld.Rule;

namespace CellWorld.Automaton
{
    public class StartConditions
    {
        public sbyte[][] Matrix { get; set; }
        public IEnumerable<RuleRequest> Rules { get; set; }
        public int Steps { get; set; }
    }
}
