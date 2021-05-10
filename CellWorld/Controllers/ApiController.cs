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
        [Route("simulate")]
        public sbyte[][][] Simulate([FromBody] StartConditions startConditions)
        {
            var startMatrix = new Matrix(startConditions.Matrix);
            var rules = startConditions.Rules.Select(RuleHelper.GetMooreRule).ToList();
            var res = CaHelper.Simulate(startMatrix, rules, startConditions.Steps);
            return res;
        }
    }
}
