import { Component } from "@angular/core";

@Component({
  selector: "app",
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html",
})

export class AppComponent {
  state: number = 1;
  isMouseDown: boolean = false;
  size: number = 5;
  matrix = []

  colors = [
    'green', // alive
    "purple" // dead
  ]

  constructor() {
    for (var i = 0; i < this.size; i++) {
      this.matrix[i] = []
      for (var j = 0; j < this.size; j++) {
        this.matrix[i][j] = 0;
      }
    }

    document.onmouseup = () => {
      console.log("global mouse up");
      this.isMouseDown = false;
    };
  }

  changeState() {
    this.state = this.state == 0 ? 1 : 0;
  }

  removeColumn() {}

  shuffle() {}

  onMouseDown(i: number, j: number) {
    this.isMouseDown = true;
    this.matrix[i][j] = this.state;
    console.log(`mouse down; i = ${i} j = ${j}`);
    return false;
  }

  onMouseOver(i: number, j: number) {
    if (this.isMouseDown) {
      this.matrix[i][j] = this.state;
      console.log(`mouse over; i = ${i} j = ${j} state = ${this.matrix[i][j].state}`);
    }
  }

  getColor(state: number) {
    if (state < this.colors.length) {
      return this.colors[state]
    }

    return this.colors[0];
  }
}
