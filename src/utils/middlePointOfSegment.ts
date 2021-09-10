import Point from "./Point";
import Vector2 from "./Vector2";

export default function getMiddlePoint(p1: Point, p2: Point): Vector2 {
  const dx = p2.pos.x - p1.pos.x;
  const dy = p2.pos.y - p2.pos.y;

  return new Vector2(p1.pos.x + dx / 2, p1.pos.y + dy / 2);
}
