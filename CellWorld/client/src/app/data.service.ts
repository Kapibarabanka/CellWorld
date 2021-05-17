import { ConstantRules } from './constants/constant-rules';
import { SimulationType } from './constants/simulation-type';
import { StartConditions } from './simulation/start-conditions';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RuleRequest } from './rules/rule-request';

@Injectable({
  providedIn: 'root',
})
export class DataService {
    private url = "/api/";
    private rules: Map<string, RuleRequest[]>;

    constructor(private http: HttpClient) {
      this.rules = ConstantRules.Rules;
    }

    public getRulesNames(): string[] {
      return Array.from(this.rules.keys())
    }

    fetchSimulationResults(startMatrix: Array<Array<number>>, ruleName: string, steps: number, simType: SimulationType ) {
      const rule = this.rules.get(ruleName);
      let method = "simulateMoore";
      if (simType == SimulationType.Block) {
        method = "simulateBlock"
      }
      return this.http.post(this.url + method, new StartConditions(startMatrix, rule, steps));
  }
}