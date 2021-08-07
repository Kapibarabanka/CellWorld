import { ColorMap } from './../../colors/color-map';
import { BlockRuleModel } from './../../rules/block-rule/block-rule-model';
import { Component, Input } from '@angular/core';
import { BlockRulesSet } from 'src/app/rules/block-rule/block-rules-set';

@Component({
  selector: 'block-editor',
  templateUrl: './block-editor.component.html',
  styleUrls: ['./block-editor.component.css']
})
export class BlockEditorComponent {
  @Input() RulesSet: BlockRulesSet;
  
  public get ColorMap(): ColorMap {
    return this.RulesSet.ColorMap;
  };
  public get RuleModels(): BlockRuleModel[]{
    return this.RulesSet.Rules;
  }

  public changeState() {
    this.ColorMap.toggleState();
  }

  public deleteRule(idx: number){
    this.RuleModels.splice(idx, 1);
  }

  public addRule(){
    this.RuleModels.push(new BlockRuleModel())
  }
}
