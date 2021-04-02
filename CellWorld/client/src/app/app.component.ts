import { Matrix } from './Matrix';
import { Component } from "@angular/core";
import { timer } from "rxjs";
import {take} from 'rxjs/operators';  

@Component({
  selector: "app",
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html",
})

export class AppComponent {
  speed: number = 10;
  state: number = 1;
  isMouseDown: boolean = false;
  size: number = 40;
  currentLayer: Matrix;
  simulation: Array<Matrix>;

  colors = [
    'white', // dead
    "black" // alive
  ]

  constructor() {
    this.currentLayer = new Matrix(this.size);
    document.onmouseup = () => {
      this.isMouseDown = false;
    };
  }

  changeState() {
    this.state = this.state == 0 ? 1 : 0;
  }

  simulate() {
    this.simulation = [];
    for (var i = 0; i < this.size; i++){
      let newLayer = new Matrix(this.size);
      newLayer.matrix[i][i] = 1;
      this.simulation[i] = newLayer;
    }
    const start = Date.now();
    timer(0, this.speed).pipe(
      take(this.size)).subscribe(x=>{
        this.currentLayer = this.simulation[x]
        if (x == this.size - 1){
          console.log(`simulation time: ${Date.now() - start}`)
        }
       });
  }

  onMouseDown(i: number, j: number) {
    this.isMouseDown = true;
    this.currentLayer.matrix[i][j] = this.state;
    return false;
  }

  onMouseOver(i: number, j: number) {
    if (this.isMouseDown) {
      this.currentLayer.matrix[i][j] = this.state;
    }
  }

  getColor(state: number) {
    if (state < this.colors.length) {
      return this.colors[state]
    }

    return this.colors[0];
  }

  clear(){
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        this.currentLayer.matrix[i][j] = 0;
      }
    }
  }
}
