using System.Collections.Generic;
using CellWorld.Models;

namespace CellWorld.Margolus
{
    public class BlockStartConditions
    {
        public sbyte[][] Matrix { get; set; }
        public IEnumerable<BlockRuleModel> Rules { get; set; }
        public int Steps { get; set; }
    }
}
