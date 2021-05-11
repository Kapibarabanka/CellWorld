using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CellWorld.Models
{
    public class BlockRuleModel
    {
        public sbyte Phase { get; set; }
        public sbyte[] FromBlock { get; set; }
        public sbyte[] ToBlock { get; set; }
        public BlockRuleModel() { }
    }
}
