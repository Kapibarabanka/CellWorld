using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using CellWorld.Neighborhood;
using CellWorld.Rule;

namespace CellWorld.Automaton
{
    public class CaHelper
    {
        private const int Pause = 200;

        public static int[][][] Simulate(Matrix start, List<IRule> rules, int steps)
        {
            var h = start.Height;
            var w = start.Width;
            var matrix = new List<Matrix> { start };
            for (var step = 0; step < steps; step++)
            {
                var prev = matrix[step];
                var next = new Matrix(h, w);
                for (var i = 0; i < h; i++)
                {
                    for (var j = 0; j < w; j++)
                    {

                        var neighbors = prev.Get2DNeighborhood(i, j);
                        next[i, j] = ApplyRules(neighbors, rules);
                    }
                }

                matrix.Add(next);
            }

            return matrix.Select(m => m.M).ToArray();
        }

        public static int[][][] SimulateLife(Matrix start, int steps)
        {
            var h = start.Height;
            var w = start.Width;
            var matrix = new List<Matrix> { start };
            for (var step = 0; step < steps; step++)
            {
                var prev = matrix[step];
                var next = new Matrix(h, w);
                for (var i = 0; i < h; i++)
                {
                    for (var j = 0; j < w; j++)
                    {
                        var neighbors = prev.Get2DNeighborhood(i, j);
                        next[i, j] = ApplyLifeRules(neighbors);
                    }
                }

                matrix.Add(next);
            }

            return matrix.Select(m => m.M).ToArray();
        }

        public static int ApplyLifeRules(CellStateArea neighbors)
        {
            var x = neighbors[Direction.X];
            var other = neighbors.Neighbors.Skip(1);
            var sum = other.Sum(s => (int) s);
            if ((x == CellState.Alive && (sum == 2 || sum == 3))
                || (x == CellState.Dead && sum == 3))
            {
                return 1;
            }
            
            return 0;
        }
        public static int ApplyRules(CellStateArea neighbors, List<IRule> rules)
        {
            foreach (var rule in rules)
            {
                if (rule.TryApply(neighbors, out var result))
                    return (int)result;
            }

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
