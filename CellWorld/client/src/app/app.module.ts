import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { SimulationComponent } from "./simulation/simulation.component";
import { AppRoutingModule } from "./app-routing.module";
import { RulesEditorComponent } from "./rules-editor/rules-editor.component";
import { BlockRuleComponent } from "./rules/block-rule/block-rule.component";
import { BlockEditorComponent } from "./rules-editor/block-editor/block-editor.component";
import { MooreEditorComponent } from "./rules-editor/moore-editor/moore-editor.component";
import { DirectRuleComponent } from "./rules/moore-rule/direct-rule/direct-rule.component";
import { SumRuleComponent } from "./rules/moore-rule/sum-rule/sum-rule.component";
import { ComplexConditionComponent } from './rules/moore-rule/complex-condition/complex-condition.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    SimulationComponent,
    RulesEditorComponent,
    BlockRuleComponent,
    BlockEditorComponent,
    MooreEditorComponent,
    DirectRuleComponent,
    SumRuleComponent,
    ComplexConditionComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
