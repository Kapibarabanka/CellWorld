using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace CellWorld.Automaton
{
    public class StartConditions
    {
        public sbyte[][] Matrix { get; set; }
        public string Rule { get; set; }
        public int Steps { get; set; }
        public object Test { get; set; }
    }
}
