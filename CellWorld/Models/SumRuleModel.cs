namespace CellWorld.Models
{
    public class SumRuleModel
    {
        public bool[] CellsToSum { get; set; }
        public int RequiredSum { get; set; }
        public sbyte Result { get; set; }
        public SumRuleModel(){}
    }
}
