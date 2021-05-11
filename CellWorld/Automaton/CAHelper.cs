using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CellWorld.Margolus;
using CellWorld.Moore;
using CellWorld.Moore.Rules;

namespace CellWorld.Automaton
{
    internal class CaHelper
    {
        public static sbyte[][][] SimulateMoore(Matrix start, IEnumerable<IMooreRule> rules, int steps)
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
                    var neighbors = prev.GetMooreNeighborhood(i, j);
                    next[i, j] = ApplyMooreRules(neighbors, rules);
                });

                matrix.Add(next);
            }

            return matrix.Select(m => m.M).ToArray();
        }

        public static sbyte[][][] SimulateBlock(Matrix start, IEnumerable<BlockRule> rules, int steps)
        {
            var h = start.Height;
            var w = start.Width;
            var matrix = new List<Matrix> { start };
            for (var step = 0; step < steps; step++)
            {
                var prev = matrix[step];
                var next = new Matrix(h, w);
                var phase = step % 2;
                var iRange = Enumerable.Range(0, h).Where(i => i % 2 == phase);
                var jRange = Enumerable.Range(0, w).Where(j => j % 2 == phase);
                var blocksCorners = iRange.SelectMany(i => jRange.Select(j => (i, j)));
                Parallel.ForEach(blocksCorners, blockCorner =>
                {
                    var prevBlock = prev.GetMargolusBlock(blockCorner);
                    var resultBlock = prevBlock;
                    foreach (var blockRule in rules.Where(r => r.Phase == phase || r.Phase == -1))
                    {
                        if (blockRule.From.Equals(prevBlock))
                        {
                            resultBlock = blockRule.To;
                            break;
                        }
                    }
                    next.UpdateMargolusBlock(blockCorner, resultBlock);
                });

                matrix.Add(next);
            }

            return matrix.Select(m => m.M).ToArray();
        }

        private static sbyte ApplyMooreRules(CellStateArea neighbors, IEnumerable<IMooreRule> rules)
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
