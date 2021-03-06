using System;
using System.Linq;
using CellWorld.Margolus;
using CellWorld.Moore;

namespace CellWorld.Automaton
{
    public class Matrix
    {
        public sbyte[][] M { get; }

        public int Height { get; }
        public int Width { get; }
        public Matrix(sbyte[][] m)
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
            M = new sbyte[height][];
            for (var i = 0; i < height; i++)
            {
                M[i] = new sbyte[width];
            }
            Height = height;
            Width = width;
        }

        public sbyte this[int i, int j]
        {
            get => M[GetCycledI(i)][GetCycledJ(j)];

            set => M[GetCycledI(i)][GetCycledJ(j)] = value;
        }

        /// <summary>
        /// Previous cell value (X), then clockwise from N:
        /// X  N  NE  E  SE   S  SW   W  NW
        /// </summary>
        public CellStateArea GetMooreNeighborhood(int i, int j)
        {
            var x =  this[i, j];
            var n =  this[i - 1, j];
            var ne = this[i - 1, j + 1];
            var e =  this[i, j + 1];
            var se = this[i + 1, j + 1];
            var s =  this[i + 1, j];
            var sw = this[i + 1, j - 1];
            var w =  this[i, j - 1];
            var nw = this[i - 1, j - 1];
            return new CellStateArea(new[] { ne, n, nw, e, x, w, se, s, sw});
        }

        public Block GetMargolusBlock((int, int) blockCorner)
        {
            var (i, j) = blockCorner;
            var ul = this[i, j];
            var ur = this[i, j + 1];
            var dr = this[i + 1, j + 1];
            var dl = this[i + 1, j];
            return new Block(new[] { ul, ur, dl, dr});
        }

        public void UpdateMargolusBlock((int i, int j) blockCorner, Block blockToInsert)
        {
            var (i, j) = blockCorner;
            this[i, j] = blockToInsert[0];
            this[i, j + 1] = blockToInsert[1];
            this[i + 1, j] = blockToInsert[2];
            this[i + 1, j + 1] = blockToInsert[3];
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
