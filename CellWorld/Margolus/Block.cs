using System;
using CellWorld.Automaton;

namespace CellWorld.Margolus
{
    public class Block: IEquatable<Block>
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
        /// 2 3
        /// </summary>
        public sbyte this[int idx]
        {
            get => Cells[idx];

            set => Cells[idx] = value;
        }

        public bool Equals(Block other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            for (var i = 0; i < StaticData.MargolusAreaSize; i++)
            {
                if (Cells[i] != other.Cells[i])
                    return false;
            }
            return true;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((Block) obj);
        }

        public override int GetHashCode()
        {
            return (Cells != null ? Cells.GetHashCode() : 0);
        }
    }
}
