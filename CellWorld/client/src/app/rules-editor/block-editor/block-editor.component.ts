import { ColorMap } from './../../colors/color-map';
import { BlockRuleModel } from './../../rules/block-rule/block-rule-model';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { BlockRulesSet } from 'src/app/rules/block-rule/block-rules-set';

@Component({
  selector: 'block-editor',
  templateUrl: './block-editor.component.html',
  styleUrls: ['./block-editor.component.css']
})
export class BlockEditorComponent implements OnInit, OnChanges {
  @Input() RulesSet: BlockRulesSet;
  
  public get ColorMap(): ColorMap {
    return this.RulesSet.ColorMap;
  };
  public get RuleModels(): BlockRuleModel[]{
    return this.RulesSet.Rules;
  }

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  public changeState() {
    this.ColorMap.toggleState();
  }

  public updateRule(idx: number, rule: BlockRuleModel){
    this.RuleModels[idx] = rule;
  }

  public deleteRule(idx: number){
    this.RuleModels.splice(idx, 1);
  }

  public addRule(){
    this.RuleModels.push(new BlockRuleModel())
  }
}
