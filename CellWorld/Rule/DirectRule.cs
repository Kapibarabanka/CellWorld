using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CellWorld.Rule
{
    public class DirectRule : IRule
    {
        public int[] neighborhood;
        public int result;

        public DirectRule(int[] n, int r)
        {
            neighborhood = n;
            result = r;
        }

        public bool TryApply(int[] cellNeighbors, out int? result)
        {
            result = null;
            if (cellNeighbors.Length != neighborhood.Length)
                throw new ArgumentException("Neighbors count doesn't equal to rule size");
            for (var i = 0; i < cellNeighbors.Length; i++)
            {
                if (cellNeighbors[i] != neighborhood[i]
                    && neighborhood[i] != -1)
                    return false;
            }
            result = this.result;
            return true;
        }
    }
}
