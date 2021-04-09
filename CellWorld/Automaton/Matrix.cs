using System;
using System.Linq;
using CellWorld.Neighborhood;

namespace CellWorld.Automaton
{
    public class Matrix
    {
        public int[][] M { get; }

        public int Height { get; }
        public int Width { get; }
        public Matrix(int[][] m)
        {
            M = m;
            Height = m.Length;
            Width = m[0].Length;
            if (m.Any(row => row.Length != Width))
            {
                throw new ArgumentException("All rows in matrix doesn't have same length");
            }
        }

        public Matrix(int height, int width)
        {
            M = new int[height][];
            for (var i = 0; i < height; i++)
            {
                M[i] = new int[width];
            }
            Height = height;
            Width = width;
        }

        public int this[int i, int j]
        {
            get => M[GetCycledI(i)][GetCycledJ(j)];

            set => M[i][j] = value;
        }

        public int[] Get1DNeighbors(int i, int j)
        {
            if (i == 0)
                throw new ArgumentException();
            var left = this[i - 1, j - 1];
            var central = this[i - 1, j];
            var right = this[i - 1, j + 1];
            return new[] { left, central, right };
        }

        /// <summary>
        /// Previous cell value (X), then clockwise from N:
        /// X  N  NE  E  SE   S  SW   W  NW
        /// </summary>
        public CellStateArea Get2DNeighborhood(int i, int j)
        {
            var x = (CellState) this[i, j];
            var n = (CellState) this[i - 1, j];
            var ne =(CellState) this[i - 1, j + 1];
            var e = (CellState) this[i, j + 1];
            var se =(CellState) this[i + 1, j + 1];
            var s = (CellState) this[i + 1, j];
            var sw =(CellState) this[i + 1, j - 1];
            var w = (CellState) this[i, j - 1];
            var nw =(CellState) this[i - 1, j - 1];
            return new CellStateArea(new[] { x, n, ne, e, se, s, sw, w, nw });
        }

        private int GetCycledI(int i)
        {
            if (i == -1)
                return Height - 1;
            if (i == Height)
                return 0;
            return i;
        }

        private int GetCycledJ(int j)
        {
            if (j == -1)
                return Width - 1;
            if (j == Width)
                return 0;
            return j;
        }
    }
}
