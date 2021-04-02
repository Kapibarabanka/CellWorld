export class Matrix {
  public matrix: Array<Array<number>>;
  public size: number;

  constructor(size: number) {
    this.size = size;
    this.matrix = [];
    for (var i = 0; i < size; i++) {
      this.matrix[i] = [];
      for (var j = 0; j < size; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }
}
