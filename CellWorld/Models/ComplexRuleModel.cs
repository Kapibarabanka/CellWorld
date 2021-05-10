namespace CellWorld.Models
{
    public class ComplexRuleModel
    {
        public RuleRequest RightRule { get; set; }
        public RuleRequest LeftRule { get; set; }
        public string Operator { get; set; }
        public sbyte Result { get; set; }
        public ComplexRuleModel(){}
    }
}
