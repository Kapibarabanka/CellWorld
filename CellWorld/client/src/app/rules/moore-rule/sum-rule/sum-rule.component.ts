import { Component, Input } from '@angular/core';
import { ColorMap } from 'src/app/colors/color-map';
import { SumConditionModel } from '../condition-models/sum-condition-model';

@Component({
  selector: 'sum-rule',
  templateUrl: './sum-rule.component.html',
  styleUrls: ['./sum-rule.component.css']
})
export class SumRuleComponent {
  @Input() conditionModel: SumConditionModel;
  @Input() result: number;
  @Input() ColorMap: ColorMap;

  public get CellsToSum(): boolean[][] {
    return [
      [this.conditionModel.CellsToSum[0], this.conditionModel.CellsToSum[1], this.conditionModel.CellsToSum[2]],
      [this.conditionModel.CellsToSum[3], this.conditionModel.CellsToSum[4], this.conditionModel.CellsToSum[5]],
      [this.conditionModel.CellsToSum[6], this.conditionModel.CellsToSum[7], this.conditionModel.CellsToSum[8]],
    ]
  }

  public onChangeCellsToSum(i: number, j: number) {
    this.conditionModel.set(i, j, !this.CellsToSum[i][j]);
    return false;
  }

  public getColor(state: number) {
    return this.ColorMap.getColor(state)
  }

}
