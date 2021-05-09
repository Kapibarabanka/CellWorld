import { StartConditions } from './start-conditions';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

 
@Injectable()
export class DataService {
 
    private url = "/api/";

    constructor(private http: HttpClient) {
    }

    fetchSimulationResults(startMatrix: Array<Array<number>>, rule: string, steps: number) {
      return this.http.post(this.url + "simulate", new StartConditions(startMatrix, rule, steps));
  }
}