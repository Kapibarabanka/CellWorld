import { ColorMap } from './../colors/color-map';
import { BlockRulesSet } from "./../rules/block-rule/block-rules-set";
import { RulesService } from "./../services/rules.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { SimulationType } from "../constants/simulation-type";
import { MooreRulesSet } from "../rules/moore-rule/moore-rules-set";

@Component({
  selector: "rules-editor",
  templateUrl: "./rules-editor.component.html",
  styleUrls: ["./rules-editor.component.css"],
})
export class RulesEditorComponent implements OnInit, OnDestroy {
  public mooreRuleSetsNames: string[];
  public blockRuleSetsNames: string[];
  public currentRuleSetName: string;

  public currentMooreRuleSet: MooreRulesSet;
  public currentBlockRuleSet: BlockRulesSet;
  public isMooreMode: boolean;

  public get ColorMap(): ColorMap{
    if (this.isMooreMode){
      return this.currentMooreRuleSet.ColorMap;
    }
    return this.currentBlockRuleSet.ColorMap;
  }

  constructor(private rulesService: RulesService) {
    this.mooreRuleSetsNames = rulesService.getMooreRuleSetsNames();
    this.blockRuleSetsNames = rulesService.getBlockRuleSetsNames();
  }

  ngOnInit(): void {
    this.selectRule(this.mooreRuleSetsNames[0]);
  }
  ngOnDestroy(): void {
    this.ColorMap.statesToColors.delete(-1)
  }

  public selectRule(ruleName: string) {
    if (!!this.currentRuleSetName && !!this.ColorMap) {
      this.ColorMap.statesToColors.delete(-1)
    }
    this.currentRuleSetName = ruleName;
    const ruleType = this.rulesService.getRuleSetType(ruleName);
    if (ruleType == SimulationType.Moore) {
      this.currentMooreRuleSet = this.rulesService.getMooreRulesSet(ruleName);
      this.currentBlockRuleSet = null;
      this.isMooreMode = true;
    } else {
      this.currentBlockRuleSet = this.rulesService.getBlockRulesSet(ruleName);
      this.currentMooreRuleSet = null;
      this.isMooreMode = false;
    }
    this.ColorMap.statesToColors.set(-1, '#ccc')
  }

  public selectState(state: number){
    this.ColorMap.currentState = state;
  }

  public saveBlockRule() {
    this.rulesService.setBlockRuleSet(this.currentRuleSetName, this.currentBlockRuleSet);
  }
}
