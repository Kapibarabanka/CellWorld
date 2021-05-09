using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CellWorld.Rule.RuleModels
{
    public class ComplexRuleModel
    {
        public string RightRuleName { get; set; }
        public object RightRuleModel { get; set; }
        public string LeftRuleName { get; set; }
        public object LeftRuleModel { get; set; }
        public string Operator { get; set; }
        public sbyte Result { get; set; }
        public ComplexRuleModel(){}
    }
}
