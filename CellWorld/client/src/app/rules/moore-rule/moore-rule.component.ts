import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MooreRuleModel } from './moore-rule-model';

@Component({
  selector: 'moore-rule',
  templateUrl: './moore-rule.component.html',
  styleUrls: ['./moore-rule.component.css']
})
export class MooreRuleComponent implements OnInit {
  @Input() rule: MooreRuleModel;
  @Input() state: number;
  @Output() ruleOutput = new EventEmitter<MooreRuleModel>();
  @Output() toDelete = new EventEmitter<boolean>();

  constructor() {

  }

  ngOnInit(): void {
  }

}
