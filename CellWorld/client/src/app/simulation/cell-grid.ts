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

  constructor(sketch = p=>{ }) {
    super(sketch);
  }

  setup(){
    this.id = "sketch-holder";
    this.currentState = 1;
    this.cellSize = 5;
    this.colorMap = [
        'white',
        'black'
      ];

      let width = this.windowWidth - 300;
      let height = this.windowHeight - 120;

      this.gridWidth = Math.floor(width / this.cellSize / 2) * 2;
      this.gridHeight = Math.floor(height / this.cellSize / 2) * 2;
      this.gridWidth = this.gridHeight;

      this.currentLayer = this.getEmptyMatrix(this.gridWidth, this.gridHeight);
      let canvas = this.createCanvas(this.gridWidth * this.cellSize, this.gridHeight * this.cellSize);
      canvas.parent(this.id);
  }

  draw(){
    this.drawBackground()
      if (!!this.currentLayer) {
        for (var i = 0; i < this.gridHeight; i++) {
          for (var j = 0; j < this.gridWidth; j++) {
            this.drawCell(i, j)
          }
        }
      }
  }

  mouseClicked(){
    if (this.mouseX <= this.width && this.mouseX >= 0 && this.mouseY <= this.height && this.mouseY >= 0) {
      this.setCell(this.mouseX, this.mouseY)
    }
    return false;
  }

  mouseDragged(){
    if (this.mouseX <= this.width && this.mouseX >= 0 && this.mouseY <= this.height && this.mouseY >= 0) {
      this.setCell(this.mouseX, this.mouseY)
    }
    return false;
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
