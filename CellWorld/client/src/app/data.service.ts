import { StartConditions } from './simulation/start-conditions';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RuleRequest } from './rules/rule-request';

 
@Injectable()
export class DataService {
 
    private url = "/api/";

    constructor(private http: HttpClient) {
    }

    fetchSimulationResults(startMatrix: Array<Array<number>>, rules: Array<RuleRequest>, steps: number) {
      return this.http.post(this.url + "simulate", new StartConditions(startMatrix, rules, steps));
  }
}