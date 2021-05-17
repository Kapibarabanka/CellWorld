using System.Text.Json;
using CellWorld.Models;


namespace CellWorld.Margolus
{
    public class BlockRule
    {
        /// <summary>
        /// 0 or 1 for phase-dependent rules, -1 for phase-independent
        /// </summary>
        public sbyte Phase { get; set; }
        public Block From { get; set; }
        public Block To { get; set; }

        public BlockRule(sbyte phase, Block from, Block to)
        {
            Phase = phase;
            From = from;
            To = to;
        }

        public BlockRule(BlockRuleModel model)
        {
            Phase = model.Phase;
            From = new Block(model.FromBlock);
            To = new Block(model.ToBlock);
        }
    }
}
