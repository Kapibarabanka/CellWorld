using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CellWorld.Rule
{
    public class SumRule : IRule
    {
        public int Sum;
        public int CellState;

        public int Result;

        public SumRule(int sum, int cellState, int result)
        {
            Sum = sum;
            CellState = cellState;
            Result = result;
        }

        public bool TryApply(int[] cellNeighbors, out int? result)
        {
            result = null;
            var cell = cellNeighbors[0];
            if ((cell == CellState || CellState == -1) && cellNeighbors.Sum() - cell == Sum)
            {
                result = Result;
                return true;
            }

            return false;
        }
    }
}
