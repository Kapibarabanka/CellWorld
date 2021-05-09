using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CellWorld.Rule
{
    public class RuleRequest
    {
        public RuleRequest(){}
        public RuleRequest(string ruleType, IDictionary<string, object> param)
        {
            RuleType = ruleType;
            Params = param;
        }

        public string RuleType { get; set; }
        public IDictionary<string, object> Params { get; set; }

        internal IRule ConvertToRule()
        {
            return null;
        }
    }
}
