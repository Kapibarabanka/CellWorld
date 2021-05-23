import { ColorMap } from './../../colors/color-map';
import { BlockRuleModel } from './../../rules/block-rule/block-rule-model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BlockRulesSet } from 'src/app/rules/block-rule/block-rules-set';

@Component({
  selector: 'block-editor',
  templateUrl: './block-editor.component.html',
  styleUrls: ['./block-editor.component.css']
})
export class BlockEditorComponent implements OnInit {
  @Input() rulesSet: BlockRulesSet;
  @Output() saveRule = new EventEmitter<boolean>();
  
  public ColorMap: ColorMap;
  public RuleModels: BlockRuleModel[];

  constructor() { }

  ngOnInit(): void {
    this.ColorMap = this.rulesSet.ColorMap;
    this.RuleModels = this.rulesSet.Rules;
  }

  public changeState() {
    this.ColorMap.toggleState();
  }

  public save(){
    this.saveRule.emit(true);
  }

  public updateRule(idx: number, rule: BlockRuleModel){
    this.RuleModels[idx] = rule;
  }

  public deleteRule(idx: number){
    this.RuleModels.splice(idx, 1);
  }

  public addTransition(){
    this.RuleModels.push(new BlockRuleModel())
  }
}
