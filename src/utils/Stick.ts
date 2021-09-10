import Point from "./Point";
import Vector2 from "./Vector2";

export default class Stick {
  public length: number;

  constructor(public p1: Point, public p2: Point) {
    this.length = Vector2.distance(p1.pos, p2.pos);
  }
}
