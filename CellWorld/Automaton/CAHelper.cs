using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using CellWorld.Neighborhood;
using CellWorld.Rule;

namespace CellWorld.Automaton
{
    public class CaHelper
    {
        private const int Pause = 200;

        public static void Test126(int size)
        {
            var a = new Matrix(size, size) {[0, size / 2] = 1};
            Simulate(a, size-1, StaticData.rule126);
        }

        // public static void TestLife(int size, int steps)
        // {
        //     var a = new Matrix(size, size)
        //     {
        //         [3, 5] = 1,
        //         [3, 6] = 1,
        //         [3, 7] = 1,
        //         [2, 7] = 1,
        //         [1, 6] = 1
        //     };
        //
        //     Simulate(a, steps, StaticData.ruleLife);
        // }

        public static void Simulate(Matrix start, int steps, List<IRule> rules)
        {
            var stopWatch = new Stopwatch();
            stopWatch.Start();

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

            stopWatch.Stop();
            var ts = stopWatch.Elapsed;
            var elapsedTime = $"{ts.Minutes:00}m:{ts.Seconds:00}.{ts.Milliseconds / 10:00}s";

            PrintSimulation(matrix, Pause);
            Console.ReadLine();
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
