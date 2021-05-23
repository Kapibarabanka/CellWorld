import { BlockRuleModel } from './block-rule-model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ColorMap } from 'src/app/colors/color-map';

@Component({
  selector: 'block-rule',
  templateUrl: './block-rule.component.html',
  styleUrls: ['./block-rule.component.css']
})
export class BlockRuleComponent implements OnInit {
  @Input() rule: BlockRuleModel;
  @Input() colorMap: ColorMap;
  @Output() ruleOutput = new EventEmitter<BlockRuleModel>();
  @Output() toDelete = new EventEmitter<boolean>();
  
  public get FromBlock(): number[][] {
    return [
      [this.rule.FromBlock[0], this.rule.FromBlock[1]],
      [this.rule.FromBlock[2], this.rule.FromBlock[3]]
    ]
  }
  public get ToBlock(): number[][] {
    return [
      [this.rule.ToBlock[0], this.rule.ToBlock[1]],
      [this.rule.ToBlock[2], this.rule.ToBlock[3]]
    ]
  }

  constructor() { 
  }

  ngOnInit(): void {
  }

  public onChangeToBlock(i: number, j: number) {
    this.rule.setTo(i, j, this.colorMap.currentState);
    this.ruleOutput.emit(this.rule)
    return false;
  }

  public onChangeFromBlock(i: number, j: number) {
    this.rule.setFrom(i, j, this.colorMap.currentState);
    this.ruleOutput.emit(this.rule)
    return false;
  }

  public getColor(state: number) {
    return this.colorMap.getColor(state)
  } 

  public onDelete(){
    this.toDelete.emit(true);
  }
}
