using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CellWorld.Neighborhood;
using CellWorld.Rule;

namespace CellWorld.Automaton
{
    internal class CaHelper
    {
        public static sbyte[][][] Simulate(Matrix start, List<IRule> rules, int steps)
        {
            var h = start.Height;
            var w = start.Width;
            var matrix = new List<Matrix> { start };
            for (var step = 0; step < steps; step++)
            {
                var prev = matrix[step];
                var next = new Matrix(h, w);
                var iRange = Enumerable.Range(0, h);
                var jRange = Enumerable.Range(0, w);
                var points = iRange.SelectMany(i => jRange.Select(j => (i, j)));
                Parallel.ForEach(points, point =>
                {
                    var (i, j) = point;
                    var neighbors = prev.Get2DNeighborhood(i, j);
                    next[i, j] = ApplyRules(neighbors, rules);
                });

                matrix.Add(next);
            }

            return matrix.Select(m => m.M).ToArray();
        }

        public static sbyte ApplyRules(CellStateArea neighbors, List<IRule> rules)
        {
            foreach (var rule in rules)
            {
                var ruleResult = rule.TryApply(neighbors);
                if (ruleResult != null)
                {
                    return ruleResult.Value;
                }
            }

            // TODO: add setting to switch behaviour if no rules were applied (cell doesn't change / cell dies)
            return 0;
        }

        public static void PrintSimulation(List<Matrix> simResult, int pause)
        {
            Console.SetWindowSize(Console.LargestWindowWidth, Console.LargestWindowHeight);
            foreach (var layer in simResult)
            {
                Thread.Sleep(pause);
                Console.SetCursorPosition(0, 0);
                PrintMatrix(layer);
            }
        }

        public static void PrintMatrix(Matrix m)
        {
            for (var i = 0; i < m.Height; i++)
            {
                for (var j = 0; j < m.Width; j++)
                {
                    var value = m[i, j];
                    Console.Write(value == 0 ? "  " : "**");
                }
                Console.WriteLine();
            }
        }
    }
}
