import { SimulationType } from './../constants/simulation-type';
import { ConstantRules } from './../constants/constant-rules';
import { Injectable } from '@angular/core';
import { BlockRuleModel } from '../rules/block-rule/block-rule-model';
import { MooreRuleModel } from '../rules/moore-rule/moore-rule-model';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private mooreRules: Map<string, MooreRuleModel[]>;
  private blockRules: Map<string, BlockRuleModel[]>;

  constructor() {
    this.mooreRules = ConstantRules.MooreRules;
    this.blockRules = ConstantRules.BlockRules;
  }

  public getRulesNames(): string[] {
    return Array.from(this.mooreRules.keys()).concat(Array.from(this.blockRules.keys()))
  }

  public getRuleType(ruleName: string): SimulationType {
    if (this.blockRules.has(ruleName)) {
      return SimulationType.Block;
    }
    return SimulationType.Moore;
  }

  public getMooreRule(ruleName: string): MooreRuleModel[]{
    return this.mooreRules.get(ruleName);
  }

  public getBlockRule(ruleName: string): BlockRuleModel[]{
    return this.blockRules.get(ruleName);
  }

  public setBlockRule(ruleName: string, rule: BlockRuleModel[]) {
    this.blockRules.set(ruleName, rule);
  }
}
