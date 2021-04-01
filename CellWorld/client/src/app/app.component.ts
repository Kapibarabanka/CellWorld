import { Component } from "@angular/core";
import { timer } from "rxjs";
import {take} from 'rxjs/operators';  

@Component({
  selector: "app",
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html",
})

export class AppComponent {
  state: number = 1;
  isMouseDown: boolean = false;
  size: number = 100;
  matrix = []

  colors = [
    'white', // dead
    "black" // alive
  ]

  constructor() {
    for (var i = 0; i < this.size; i++) {
      this.matrix[i] = []
      for (var j = 0; j < this.size; j++) {
        this.matrix[i][j] = 0;
      }
    }

    document.onmouseup = () => {
      this.isMouseDown = false;
    };
  }

  changeState() {
    this.state = this.state == 0 ? 1 : 0;
  }

  simulate() {
    timer(0, 1).pipe(
      take(this.size)).subscribe(x=>{
        this.matrix[x][x] = 1;
       })
  }

  onMouseDown(i: number, j: number) {
    this.isMouseDown = true;
    this.matrix[i][j] = this.state;
    return false;
  }

  onMouseOver(i: number, j: number) {
    if (this.isMouseDown) {
      this.matrix[i][j] = this.state;
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
        this.matrix[i][j] = 0;
      }
    }
  }
}
