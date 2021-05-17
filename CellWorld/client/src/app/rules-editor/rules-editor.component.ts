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

  constructor(private rulesService: RulesService) {
    this.ruleNames = rulesService.getRulesNames();
    this.selectRule(this.ruleNames[0]);
  }

  ngOnInit(): void {
  }

  public selectRule(ruleName: string) {
    this.currentRuleName = ruleName;
    const ruleType = this.rulesService.getRuleType(ruleName);
    if (ruleType == SimulationType.Moore){
      this.currentMooreRule = this.rulesService.getMooreRule(ruleName);
      this.currentBlockRule = []
    } else {
      this.currentBlockRule = this.rulesService.getBlockRule(ruleName);
      this.currentMooreRule = []
    }
  }
}
