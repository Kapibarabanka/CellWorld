import { BlockRuleModel } from './../../rules/block-rule/block-rule-model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'block-editor',
  templateUrl: './block-editor.component.html',
  styleUrls: ['./block-editor.component.css']
})
export class BlockEditorComponent implements OnInit {
  @Input() ruleModels: BlockRuleModel[];
  @Output() saveRule = new EventEmitter<boolean>();
  public currentState: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  public changeState() {
    this.currentState = this.currentState == 0 ? 1 : 0;
  }

  public save(){
    this.saveRule.emit(true);
  }

  public updateRule(idx: number, rule: BlockRuleModel){
    this.ruleModels[idx] = rule;
  }

  public deleteRule(idx: number){
    this.ruleModels.splice(idx, 1);
  }

  public addTransition(){
    this.ruleModels.push(new BlockRuleModel())
  }
}
