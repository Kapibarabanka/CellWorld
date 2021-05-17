using System.Text.Json;
using CellWorld.Models;

namespace CellWorld.Moore.Conditions
{
    /// <summary>
    /// Combines two conditions with logical operator
    /// </summary>
    internal class ComplexCondition : IMooreCondition
    {
        public IMooreCondition LeftCondition { get; }
        public IMooreCondition RightCondition { get; }
        public string Operator { get; }

        public ComplexCondition(IMooreCondition leftCondition, IMooreCondition rightCondition, string op)
        {
            LeftCondition = leftCondition;
            RightCondition = rightCondition;
            Operator = op.ToLower();
        }

        public bool IsApplicable(CellStateArea cellNeighbors)
        {
            return Operator switch
            {
                "not" => !RightCondition.IsApplicable(cellNeighbors),
                "and" => LeftCondition.IsApplicable(cellNeighbors) && RightCondition.IsApplicable(cellNeighbors),
                "or" => LeftCondition.IsApplicable(cellNeighbors) || RightCondition.IsApplicable(cellNeighbors),
                "xor" => LeftCondition.IsApplicable(cellNeighbors) ^ RightCondition.IsApplicable(cellNeighbors),
                _ => false
            };
        }

        public static IMooreCondition GetFromModel(object model)
        {
            var complexModel = JsonSerializer.Deserialize<ComplexConditionModel>(model.ToString());
            var leftCondition = RuleHelper.GetCondition(complexModel.LeftCondition);
            var rightCondition = RuleHelper.GetCondition(complexModel.RightCondition);
            return new ComplexCondition(leftCondition, rightCondition, complexModel.Operator);
        }
    }
}
