using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CellWorld.Automaton;

namespace CellWorld.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        [HttpPost]
        [Route("simulate126")]
        public sbyte[][][] Simulate126(StartConditions startConditions)
        {
            var startMatrix = new Matrix(startConditions.Matrix);
            //startMatrix[0, startMatrix.Width / 2] = 1;
            var res = CaHelper.Simulate(startMatrix, StaticData.Rule126, startMatrix.Height - 1);
            return res;
        }

        [HttpPost]
        [Route("simulateLife")]
        public sbyte[][][] SimulateLife(StartConditions startConditions)
        {
            var startMatrix = new Matrix(startConditions.Matrix);
            var res = CaHelper.Simulate(startMatrix, StaticData.Life, startConditions.Steps);
            return res;
        }
    }
}
