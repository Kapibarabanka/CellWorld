import { BlockRulesSet } from "./../rules/block-rule/block-rules-set";
import { RulesService } from "./../services/rules.service";
import { Component, OnInit } from "@angular/core";
import { SimulationType } from "../constants/simulation-type";
import { MooreRulesSet } from "../rules/moore-rule/moore-rules-set";

@Component({
  selector: "rules-editor",
  templateUrl: "./rules-editor.component.html",
  styleUrls: ["./rules-editor.component.css"],
})
export class RulesEditorComponent implements OnInit {
  public ruleNames: string[];
  public currentRuleName: string;

  public currentMooreRule: MooreRulesSet;
  public currentBlockRule: BlockRulesSet;
  public isMooreMode: boolean;

  constructor(private rulesService: RulesService) {
    this.ruleNames = rulesService.getRuleSetsNames();
    this.selectRule(this.ruleNames[0]);
  }

  ngOnInit(): void {}

  public selectRule(ruleName: string) {
    this.currentRuleName = ruleName;
    const ruleType = this.rulesService.getRuleSetType(ruleName);
    if (ruleType == SimulationType.Moore) {
      this.currentMooreRule = this.rulesService.getMooreRulesSet(ruleName);
      this.currentBlockRule = null;
      this.isMooreMode = true;
    } else {
      this.currentBlockRule = this.rulesService.getBlockRulesSet(ruleName);
      this.currentMooreRule = null;
      this.isMooreMode = false;
    }
  }

  public saveBlockRule() {
    this.rulesService.setBlockRuleSet(this.currentRuleName, this.currentBlockRule);
  }
}
