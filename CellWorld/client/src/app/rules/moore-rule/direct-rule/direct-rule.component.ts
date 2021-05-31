import { DirectConditionModel } from './../condition-models/direct-condition-model';
import { Component, Input, OnInit } from '@angular/core';
import { ColorMap } from 'src/app/colors/color-map';

@Component({
  selector: 'direct-rule',
  templateUrl: './direct-rule.component.html',
  styleUrls: ['./direct-rule.component.css']
})
export class DirectRuleComponent implements OnInit {
  @Input() conditionModel: DirectConditionModel;
  @Input() ColorMap: ColorMap;

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
    this.conditionModel.set(i, j, this.ColorMap.currentState);
    return false;
  }

  public getColor(state: number) {
    return this.ColorMap.getColor(state)
  }

}
