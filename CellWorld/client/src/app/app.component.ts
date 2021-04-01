import {Component} from '@angular/core';

@Component({
    selector: 'app',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})

export class AppComponent { 
  status: boolean = false;
  size: number = 5;
  matrix = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ]

  addColumn() {

  }

  removeColumn() {

  }

  shuffle() {

  }

  onMouseDown() {
    this.status = !this.status;
    console.log("CLICK")
    return false; // prevent text selection
  }
}