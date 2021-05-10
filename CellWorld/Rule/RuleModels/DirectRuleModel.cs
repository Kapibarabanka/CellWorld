using System.Security.Cryptography;

namespace CellWorld.Rule.RuleModels
{
    public class DirectRuleModel
    {
        public sbyte[] Condition { get; set; }
        public sbyte Result { get; set; }
        public DirectRuleModel(){}
    }
}
