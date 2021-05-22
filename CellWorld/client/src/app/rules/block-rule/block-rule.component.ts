import { BlockRuleModel } from './block-rule-model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'block-rule',
  templateUrl: './block-rule.component.html',
  styleUrls: ['./block-rule.component.css']
})
export class BlockRuleComponent implements OnInit {
  @Input() rule: BlockRuleModel;
  @Input() state: number;
  @Output() ruleOutput = new EventEmitter<BlockRuleModel>();
  
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

  colors = [
    'white', // dead
    "black" // alive
  ]

  constructor() { 
  }

  ngOnInit(): void {
  }

  public onMouseDown(i: number, j: number) {
    //this.toBlock[i][j] = this.state;
    //this.ruleOutput.emit(this.rule)
    return false;
  }

  public getColor(state: number) {
    if (state < this.colors.length) {
      return this.colors[state]
    }
    return this.colors[0];
  } 
}
