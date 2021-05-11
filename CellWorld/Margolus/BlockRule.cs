using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
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

        public static BlockRule GetFromModel(object model)
        {
            var blockModel = JsonSerializer.Deserialize<BlockRuleModel>(model.ToString());
            var fromBlock = new Block(blockModel.FromBlock);
            var toBlock = new Block(blockModel.ToBlock);

            return new BlockRule(blockModel.Phase, fromBlock, toBlock);
        }
    }
}
