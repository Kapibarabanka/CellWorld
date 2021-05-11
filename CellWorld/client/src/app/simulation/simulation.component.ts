import { BlockRuleModel } from './../rules/rule-models/block-rule-model';
import { ConstantRules } from './../constants/constant-rules';
import { SimulationType } from './../constants/simulation-type';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class SimulationComponent implements OnInit, OnDestroy{

  public static GridId = "sketch-holder";
  public get GridId() {
    return SimulationComponent.GridId;
  }

  public cellGrid: CellGrid;
  public needsToStop = new Subject<true>();
  public needsToSimulate = new Subject<true>();
  public startLayer: Array<Array<number>>;
  public rulesToSimulate: Array<RuleRequest>;
  public simType: SimulationType = SimulationType.Moore;

  simulation: Array<Array<Array<number>>> = [];

  speed: number = 40;
  size: number = 150;
  stepsPerRequest = 50;

  constructor(private dataService: DataService) {
    this.needsToSimulate.subscribe(() => {
      this.simulate(
        this.dataService.fetchSimulationResults(
          this.startLayer,
          this.rulesToSimulate,
          this.stepsPerRequest,
          this.simType
        )
      );
    });
  }

  public ngOnInit() {
    if (!this.cellGrid) {
      this.cellGrid = new CellGrid();
    }
  }

  ngOnDestroy(): void {
    this.cellGrid.remove();
  }

  public changeState() {
    this.cellGrid.currentState = this.cellGrid.currentState == 0 ? 1 : 0;
  }

  public simulate126() {
    this.startSimulation(ConstantRules.Rule126, SimulationType.Moore);
  }

  public simulateLife() {
    this.startSimulation(ConstantRules.RuleLife, SimulationType.Moore);
  }

  public simulateHpp() {
    this.startSimulation(ConstantRules.HppGasRule, SimulationType.Block);
  }

  public stopSimulation() {
    this.needsToStop.next(true);
  }

  private startSimulation(rules: Array<RuleRequest>, simType: SimulationType) {
    this.simulation = [];
    this.rulesToSimulate = rules;
    this.simType = simType;
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
