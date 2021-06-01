import { MooreRuleModel } from './../../rules/moore-rule/moore-rule-model';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MooreRulesSet } from 'src/app/rules/moore-rule/moore-rules-set';
import { ColorMap } from 'src/app/colors/color-map';

@Component({
  selector: 'moore-editor',
  templateUrl: './moore-editor.component.html',
  styleUrls: ['./moore-editor.component.css']
})
export class MooreEditorComponent implements OnInit, OnChanges {
  @Input() RulesSet: MooreRulesSet;
  @Output() saveRule = new EventEmitter<boolean>();
  
  public get ColorMap(): ColorMap {
    return this.RulesSet.ColorMap;
  };
  public get RuleModels(): MooreRuleModel[]{
    return this.RulesSet.Rules;
  }

  constructor() { }
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {   
  }

  public changeState() {
    this.ColorMap.toggleState();
  }

  public save(){
    this.saveRule.emit(true);
  }

  public updateRule(idx: number, rule: MooreRuleModel){
    this.RuleModels[idx] = rule;
  }

  public deleteRule(idx: number){
    this.RuleModels.splice(idx, 1);
  }

  public getColor(state: number) {
    return this.ColorMap.getColor(state)
  } 

  // public addTransition(){
  //   this.ruleModels.push(new BlockRuleModel())
  // }
}
