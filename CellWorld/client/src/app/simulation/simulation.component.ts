import { SimulationSettings } from './simulation-settings';
import { RulesService } from "./../services/rules.service";
import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, timer } from "rxjs";
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
export class SimulationComponent implements OnInit, OnDestroy, AfterViewInit {
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
  public startLayer: number[][];
  public isSimulating = false;

  public rulesNames: string[];
  public ruleToSimulate: string;

  simulationResults: number[][][] = [];

  constructor(
    private dataService: DataService,
    private rulesService: RulesService
  ) {
    this.rulesNames = rulesService.getRuleSetsNames();
    this.needsToSimulate.subscribe(() => {
      const results = this.dataService.fetchSimulationResults(this.startLayer, this.ruleToSimulate)
      results.subscribe((nextLayers: number[][][]) => {
        this.simulationResults = this.simulationResults.concat(nextLayers);
      });
    });
  }

  public ngOnInit() {
    setTimeout(() => {
      this.cellGrid = new CellGrid();
      const savedState = this.dataService.getSavedState();
      if (savedState != null && !!savedState.ruleSetName && this.rulesNames.includes(savedState.ruleSetName)) {
        this.selectRule(savedState.ruleSetName);
        if (!!savedState.matrix) {
          this.cellGrid.currentLayer = savedState.matrix;
        }
      } else {
        this.selectRule(this.rulesNames[0]);
      }
    }, 10); //to prevent filling before init
  }

  public ngAfterViewInit(): void {
    Array.from(document.getElementsByClassName("dropdown")).forEach(el => {
      el.addEventListener('shown.bs.dropdown', () => {
        this.cellGrid.brushIsActive = false;
      });
      el.addEventListener('hidden.bs.dropdown', () => {
        setTimeout(() => { this.cellGrid.brushIsActive = true; }, 10);
      });
    })
  }

  public ngOnDestroy(): void {
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
    this.simulationResults = [];
    this.isSimulating = true;
    timer(0, SimulationSettings.SpeedDelay)
      .pipe(takeUntil(this.needsToStop))
      .subscribe((x) => {
        if (!!this.simulationResults[0]) {
          this.cellGrid.currentLayer = this.simulationResults.shift();
          if (this.simulationResults.length == 30) {
            this.startLayer = this.simulationResults.pop();
            this.needsToSimulate.next(true);
          }
        }
      });
    this.startLayer = this.cellGrid.currentLayer;
    this.needsToSimulate.next(true);
  }
}
