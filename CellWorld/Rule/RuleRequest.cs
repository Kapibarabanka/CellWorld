using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CellWorld.Rule
{
    public class RuleRequest
    {
        public RuleRequest(){}

        public string RuleType { get; set; }
        public object RuleModel { get; set; }
    }
}
