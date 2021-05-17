using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CellWorld.Moore.Conditions;

namespace CellWorld.Moore
{
    public class MooreRule
    {
        public IMooreCondition Condition { get; set; }
        public sbyte Result { get; set; }

        public MooreRule(IMooreCondition condition, sbyte result)
        {
            Condition = condition;
            Result = result;
        }

        /// <summary>
        /// Returns <c>Result</c> if <c>Condition</c> is applicable to <param name="cellNeighbors"></param>.
        /// If isn't applicable, returns <c>null</c>.
        /// </summary>
        public sbyte? TryApply(CellStateArea cellNeighbors)
        {
            return Condition.IsApplicable(cellNeighbors)
                ? Result
                : (sbyte?) null;
        }
    }
}
