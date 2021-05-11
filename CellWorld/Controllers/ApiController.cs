using System.Linq;
using Microsoft.AspNetCore.Mvc;
using CellWorld.Automaton;
using CellWorld.Models;

namespace CellWorld.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        [HttpPost]
        [Route("simulateMoore")]
        public sbyte[][][] Simulatemoore([FromBody] StartConditions startConditions)
        {
            var startMatrix = new Matrix(startConditions.Matrix);
            var rules = startConditions.Rules.Select(RuleHelper.GetMooreRule).ToList();
            var res = CaHelper.SimulateMoore(startMatrix, rules, startConditions.Steps);
            return res;
        }

        [HttpPost]
        [Route("simulateBlock")]
        public sbyte[][][] SimulateBlock([FromBody] StartConditions startConditions)
        {
            var startMatrix = new Matrix(startConditions.Matrix);
            var rules = startConditions.Rules.Select(RuleHelper.GetBlockRule).ToList();
            var res = CaHelper.SimulateBlock(startMatrix, rules, startConditions.Steps);
            return res;
        }
    }
}
