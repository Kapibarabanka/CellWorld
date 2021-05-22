import { BlockRuleModel } from './block-rule-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'block-rule',
  templateUrl: './block-rule.component.html',
  styleUrls: ['./block-rule.component.css']
})
export class BlockRuleComponent implements OnInit {
  @Input() rule: BlockRuleModel;
  
  public fromBlock: number[][] = []
  public toBlock: number[][] = []

  colors = [
    'white', // dead
    "black" // alive
  ]

  constructor() { 
  }

  ngOnInit(): void {
    this.fromBlock = [
      [this.rule.FromBlock[0], this.rule.FromBlock[1]],
      [this.rule.FromBlock[2], this.rule.FromBlock[3]]
    ]
    this.toBlock = [
      [this.rule.ToBlock[0], this.rule.ToBlock[1]],
      [this.rule.ToBlock[2], this.rule.ToBlock[3]]
    ]
  }

  public onMouseDown(i: number, j: number) {
    // this.toBlock[i][j] = this.state;
    // return false;
  }

  public getColor(state: number) {
    if (state < this.colors.length) {
      return this.colors[state]
    }
    return this.colors[0];
  } 
}
