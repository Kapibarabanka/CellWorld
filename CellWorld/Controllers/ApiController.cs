using System.Collections.Generic;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CellWorld.Automaton;
using CellWorld.Rule;

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
            var a = JsonSerializer.Deserialize<RuleRequest>(startConditions.Test.ToString());
            List<IRule> rule;
            switch (startConditions.Rule)
            {
                case "126":
                    rule = StaticData.Rule126;
                    break;
                default:
                    rule = StaticData.Life;
                    break;
            }
            var res = CaHelper.Simulate(startMatrix, rule, startConditions.Steps);
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
