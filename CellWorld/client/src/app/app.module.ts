import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { MatButtonModule} from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http';
import { SimulationComponent } from './simulation/simulation.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule, MatButtonModule, HttpClientModule],
    declarations: [ AppComponent, SimulationComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }