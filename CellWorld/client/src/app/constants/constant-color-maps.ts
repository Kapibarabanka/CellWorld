export class ConstantColorMaps{
  public static WhiteBlack = new Map<number, string>([
    [0, 'white'],
    [1, 'black']
  ])

  public static OptionalWhiteBlack = new Map<number, string>([
    [-1, '#ccc'],
    [0, 'white'],
    [1, 'black']
  ])
}