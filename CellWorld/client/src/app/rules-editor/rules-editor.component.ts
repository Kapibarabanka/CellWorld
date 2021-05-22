import { RulesService } from './../services/rules.service';
import { Component, OnInit } from '@angular/core';
import { SimulationType } from '../constants/simulation-type';
import { BlockRuleModel } from '../rules/block-rule/block-rule-model';
import { MooreRuleModel } from '../rules/moore-rule/moore-rule-model';

@Component({
  selector: 'rules-editor',
  templateUrl: './rules-editor.component.html',
  styleUrls: ['./rules-editor.component.css']
})
export class RulesEditorComponent implements OnInit {

  public ruleNames: string[];
  public currentRuleName: string;

  public currentMooreRule: MooreRuleModel[];
  public currentBlockRule: BlockRuleModel[];
  private isMooreMode: boolean;

  public currentState: number = 1;

  constructor(private rulesService: RulesService) {
    this.ruleNames = rulesService.getRulesNames();
    this.selectRule(this.ruleNames[2]);
  }

  ngOnInit(): void {
  }

  public selectRule(ruleName: string) {
    this.currentRuleName = ruleName;
    const ruleType = this.rulesService.getRuleType(ruleName);
    if (ruleType == SimulationType.Moore){
      this.currentMooreRule = this.rulesService.getMooreRule(ruleName);
      this.currentBlockRule = []
      this.isMooreMode = true;
    } else {
      this.currentBlockRule = this.rulesService.getBlockRule(ruleName);
      this.currentMooreRule = []
      this.isMooreMode = false;
    }
  }

  public changeState() {
    this.currentState = this.currentState == 0 ? 1 : 0;
  }

  public updateRule(idx: number, rule: BlockRuleModel){
    this.currentBlockRule[idx] = rule;
  }

  public save(){
    if (this.isMooreMode){
    //  this.rulesService.setMooreRule(this.currentRuleName, this.currentMooreRule);
    } else {
      this.rulesService.setBlockRule(this.currentRuleName, this.currentBlockRule);
    }
  }

  public addTransition(){
    if (this.isMooreMode){

    } else {
      //this.currentBlockRule.push(new BlockRuleModel())
    }
  }
}
