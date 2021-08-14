import { SimulationSettings } from './simulation-settings';
import { ColorMap } from "src/app/colors/color-map";
import * as p5 from "p5";

export class CellGrid extends p5 {
  public id: string;
  public ColorMap: ColorMap;
  public cellSize: number;
  public gridWidth: number;
  public gridHeight: number;
  public brushIsActive: boolean;
  public currentLayer: Array<Array<number>>;

  constructor(sketch = (p) => { }) {
    super(sketch);
  }

  setup() {
    this.brushIsActive = true;
    this.id = SimulationSettings.CanvasName;
    this.cellSize = SimulationSettings.CellSize;

    let width = this.windowWidth - SimulationSettings.WidthMargin;
    let height = this.windowHeight - SimulationSettings.HeightMargin;

    this.gridWidth = Math.floor(width / this.cellSize / 2) * 2;
    this.gridHeight = Math.floor(height / this.cellSize / 2) * 2;

    if (SimulationSettings.IsSquare) {
      this.gridWidth = this.gridHeight;
    }

    this.currentLayer = this.getEmptyMatrix(this.gridWidth, this.gridHeight);
    let canvas = this.createCanvas(
      this.gridWidth * this.cellSize,
      this.gridHeight * this.cellSize
    );
    canvas.parent(this.id);
  }

  draw() {
    this.drawBackground();
    if (!!this.currentLayer) {
      for (var i = 0; i < this.gridHeight; i++) {
        for (var j = 0; j < this.gridWidth; j++) {
          this.drawCell(i, j);
        }
      }
    }
  }

  mouseClicked() {
    if (this.brushIsActive && this.cursorInBounds()) {
      this.setCell(this.mouseX, this.mouseY);
    }
    return false;
  }

  mouseDragged() {
    if (this.brushIsActive && this.cursorInBounds()) {
      this.setCell(this.mouseX, this.mouseY);
    }
    return false;
  }

  public clearGrid() {
    for (var i = 0; i < this.gridHeight; i++) {
      for (var j = 0; j < this.gridWidth; j++) {
        this.currentLayer[i][j] = 0;
      }
    }
  }

  public fillWithStatic() {
    for (var i = 0; i < this.gridHeight; i++) {
      for (var j = 0; j < this.gridWidth; j++) {
        this.currentLayer[i][j] = this.floor(this.random() * 2);
      }
    }
  }

  public getEmptyMatrix(width: number, height: number): number[][] {
    const res = [];
    for (var i = 0; i < height; i++) {
      res[i] = [];
      for (var j = 0; j < width; j++) {
        res[i][j] = 0;
      }
    }

    return res;
  }

  private drawBackground() {
    this.background(255);
    this.stroke("black");
    this.noFill();
    this.stroke("#b3b3b3");
    for (var i = 0; i < this.gridHeight; i++) {
      this.line(
        0,
        i * this.cellSize,
        this.gridWidth * this.cellSize,
        i * this.cellSize
      );
    }
    for (var j = 0; j < this.gridWidth; j++) {
      this.line(
        j * this.cellSize,
        0,
        j * this.cellSize,
        this.gridHeight * this.cellSize
      );
    }
  }

  private setCell(mouseX: number, mouseY: number) {
    const x = Math.floor(mouseX / this.cellSize);
    const y = Math.floor(mouseY / this.cellSize);
    this.currentLayer[y][x] = this.ColorMap.currentState;
  }

  private drawCell(i: number, j: number) {
    const val = this.currentLayer[i][j];
    if (val != 0) {
      const cellColor = this.ColorMap.getColor(this.currentLayer[i][j]);
      this.fill(cellColor);
      const x = j * this.cellSize;
      const y = i * this.cellSize;
      this.rect(x, y, this.cellSize, this.cellSize);
    }
  }

  private cursorInBounds(): boolean {
    return this.mouseX <= this.width && this.mouseX >= 0 &&
      this.mouseY <= this.height && this.mouseY >= 0
  }
}
