import { RulesEditorComponent } from './rules-editor/rules-editor.component';
import { SimulationComponent } from './simulation/simulation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'simulation', component: SimulationComponent },
  { path: 'rules-editor', component: RulesEditorComponent },
  { path: '', redirectTo: '/simulation', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
