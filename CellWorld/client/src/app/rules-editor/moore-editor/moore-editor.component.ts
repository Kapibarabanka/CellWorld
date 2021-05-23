import { MooreRuleModel } from './../../rules/moore-rule/moore-rule-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'moore-editor',
  templateUrl: './moore-editor.component.html',
  styleUrls: ['./moore-editor.component.css']
})
export class MooreEditorComponent implements OnInit {
  @Input() ruleModels: MooreRuleModel[];
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

  public updateRule(idx: number, rule: MooreRuleModel){
    this.ruleModels[idx] = rule;
  }

  public deleteRule(idx: number){
    this.ruleModels.splice(idx, 1);
  }

  // public addTransition(){
  //   this.ruleModels.push(new BlockRuleModel())
  // }
}
