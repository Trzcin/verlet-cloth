export default class Vector2 {
  constructor(public x: number, public y: number) {}

  public static distance(v1: Vector2, v2: Vector2) {
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2))
  }
}
