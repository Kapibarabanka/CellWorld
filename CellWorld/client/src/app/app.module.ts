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

@NgModule({
    imports:      [ BrowserModule, FormsModule, MatButtonModule, HttpClientModule, AppRoutingModule],
    declarations: [ AppComponent, SimulationComponent, RulesEditorComponent, MooreRuleComponent, BlockRuleComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }