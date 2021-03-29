using System.Collections.Generic;
using CellWorld.Neighborhood;
using CellWorld.Rule;

namespace CellWorld.Automaton
{
    public static class StaticData
    {
        public const int AreaSize = 9;

        public static ConditionArea AllNeighborsMustCount = new ConditionArea(new []
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

        public static List<IRule> rule126 = new List<IRule> {
            //                                                X  N  NE  E  SE   S  SW   W  NW
            new AndRule(new ConditionStateArea(new[] {0, 1, 1, -1, -1, -1, -1, -1, 1 }), CellState.Dead),
            new AndRule(new ConditionStateArea(new[] {0, 1, 0, -1, -1, -1, -1, -1, 1 }), CellState.Alive),
            new AndRule(new ConditionStateArea(new[] {0, 0, 1, -1, -1, -1, -1, -1, 1 }), CellState.Alive),
            new AndRule(new ConditionStateArea(new[] {0, 0, 0, -1, -1, -1, -1, -1, 1 }), CellState.Alive),
            new AndRule(new ConditionStateArea(new[] {0, 1, 1, -1, -1, -1, -1, -1, 0 }), CellState.Alive),
            new AndRule(new ConditionStateArea(new[] {0, 1, 0, -1, -1, -1, -1, -1, 0 }), CellState.Alive),
            new AndRule(new ConditionStateArea(new[] {0, 0, 1, -1, -1, -1, -1, -1, 0 }), CellState.Alive),
            new AndRule(new ConditionStateArea(new[] {0, 0, 0, -1, -1, -1, -1, -1, 0 }), CellState.Dead),

            new AndRule(new ConditionStateArea(new[] {1, -1, -1, -1, -1, -1, -1, -1, -1 }), CellState.Alive)
        };

        // public static List<IRule> ruleLife = new List<IRule> {
        //     new SumRule(AllNeighborsMustCount, 3, CellState.Alive),
        //     new SumRule(new ConditionArea(new [] ), 2, 1),
        // };
    }
}
