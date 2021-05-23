import { BlockRulesSet } from './../rules/block-rule/block-rules-set';
import { SimulationType } from './../constants/simulation-type';
import { ConstantRules } from './../constants/constant-rules';
import { Injectable } from '@angular/core';
import { MooreRuleModel } from '../rules/moore-rule/moore-rule-model';
import { MooreRulesSet } from '../rules/moore-rule/moore-rules-set';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private mooreRules: Map<string, MooreRulesSet>;
  private blockRules: Map<string, BlockRulesSet>;

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

  public getMooreRulesSet(ruleName: string): MooreRulesSet{
    return this.mooreRules.get(ruleName);
  }

  public getBlockRulesSet(ruleName: string): BlockRulesSet{
    return this.blockRules.get(ruleName);
  }

  public setBlockRule(ruleName: string, rule: BlockRulesSet) {
    this.blockRules.set(ruleName, rule);
  }
}
