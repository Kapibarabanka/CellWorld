import { RulesService } from "./../services/rules.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, timer, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CellGrid } from "./cell-grid";
import { DataService } from "../services/data.service";
import { ColorMap } from "../colors/color-map";
import { SavedState } from "../services/saved-state";

@Component({
  selector: "simulation",
  templateUrl: "./simulation.component.html",
  styleUrls: ["./simulation.component.css"],
})
export class SimulationComponent implements OnInit, OnDestroy {
  public static GridId = "sketch-holder";
  public get GridId() {
    return SimulationComponent.GridId;
  }

  public cellGrid: CellGrid;
  public get GridColorMap() {
    if (!!this.cellGrid) {
      return this.cellGrid.ColorMap;
    }
    return new ColorMap();
  }
  public needsToStop = new Subject<true>();
  public needsToSimulate = new Subject<true>();
  public startLayer: Array<Array<number>>;
  public isSimulating = false;

  public rulesNames: string[];
  public ruleToSimulate: string;

  simulation: Array<Array<Array<number>>> = [];

  speed: number = 200;
  stepsPerRequest = 50;

  constructor(
    private dataService: DataService,
    private rulesService: RulesService
  ) {
    this.rulesNames = rulesService.getRuleSetsNames();
    this.needsToSimulate.subscribe(() => {
      this.simulate(
        this.dataService.fetchSimulationResults(
          this.startLayer,
          this.ruleToSimulate,
          this.stepsPerRequest
        )
      );
    });
  }

  public ngOnInit() {
    if (!this.cellGrid) {
      setTimeout(() => {
        this.cellGrid = new CellGrid();
        const savedState = this.dataService.getSavedState();
        if (
          savedState != null &&
          !!savedState.ruleSetName &&
          this.rulesNames.includes(savedState.ruleSetName)
        ) {
          this.selectRule(savedState.ruleSetName);
          if (!!savedState.matrix) {
            this.cellGrid.currentLayer = savedState.matrix;
          }
        } else {
          this.selectRule(this.rulesNames[0]);
        }
      }, 10); //to prevent filling before init
    }
  }

  ngOnDestroy(): void {
    this.dataService.saveState(
      new SavedState(this.cellGrid.currentLayer, this.ruleToSimulate)
    );
    this.cellGrid.remove();
  }

  public selectState(state: number) {
    this.cellGrid.ColorMap.currentState = state;
  }

  public selectRule(rule: string) {
    this.ruleToSimulate = rule;
    this.cellGrid.ColorMap = this.rulesService.getRuleSetColorMap(rule);
  }

  public stopSimulation() {
    this.isSimulating = false;
    this.needsToStop.next(true);
  }

  public startSimulation() {
    this.simulation = [];
    this.isSimulating = true;
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
