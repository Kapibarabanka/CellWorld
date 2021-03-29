using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CellWorld.Rule;

namespace CellWorld.Automaton
{
    public static class StaticData
    {
        public static List<IRule> rule126 = new List<IRule> {
            //               X  N  NE  E  SE   S  SW   W  NW
            new DirectRule(new[] {0, 1, 1, -1, -1, -1, -1, -1, 1 }, 0),
            new DirectRule(new[] {0, 1, 0, -1, -1, -1, -1, -1, 1 }, 1),
            new DirectRule(new[] {0, 0, 1, -1, -1, -1, -1, -1, 1 }, 1),
            new DirectRule(new[] {0, 0, 0, -1, -1, -1, -1, -1, 1 }, 1),
            new DirectRule(new[] {0, 1, 1, -1, -1, -1, -1, -1, 0 }, 1),
            new DirectRule(new[] {0, 1, 0, -1, -1, -1, -1, -1, 0 }, 1),
            new DirectRule(new[] {0, 0, 1, -1, -1, -1, -1, -1, 0 }, 1),
            new DirectRule(new[] {0, 0, 0, -1, -1, -1, -1, -1, 0 }, 0),

            new DirectRule(new[] {1, -1, -1, -1, -1, -1, -1, -1, -1 }, 1)
        };

        public static List<IRule> ruleLife = new List<IRule> {
            new SumRule(3, -1, 1),
            new SumRule(2, 1, 1),
        };
    }
}
