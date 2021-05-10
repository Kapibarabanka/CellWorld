using System;
using CellWorld.Automaton;

namespace CellWorld.Moore
{
    public class Area<T>
    {
        public T[] Neighbors { get; }

        public Area(T[] neighbors)
        {
            if (neighbors.Length != StaticData.MoorAreaSize)
            {
                throw new ArgumentOutOfRangeException(nameof(neighbors), "Wrong number of neighbors (should be 9)");
            }
            Neighbors = neighbors;
        }

        public T this[int idx]
        {
            get => Neighbors[idx];

            set => Neighbors[idx] = value;
        }

        public T this[Direction dir]
        {
            get => Neighbors[(int) dir];

            set => Neighbors[(int)dir] = value;
        }
    }

    public enum Direction
    {
        X = 0,
        N,
        NE,
        E,
        SE,
        S,
        SW,
        W,
        NW
    }
}
