import { MooreRuleModel } from './../moore-rule-model';
import { DirectConditionModel } from './../condition-models/direct-condition-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'direct-rule',
  templateUrl: './direct-rule.component.html',
  styleUrls: ['./direct-rule.component.css']
})
export class DirectRuleComponent implements OnInit {
  @Input() conditionModel: DirectConditionModel
  @Input() result: number
  @Input() state: number
  @Output() deleteModel = new EventEmitter<boolean>();

  colors = [
    'white', // dead
    "black" // alive
  ]

  public get Condition(): number[][] {
    return [
      [this.conditionModel.Condition[0], this.conditionModel.Condition[1], this.conditionModel.Condition[2]],
      [this.conditionModel.Condition[3], this.conditionModel.Condition[4], this.conditionModel.Condition[5]],
      [this.conditionModel.Condition[6], this.conditionModel.Condition[7], this.conditionModel.Condition[8]],
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

  public onChangeCondition(i: number, j: number) {
    this.conditionModel.set(i, j, this.state);
    return false;
  }

  public getColor(state: number) {
    if (state < this.colors.length) {
      return this.colors[state]
    }
    return this.colors[0];
  } 

  public onDelete(){
    this.deleteModel.emit(true);
  }

}
