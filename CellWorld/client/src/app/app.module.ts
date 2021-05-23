import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { MatButtonModule} from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http';
import { SimulationComponent } from './simulation/simulation.component';
import { AppRoutingModule } from './app-routing.module';
import { RulesEditorComponent } from './rules-editor/rules-editor.component';
import { MooreRuleComponent } from './rules/moore-rule/moore-rule.component';
import { BlockRuleComponent } from './rules/block-rule/block-rule.component';
import { BlockEditorComponent } from './rules-editor/block-editor/block-editor.component';
import { MooreEditorComponent } from './rules-editor/moore-editor/moore-editor.component';
import { DirectRuleComponent } from './rules/moore-rule/direct-rule/direct-rule.component';
import { SumRuleComponent } from './rules/moore-rule/sum-rule/sum-rule.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule, MatButtonModule, HttpClientModule, AppRoutingModule],
    declarations: [ AppComponent, SimulationComponent, RulesEditorComponent, MooreRuleComponent, BlockRuleComponent, BlockEditorComponent, MooreEditorComponent, DirectRuleComponent, SumRuleComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }