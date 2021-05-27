using System.Collections.Generic;
using CellWorld.Models;

namespace CellWorld.Moore
{
    public class MooreStartConditions
    {
        public sbyte[][] Matrix { get; set; }
        public IEnumerable<MooreRuleModel> RuleSet { get; set; }
        public int Steps { get; set; }
        public sbyte DefaultValue { get; set; }
    }
}
