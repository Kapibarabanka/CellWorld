import { BlockRulesSet } from './../rules/block-rule/block-rules-set';
import { SimulationType } from './../constants/simulation-type';
import { ConstantRules } from './../constants/constant-rules';
import { Injectable } from '@angular/core';
import { MooreRulesSet } from '../rules/moore-rule/moore-rules-set';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private mooreRuleSets: Map<string, MooreRulesSet>;
  private blockRuleSets: Map<string, BlockRulesSet>;

  constructor() {
    this.mooreRuleSets = ConstantRules.MooreRules;
    this.blockRuleSets = ConstantRules.BlockRules;
  }

  public getRuleSetsNames(): string[] {
    return Array.from(this.mooreRuleSets.keys()).concat(Array.from(this.blockRuleSets.keys()))
  }

  public getMooreRuleSetsNames(): string[] {
    return Array.from(this.mooreRuleSets.keys())
  }

  public getBlockRuleSetsNames(): string[] {
    return Array.from(this.blockRuleSets.keys())
  }

  public getRuleSetType(ruleSetName: string): SimulationType {
    if (this.blockRuleSets.has(ruleSetName)) {
      return SimulationType.Block;
    }
    return SimulationType.Moore;
  }

  public getMooreRulesSet(ruleSetName: string): MooreRulesSet{
    return this.mooreRuleSets.get(ruleSetName);
  }

  public getBlockRulesSet(ruleSetName: string): BlockRulesSet{
    return this.blockRuleSets.get(ruleSetName);
  }

  public setBlockRuleSet(ruleSetName: string, rule: BlockRulesSet) {
    this.blockRuleSets.set(ruleSetName, rule);
  }
  
  public setMooreRuleSet(ruleSetName: string, rule: MooreRulesSet) {
    this.mooreRuleSets.set(ruleSetName, rule);
  }
}
