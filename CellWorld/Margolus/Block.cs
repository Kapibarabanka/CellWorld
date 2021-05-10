using System;
using CellWorld.Automaton;

namespace CellWorld.Margolus
{
    public class Block
    {
        public sbyte[] Cells;

        public Block(sbyte[] cells)
        {
            if (cells.Length != StaticData.MargolusAreaSize)
            {
                throw new ArgumentOutOfRangeException(nameof(cells), "Wrong size of block");
            }
            Cells = cells;
        }

        /// <summary>
        /// 0 1
        /// 3 2
        /// </summary>
        public sbyte this[int idx]
        {
            get => Cells[idx];

            set => Cells[idx] = value;
        }
    }
}
