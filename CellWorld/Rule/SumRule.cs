using System.Text.Json;
using CellWorld.Automaton;
using CellWorld.Neighborhood;
using CellWorld.Rule.RuleModels;

namespace CellWorld.Rule
{
    /// <summary>
    /// When applied, this rule will sum cells from cell's neighborhood that are in same position as "true" in Bool.
    /// If this sum is equal to required, will return Result state to the cell.
    /// </summary>
    internal class SumRule : IRule
    {
        public BoolArea CellsToSum { get; }
        public int RequiredSum { get; }

        public sbyte Result { get; }

        public SumRule(BoolArea cellsToSum, int requiredSum, sbyte result)
        {
            CellsToSum = cellsToSum;
            RequiredSum = requiredSum;
            Result = result;
        }

        public sbyte? TryApply(CellStateArea cellNeighbors)
        {
            var sum = 0;
            for (var i = 0; i < StaticData.AreaSize; i++)
            {
                if (CellsToSum[i])
                {
                    sum += cellNeighbors[i];
                }
            }

            return sum == RequiredSum
                ? (sbyte?) Result
                : null;
        }

        public static IRule GetFromModel(object model)
        {
            var sumModel = JsonSerializer.Deserialize<SumRuleModel>(model.ToString());
            return new SumRule(new BoolArea(sumModel.CellsToSum), sumModel.RequiredSum, sumModel.Result);
        }
    }
}
