namespace CellWorld.Models
{
    public class ComplexConditionModel
    {
        public ConditionModel RightCondition { get; set; }
        public ConditionModel LeftCondition { get; set; }
        public string Operator { get; set; }
        public ComplexConditionModel(){}
    }
}
