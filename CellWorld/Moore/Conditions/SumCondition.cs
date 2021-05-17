using System.Text.Json;
using CellWorld.Automaton;
using CellWorld.Models;

namespace CellWorld.Moore.Conditions
{
    /// <summary>
    /// When applied, this rule will sum cells from cell's neighborhood that are in same position as "true" in Bool.
    /// If this sum is equal to required, will return Result state to the cell.
    /// </summary>
    internal class SumCondition : IMooreCondition
    {
        public BoolArea CellsToSum { get; }
        public int RequiredSum { get; }

        public SumCondition(BoolArea cellsToSum, int requiredSum)
        {
            CellsToSum = cellsToSum;
            RequiredSum = requiredSum;
        }

        public bool IsApplicable(CellStateArea cellNeighbors)
        {
            var sum = 0;
            for (var i = 0; i < StaticData.MoorAreaSize; i++)
            {
                if (CellsToSum[i])
                {
                    sum += cellNeighbors[i];
                }
            }

            return sum == RequiredSum;
        }

        public static IMooreCondition GetFromModel(object model)
        {
            var sumModel = JsonSerializer.Deserialize<SumConditionModel>(model.ToString());
            return new SumCondition(new BoolArea(sumModel.CellsToSum), sumModel.RequiredSum);
        }
    }
}
