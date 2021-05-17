import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rules-editor',
  templateUrl: './rules-editor.component.html',
  styleUrls: ['./rules-editor.component.css']
})
export class RulesEditorComponent implements OnInit {

  public currentRule: string = "life"

  constructor() { }

  ngOnInit(): void {
  }

  public selectLife(){
    this.currentRule = "life"
  }

  public select126(){
    this.currentRule = "126"
  }

  public selectHpp(){
    this.currentRule = "hpp"
  }

}
