import { SimulationComponent } from './simulation.component';
import * as p5 from "p5";

export class CellGrid extends p5 {
  public id: string;
  public colorMap = [
    'white',
    'black'
  ]
  public currentState = 1;
  public cellSize = 5;
  public gridWidth: number;
  public gridHeight: number;
  public currentLayer: Array<Array<number>>;

  constructor() {
    super(CellGrid.sketch);
  }

  static sketch(c: CellGrid) {
    c.setup = () => {

      c.id = "sketch-holder";
      c.currentState = 1;
      c.cellSize = 5;
      c.colorMap = [
        'white',
        'black'
      ];

      let width = c.windowWidth - 300;
      let height = c.windowHeight - 120;

      c.gridWidth = Math.floor(width / c.cellSize / 2) * 2;
      c.gridHeight = Math.floor(height / c.cellSize / 2) * 2;
      c.gridWidth = c.gridHeight;

      c.currentLayer = c.getEmptyMatrix(c.gridWidth, c.gridHeight);
      let canvas = c.createCanvas(c.gridWidth * c.cellSize, c.gridHeight * c.cellSize);
      canvas.parent(c.id);
    };
    
    c.draw = () => {
      c.drawBackground()
      if (!!c.currentLayer) {
        for (var i = 0; i < c.gridHeight; i++) {
          for (var j = 0; j < c.gridWidth; j++) {
            c.drawCell(i, j)
          }
        }
      }
      
    };

    c.mouseClicked = () => {
      if (c.mouseX <= c.width && c.mouseX >= 0 && c.mouseY <= c.height && c.mouseY >= 0) {
        c.setCell(c.mouseX, c.mouseY)
      }
      return false;
    }

    c.mouseDragged = () => {
      if (c.mouseX <= c.width && c.mouseX >= 0 && c.mouseY <= c.height && c.mouseY >= 0) {
        c.setCell(c.mouseX, c.mouseY)
      }
      return false;
    }
  }

  public clearGrid(){
    for (var i = 0; i < this.gridHeight; i++) {
      for (var j = 0; j < this.gridWidth; j++) {
        this.currentLayer[i][j] = 0;
      }
    }
  }

  public fillWithStatic(){
    for (var i = 0; i < this.gridHeight; i++) {
      for (var j = 0; j < this.gridWidth; j++) {
        this.currentLayer[i][j] = this.floor(this.random() * 2);
      }
    }
  }

  public getEmptyMatrix(width: number, height: number): Array<Array<number>> {
    const res = [];
    for (var i = 0; i < height; i++) {
      res[i] = [];
      for (var j = 0; j < width; j++) {
        res[i][j] = 0;
      }
    }

    return res;
  }

  private drawBackground(){
    this.background(255);
    this.stroke('black');
    this.noFill();
    this.rect(0, 0, this.width, this.height)
    this.stroke('#b3b3b3');
      for (var i = 0; i < this.gridHeight; i++) {
        this.line(0, i*this.cellSize, this.gridWidth * this.cellSize, i*this.cellSize)
      }
      for (var j = 0; j < this.gridWidth; j++) {
        this.line(j*this.cellSize, 0, j*this.cellSize, this.gridHeight *this.cellSize)
      }
  }

  private setCell(mouseX: number, mouseY: number) {
    const x = Math.floor(mouseX / this.cellSize);
    const y = Math.floor(mouseY / this.cellSize);
    this.currentLayer[y][x] = this.currentState;
  }

  private drawCell(i: number, j: number){
    const val = this.currentLayer[i][j]
    if (val != 0) {
      const cellColor = this.colorMap[this.currentLayer[i][j]]
    this.fill(cellColor)
    const x = j * this.cellSize;
    const y = i * this.cellSize;
    this.rect(x, y, this.cellSize, this.cellSize); 
    }
    
  }
}
