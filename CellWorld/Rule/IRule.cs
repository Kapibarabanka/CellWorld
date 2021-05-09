using CellWorld.Neighborhood;

namespace CellWorld.Rule
{
    internal interface IRule
    {
        /// <summary>
        /// New state of cell if rule is applicable to its neighborhood.
        /// </summary>
        public sbyte Result { get; }

        /// <summary>
        /// Returns <c>Result</c> if applicable to <param name="cellNeighbors"></param>.
        /// If isn't applicable, returns <c>null</c>.
        /// </summary>
        public sbyte? TryApply(CellStateArea cellNeighbors);
    }
}