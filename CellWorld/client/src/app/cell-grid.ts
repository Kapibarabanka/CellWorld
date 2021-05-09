import * as p5 from "p5";

export class CellGrid extends p5 {
  public colorMap = [
    'white',
    'black'
  ]
  public currentState = 1;
  public cellSize = 5;
  currentLayer: Array<Array<number>> = [];

  constructor(private id: string, private size: number) {
    super(CellGrid.sketch);
    this.currentLayer = this.getEmptyMatrix(size);
  }

  static sketch(c: CellGrid) {
    c.setup = () => {
      let canvas = c.createCanvas(c.windowWidth - 300, c.windowHeight - 120);
      canvas.parent(c.id);
    };
    
    c.draw = () => {
      c.drawBackground()
      if (!!c.currentLayer) {
        for (var i = 0; i < c.size; i++) {
          for (var j = 0; j < c.size; j++) {
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
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        this.currentLayer[i][j] = 0;
      }
    }
  }

  public fillWithStatic(){
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        this.currentLayer[i][j] = this.floor(this.random() * 2);
      }
    }
  }

  public getEmptyMatrix(size: number): Array<Array<number>> {
    const res = [];
    for (var i = 0; i < size; i++) {
      res[i] = [];
      for (var j = 0; j < size; j++) {
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
      for (var i = 0; i < this.size; i++) {
        this.line(0, i*this.cellSize, this.size*this.cellSize, i*this.cellSize)
      }
      for (var j = 0; j < this.size; j++) {
        this.line(j*this.cellSize, 0, j*this.cellSize,this.height)
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
