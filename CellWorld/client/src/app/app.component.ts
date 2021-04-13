import { DataService } from './data.service';
import { Component, ElementRef, OnInit } from "@angular/core";
import { timer } from "rxjs";
import {take} from 'rxjs/operators';  
import {CellGrid} from './cell-grid'
import { threadId } from 'worker_threads';

@Component({
  selector: "app",
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html",
  providers: [DataService]
})

export class AppComponent implements OnInit {
  public gridId = 'sketch-holder'
  private cellGrid: CellGrid;
  speed: number = 10;
  state: number = 1;
  isMouseDown: boolean = false;
  size: number = 200;
  currentLayer: Array<Array<number>> = [];
  simulation: Array<Array<Array<number>>> = [];

  colors = [
    'white', // dead
    "black" // alive
  ]

  constructor(private dataService: DataService) {
    this.currentLayer = this.getEmptyMatrix(this.size)

    document.onmouseup = () => {
      this.isMouseDown = false;
    };
  }

  ngOnInit() {
    this.cellGrid = new CellGrid(this.gridId, this.size);
  }

  changeState() {
    this.state = this.state == 0 ? 1 : 0;
  }

  simulate() {
    this.cellGrid.myColor = 0;
    //this.currentLayer = []
    const start = Date.now();
    timer(0, this.speed).pipe(
      take(this.size)).subscribe(x=>{
        
        if (this.cellGrid.myColor <= 100) {
          this.cellGrid.myColor = 255;
        } else {
          this.cellGrid.myColor -= 10;
        }
        if (this.simulation.length > 0) {
          console.log('ok'+x)
        }
        this.cellGrid.currentLayer = this.simulation[x]
        // this.currentLayer = this.simulation[x]
        // if (x == this.size - 1){
        //   console.log(`simulation time: ${Date.now() - start}`)
        // }
       });
  }

  simulate126() {
    this.dataService.simulate126(this.currentLayer)
      .subscribe((simulation: number[][][]) => {
        this.simulation = simulation
        this.simulate();
      });
  }

  onMouseDown(i: number, j: number) {
    this.isMouseDown = true;
    this.currentLayer[i][j] = this.state;
    return false;
  }

  onMouseOver(i: number, j: number) {
    if (this.isMouseDown) {
      this.currentLayer[i][j] = this.state;
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
        this.currentLayer[i][j] = 0;
      }
    }
  }

  private getEmptyMatrix(size: number): Array<Array<number>> {
    const res = [];
    for (var i = 0; i < size; i++) {
      res[i] = [];
      for (var j = 0; j < size; j++) {
        res[i][j] = 0;
      }
    }

    return res;
  }
}
