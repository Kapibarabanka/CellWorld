using System;
using System.Collections.Generic;
using CellWorld.Neighborhood;
using CellWorld.Rule;

namespace CellWorld.Automaton
{
    internal static class StaticData
    {
        public const int AreaSize = 9;
        public const sbyte AnyState = -1;

        public static BoolArea AllNeighborsMustCount = new BoolArea(new []
        {
            false,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        });

        public static List<IRule> Rule126 = new List<IRule> {
            //                                                     X  N  NE  E  SE   S  SW   W  NW
            new DirectRule(new CellStateArea(new sbyte[] {0, 1, 1, -1, -1, -1, -1, -1, 1 }), 0),
            new DirectRule(new CellStateArea(new sbyte[] {0, 1, 0, -1, -1, -1, -1, -1, 1 }), 1),
            new DirectRule(new CellStateArea(new sbyte[] {0, 0, 1, -1, -1, -1, -1, -1, 1 }), 1),
            new DirectRule(new CellStateArea(new sbyte[] {0, 0, 0, -1, -1, -1, -1, -1, 1 }), 1),
            new DirectRule(new CellStateArea(new sbyte[] {0, 1, 1, -1, -1, -1, -1, -1, 0 }), 1),
            new DirectRule(new CellStateArea(new sbyte[] {0, 1, 0, -1, -1, -1, -1, -1, 0 }), 1),
            new DirectRule(new CellStateArea(new sbyte[] {0, 0, 1, -1, -1, -1, -1, -1, 0 }), 1),
            new DirectRule(new CellStateArea(new sbyte[] {0, 0, 0, -1, -1, -1, -1, -1, 0 }), 0),

            new DirectRule(new CellStateArea(new sbyte[] {1, -1, -1, -1, -1, -1, -1, -1, -1 }), 1)
        };

        public static SumRule Sum3 = new SumRule(AllNeighborsMustCount, 3, 1);
        public static SumRule Sum2 = new SumRule(AllNeighborsMustCount, 2, 1);

        public static DirectRule XisAlive = new DirectRule(
            new CellStateArea(new sbyte[] { 1, -1, -1, -1, -1, -1, -1, -1, -1 }), 1);

        public static List<IRule> Life = new List<IRule>
        {
            Sum3,
            new ComplexRule(XisAlive, Sum2, ComplexOperator.And, 1)
        };
    }
}
