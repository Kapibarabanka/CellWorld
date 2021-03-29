using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CellWorld.Rule;

namespace CellWorld.Automaton
{
    public class CAHelper
    {
        public static void Test()
        {
            var stopWatch = new Stopwatch();
            var size = 40;
            var a = new Matrix(size, size);
            a[0, size/2] = 1;

            // a[3, 5] = 1;
            // a[3, 6] = 1;
            // a[3, 7] = 1;
            //
            // a[2, 7] = 1;
            // a[1, 6] = 1;

            stopWatch.Start();

            var result = Simulate(a, 100, StaticData.rule126);

            stopWatch.Stop();

            PrintSimulation(result, 200);

            var ts = stopWatch.Elapsed;
            var elapsedTime = $"{ts.Minutes:00}m:{ts.Seconds:00}.{ts.Milliseconds / 10:00}s";

            //Console.WriteLine($"Elapsed time: {elapsedTime}");
            //Console.SetCursorPosition(0, 0);
            Console.ReadLine();
        }

        public static List<Matrix> Simulate(Matrix start, int steps, List<IRule> rules)
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

            return matrix;
        }

        public static int ApplyRules(int[] neighbors, List<IRule> rules)
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
