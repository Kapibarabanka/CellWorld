import { DataService } from './data.service';
import { Component, OnInit } from "@angular/core";
import { Observable, Subject, timer } from "rxjs";
import {takeUntil} from 'rxjs/operators';  
import {CellGrid} from './cell-grid'

@Component({
  selector: "app",
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html",
  providers: [DataService]
})

export class AppComponent implements OnInit {
  public gridId = 'sketch-holder'
  public cellGrid: CellGrid;
  public needsToStop = new Subject<true>();
  public needsToSimulateLife = new Subject<true>();
  public startLayer: Array<Array<number>>
  isMouseDown: boolean = false
  simulation: Array<Array<Array<number>>> = [];

  colors = [
    'white', // dead
    "black" // alive
  ]

  speed: number = 40;
  size: number = 100;
  stepsPerRequest = 50;

  constructor(private dataService: DataService) {
    this.needsToSimulateLife.subscribe(()=>{
      this.simulate(this.dataService.simulateLife(this.startLayer, this.stepsPerRequest))
    })
  }

  ngOnInit() {
    this.cellGrid = new CellGrid(this.gridId, this.size);
  }

  changeState() {
    this.cellGrid.currentState = this.cellGrid.currentState == 0 ? 1 : 0;
  }

  drawSimulation() {
    this.simulation = [];
    timer(0, this.speed).pipe(
      takeUntil(this.needsToStop)).subscribe(x=>{
        if (!!this.simulation[0]){
          this.cellGrid.currentLayer = this.simulation.shift();
          if (this.simulation.length == 20) {
            this.startLayer = this.simulation.pop();
            this.needsToSimulateLife.next(true);
          }
        }
       });
  }

  simulate(result: Observable<Object>) {
    result.subscribe((simulation: number[][][]) => {
      this.simulation = this.simulation.concat(simulation)
    });
  }

  simulate126() {
    this.simulate(this.dataService.simulate126(this.cellGrid.currentLayer))
  }

  simulateLife() {
    this.drawSimulation();
    this.startLayer = this.cellGrid.currentLayer
    this.needsToSimulateLife.next(true);
  }

  stopSimulation() {
    this.needsToStop.next(true);
  }
}
