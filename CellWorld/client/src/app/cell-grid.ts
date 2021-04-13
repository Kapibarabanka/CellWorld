import * as p5 from "p5";

export class CellGrid extends p5 {
  public myColor = 0;
  private last = 0
  public rectangles = [0]
  currentLayer: Array<Array<number>> = [];

  constructor(private id: string, private size: number) {
    super(CellGrid.sketch);
    this.currentLayer = this.getEmptyMatrix(size);
  }

  static sketch(c: CellGrid) {
    c.setup = () => {
      let canvas = c.createCanvas(1000, 1000);
      canvas.parent(c.id);
      c.background(255);
    };

    c.draw = () => {
      c.fill(0);
      if (!!c.currentLayer) {
        for (var i = 0; i < c.size; i++) {
          for (var j = 0; j < c.size; j++) {
            if (c.currentLayer[i][j] == 1) {
              c.rect(j * 3, i * 3, 3, 3);
            }        
          }
        }
      }
      
    };
    // c.mouseClicked = () => {
    //   if (c.mouseX <= c.width && c.mouseX >= 0 && c.mouseY <= c.height && c.mouseY >= 0) {
    //     c.rectangles.push(c.last + 50);
    //   c.last += 50;
    //   }
    // }
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
