import { SavedState } from './saved-state';
import { RulesService } from './rules.service';
import { SimulationType } from '../constants/simulation-type';
import { MooreStartConditions, BlockStartConditions } from './start-conditions';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
    private url = "/api/";
    private savedState: SavedState = null;
  
    constructor(private http: HttpClient, private rulesService: RulesService) {}

    public fetchSimulationResults(startMatrix: Array<Array<number>>, ruleName: string, steps: number) {
      const simType = this.rulesService.getRuleSetType(ruleName);
      if (simType == SimulationType.Block) {
        const rulesSet = this.rulesService.getBlockRulesSet(ruleName);
        return this.http.post(this.url + "simulateBlock", new BlockStartConditions(startMatrix, rulesSet.Rules, steps));
      }
      const rulesSet = this.rulesService.getMooreRulesSet(ruleName);
      return this.http.post(this.url + "simulateMoore", new MooreStartConditions(startMatrix, rulesSet.Rules, steps, 0));
    }

    public saveState(state: SavedState){
      this.savedState = state;
    }

    public getSavedState() : SavedState {
      return this.savedState;
    }
}