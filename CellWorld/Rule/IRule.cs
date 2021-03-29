using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CellWorld.Rule
{
    public interface IRule
    {
        public bool TryApply(int[] cellNeighbors, out int? result);
    }
}