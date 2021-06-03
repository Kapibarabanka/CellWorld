import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorMap } from 'src/app/colors/color-map';
import { SumConditionModel } from '../condition-models/sum-condition-model';

@Component({
  selector: 'sum-rule',
  templateUrl: './sum-rule.component.html',
  styleUrls: ['./sum-rule.component.css']
})
export class SumRuleComponent implements OnInit {
  @Input() conditionModel: SumConditionModel;
  @Input() result: number;
  @Input() ColorMap: ColorMap;
  @Output() deleteModel = new EventEmitter<boolean>();

  public get CellsToSum(): boolean[][] {
    return [
      [this.conditionModel.CellsToSum[0], this.conditionModel.CellsToSum[1], this.conditionModel.CellsToSum[2]],
      [this.conditionModel.CellsToSum[3], this.conditionModel.CellsToSum[4], this.conditionModel.CellsToSum[5]],
      [this.conditionModel.CellsToSum[6], this.conditionModel.CellsToSum[7], this.conditionModel.CellsToSum[8]],
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

  public onChangeCellsToSum(i: number, j: number) {
    this.conditionModel.set(i, j, !this.CellsToSum[i][j]);
    return false;
  }

  public getBoolColor(state: boolean) {
    if (state) {
      return 'black'
    } else {
      return 'white'
    }
  }

  public getColor(state: number) {
    return this.ColorMap.getColor(state)
  } 

  public onDelete(){
    this.deleteModel.emit(true);
  }

}
