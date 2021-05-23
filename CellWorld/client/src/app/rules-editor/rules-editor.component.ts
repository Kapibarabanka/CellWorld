import { BlockRulesSet } from './../rules/block-rule/block-rules-set';
import { RulesService } from './../services/rules.service';
import { Component, OnInit } from '@angular/core';
import { SimulationType } from '../constants/simulation-type';
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
  public currentBlockRule: BlockRulesSet;
  public isMooreMode: boolean;

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
      this.currentBlockRule = null
      this.isMooreMode = true;
    } else {
      this.currentBlockRule = this.rulesService.getBlockRulesSet(ruleName);
      this.currentMooreRule = []
      this.isMooreMode = false;
    }
  }

  public saveBlockRule(){
    this.rulesService.setBlockRule(this.currentRuleName, this.currentBlockRule);
  }
  
}
