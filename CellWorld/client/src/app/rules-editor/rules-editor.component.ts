import { ColorMap } from "./../colors/color-map";
import { BlockRulesSet } from "./../rules/block-rule/block-rules-set";
import { RulesService } from "./../services/rules.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { SimulationType } from "../constants/simulation-type";
import { MooreRulesSet } from "../rules/moore-rule/moore-rules-set";
import { ColorPickerEventArgs } from "@syncfusion/ej2-angular-inputs";

@Component({
  selector: "rules-editor",
  templateUrl: "./rules-editor.component.html",
  styleUrls: ["./rules-editor.component.css"],
})
export class RulesEditorComponent implements OnInit, OnDestroy {
  public mooreRuleSetsNames: string[];
  public blockRuleSetsNames: string[];
  public currentRuleSetName: string;
  public inputRuleSetName: string;

  public currentMooreRuleSet: MooreRulesSet;
  public currentBlockRuleSet: BlockRulesSet;
  public isMooreMode: boolean;

  public get ColorMap(): ColorMap {
    if (this.isMooreMode) {
      return this.currentMooreRuleSet.ColorMap;
    }
    return this.currentBlockRuleSet.ColorMap;
  }

  constructor(private rulesService: RulesService) {
    this.updateRuleSetLists();
  }

  ngOnInit(): void {
    this.selectRule(this.mooreRuleSetsNames[0]);
  }
  ngOnDestroy(): void {
    this.ColorMap.statesToColors.delete(-1);
  }

  public selectRule(ruleName: string) {
    if (!!this.currentRuleSetName && !!this.ColorMap) {
      this.ColorMap.statesToColors.delete(-1);
    }
    this.currentRuleSetName = ruleName;
    this.inputRuleSetName = ruleName;
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
    this.ColorMap.statesToColors.set(-1, "#ccc");
  }

  public selectState(state: number) {
    this.ColorMap.currentState = state;
  }

  public updateColorMap(args: ColorPickerEventArgs, state: number): void {
    this.ColorMap.statesToColors.set(state, args.currentValue.hex);
  }

  public saveRuleSet() {
    if (this.isMooreMode) {
      this.rulesService.setMooreRuleSet(
        this.inputRuleSetName,
        this.currentMooreRuleSet
      );
      if (this.inputRuleSetName != this.currentRuleSetName) {
        this.rulesService.deleteMooreRuleSet(this.currentRuleSetName);
        this.currentRuleSetName = this.inputRuleSetName;
        this.updateRuleSetLists();
      }
    } else {
      this.rulesService.setBlockRuleSet(
        this.inputRuleSetName,
        this.currentBlockRuleSet
      );
      if (this.inputRuleSetName != this.currentRuleSetName) {
        this.rulesService.deleteBlockRuleSet(this.currentRuleSetName);
        this.currentRuleSetName = this.inputRuleSetName;
        this.updateRuleSetLists();
      }
      console.log(JSON.stringify(this.currentBlockRuleSet ));
    }
  }

  public addMooreRuleSet(){
    this.rulesService.setMooreRuleSet("Moore Rule Set", new MooreRulesSet([], new ColorMap()))
    this.updateRuleSetLists();
  }

  public addBlockRuleSet(){
    this.rulesService.setBlockRuleSet("Block Rule Set", new BlockRulesSet([], new ColorMap()))
    this.updateRuleSetLists();
  }

  public deleteRuleSet() {
    if (this.isMooreMode) {
      this.rulesService.deleteMooreRuleSet(this.currentRuleSetName);
    } else {
      this.rulesService.deleteBlockRuleSet(this.currentRuleSetName);
    }
    this.updateRuleSetLists();
  }

  private updateRuleSetLists() {
    this.blockRuleSetsNames = this.rulesService.getBlockRuleSetsNames();
    this.mooreRuleSetsNames = this.rulesService.getMooreRuleSetsNames();
  }
}
