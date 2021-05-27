﻿using System.Linq;
using Microsoft.AspNetCore.Mvc;
using CellWorld.Automaton;
using CellWorld.Block;
using CellWorld.Models;
using CellWorld.Moore;

namespace CellWorld.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        [HttpPost]
        [Route("simulateMoore")]
        public sbyte[][][] SimulateMoore([FromBody] MooreStartConditions mooreStartConditions)
        {
            var startMatrix = new Matrix(mooreStartConditions.Matrix);
            var rules = mooreStartConditions.Rules.Select(RuleHelper.GetMooreRule).ToList();
            var res = CaHelper.SimulateMoore(startMatrix, rules, mooreStartConditions.Steps, mooreStartConditions.DefaultValue);
            return res;
        }

        [HttpPost]
        [Route("simulateBlock")]
        public sbyte[][][] SimulateBlock([FromBody] BlockStartConditions blockStartConditions)
        {
            var startMatrix = new Matrix(blockStartConditions.Matrix);
            var rules = blockStartConditions.Rules.Select(m => new BlockRule(m)).ToList();
            var res = CaHelper.SimulateBlock(startMatrix, rules, blockStartConditions.Steps);
            return res;
        }
    }
}
