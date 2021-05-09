using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CellWorld.Rule.RuleModels
{
    public class SumRuleModel
    {
        public bool[] CellsToSum { get; set; }
        public int RequiredSum { get; set; }
        public sbyte Result { get; set; }
        public SumRuleModel(){}
    }
}
