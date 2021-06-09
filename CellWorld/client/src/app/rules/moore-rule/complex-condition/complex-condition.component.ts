import { ComplexConditionModel } from './../condition-models/complex-condition-model';
import { Component, Input, OnInit } from '@angular/core';
import { ColorMap } from 'src/app/colors/color-map';
import { ConditionModel } from '../condition-model';

@Component({
  selector: 'complex-condition',
  templateUrl: './complex-condition.component.html',
  styleUrls: ['./complex-condition.component.css']
})
export class ComplexConditionComponent implements OnInit {
  @Input() conditionModel: ComplexConditionModel;
  @Input() ColorMap: ColorMap;

  public Operators = [
    'AND',
    'OR',
    'XOR',
    'NOT'
  ]

  public get left(): ConditionModel {
    return this.conditionModel.LeftCondition
  }

  public get selectedOperator(): string {
    return this.conditionModel.Operator.toUpperCase();
  }

  public get right(): ConditionModel {
    return this.conditionModel.RightCondition
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  public selectOperator(op: string){
    this.conditionModel.Operator = op;
  }

  public addDirectRule(isLeft: boolean) {

  }

  public addSumRule(isLeft: boolean) {
    
  }

}
