namespace CellWorld.Moore.Conditions
{
    public interface IMooreCondition
    {
        public bool IsApplicable(CellStateArea cellNeighbors);
    }
}
