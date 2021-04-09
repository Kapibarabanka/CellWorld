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
            return CaHelper.Simulate(startMatrix, StaticData.rule126, startMatrix.Height - 1);
        }
    }
}
