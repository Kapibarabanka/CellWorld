import { StartConditions } from './start-conditions';
import { Component, OnInit } from '@angular/core';
import { Subject, timer, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CellGrid } from './cell-grid';
import { DataService } from '../data.service';
import { RuleRequest } from '../rules/rule-request';

@Component({
  selector: 'simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {

  public gridId = "sketch-holder";
  public cellGrid: CellGrid;
  public needsToStop = new Subject<true>();
  public needsToSimulate = new Subject<true>();
  public startLayer: Array<Array<number>>;
  public rulesToSimulate: Array<RuleRequest>;

  isMouseDown: boolean = false;
  simulation: Array<Array<Array<number>>> = [];

  colors = [
    "white", // dead
    "black", // alive
  ];

  speed: number = 40;
  size: number = 100;
  stepsPerRequest = 50;

  constructor(private dataService: DataService) {
    this.needsToSimulate.subscribe(() => {
      this.simulate(
        this.dataService.fetchSimulationResults(
          this.startLayer,
          this.rulesToSimulate,
          this.stepsPerRequest
        )
      );
    });
  }

  public ngOnInit() {
    this.cellGrid = new CellGrid(this.gridId, this.size);
  }

  public changeState() {
    this.cellGrid.currentState = this.cellGrid.currentState == 0 ? 1 : 0;
  }

  public simulate126() {
    this.startSimulation(StartConditions.Rule126);
  }

  public simulateLife() {
    this.startSimulation(StartConditions.RuleLife);
  }

  public stopSimulation() {
    this.needsToStop.next(true);
  }

  private startSimulation(rules: Array<RuleRequest>) {
    this.simulation = [];
    this.rulesToSimulate = rules;
    timer(0, this.speed)
      .pipe(takeUntil(this.needsToStop))
      .subscribe((x) => {
        if (!!this.simulation[0]) {
          this.cellGrid.currentLayer = this.simulation.shift();
          if (this.simulation.length == 30) {
            this.startLayer = this.simulation.pop();
            this.needsToSimulate.next(true);
          }
        }
      });
    this.startLayer = this.cellGrid.currentLayer;
    this.needsToSimulate.next(true);
  }

  private simulate(result: Observable<Object>) {
    result.subscribe((simulation: number[][][]) => {
      this.simulation = this.simulation.concat(simulation);
    });
  }
}
