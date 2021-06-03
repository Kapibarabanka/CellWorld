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
