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

  public currentRuleSet: MooreRulesSet | BlockRulesSet;

  public get ColorMap(): ColorMap {
    return this.currentRuleSet.ColorMap;
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

  public selectRule(ruleSetName: string) {
    this.currentRuleSetName = ruleSetName;
    this.inputRuleSetName = ruleSetName;
    const ruleType = this.rulesService.getRuleSetType(ruleSetName);
    if (ruleType == SimulationType.Moore) {
      this.currentRuleSet = this.rulesService.getMooreRulesSet(ruleSetName);
    } else {
      this.currentRuleSet = this.rulesService.getBlockRulesSet(ruleSetName);
    }
  }

  public selectState(state: number) {
    this.ColorMap.currentState = state;
  }

  public updateColorMap(args: ColorPickerEventArgs, state: number): void {
    this.ColorMap.statesToColors.set(state, args.currentValue.hex);
  }

  public updateDefaultColor(args: ColorPickerEventArgs): void {
    this.ColorMap.defaultStateColor = args.currentValue.hex;
  }

  public addState(){
    this.ColorMap.addState();
  }

  public saveRuleSet() {
    if (this.currentRuleSet.isMoore) {
      this.rulesService.setMooreRuleSet(
        this.inputRuleSetName,
        this.currentRuleSet as MooreRulesSet
      );
      if (this.inputRuleSetName != this.currentRuleSetName) {
        this.rulesService.deleteMooreRuleSet(this.currentRuleSetName);
        this.currentRuleSetName = this.inputRuleSetName;
        this.updateRuleSetLists();
      }
    } else {
      this.rulesService.setBlockRuleSet(
        this.inputRuleSetName,
        this.currentRuleSet as BlockRulesSet
      );
      if (this.inputRuleSetName != this.currentRuleSetName) {
        this.rulesService.deleteBlockRuleSet(this.currentRuleSetName);
        this.currentRuleSetName = this.inputRuleSetName;
        this.updateRuleSetLists();
      }
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
    if (this.currentRuleSet.isMoore) {
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
