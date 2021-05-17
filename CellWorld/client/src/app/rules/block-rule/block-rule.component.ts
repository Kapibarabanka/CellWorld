import { BlockRuleModel } from './block-rule-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'block-rule',
  templateUrl: './block-rule.component.html',
  styleUrls: ['./block-rule.component.css']
})
export class BlockRuleComponent implements OnInit {
  @Input() rule: BlockRuleModel;
  
  constructor() { }

  ngOnInit(): void {
  }

}
