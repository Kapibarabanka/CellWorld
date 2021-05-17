import { RulesService } from './rules.service';
import { SimulationType } from '../constants/simulation-type';
import { MooreStartConditions, BlockStartConditions } from '../simulation/start-conditions';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
    private url = "/api/";
  
    constructor(private http: HttpClient, private rulesService: RulesService) {}

    fetchSimulationResults(startMatrix: Array<Array<number>>, ruleName: string, steps: number) {
      const simType = this.rulesService.getRuleType(ruleName);
      if (simType == SimulationType.Block) {
        const rule = this.rulesService.getBlockRule(ruleName);
        return this.http.post(this.url + "simulateBlock", new BlockStartConditions(startMatrix, rule, steps));
      }
      const rule = this.rulesService.getMooreRule(ruleName);
      return this.http.post(this.url + "simulateMoore", new MooreStartConditions(startMatrix, rule, steps, 0));
    }
}