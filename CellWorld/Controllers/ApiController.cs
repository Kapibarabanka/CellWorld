using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public int[][][] Simulate126(StartConditions startConditions)
        {
            var startMatrix = new Matrix(startConditions.Matrix);
            //startMatrix[0, startMatrix.Width / 2] = 1;
            var res = CaHelper.Simulate(startMatrix, StaticData.rule126, startMatrix.Height - 1);
            return res;
        }

        [HttpPost]
        [Route("simulateLife")]
        public int[][][] SimulateLife(StartConditions startConditions)
        {
            var startMatrix = new Matrix(startConditions.Matrix);
            var res = CaHelper.SimulateLife(startMatrix, startConditions.Steps);
            return res;
        }
    }
}
