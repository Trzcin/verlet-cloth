import {bottomBoundary, gravity} from "../utils/settings";
import Point from "../utils/Point";
import Vector2 from "../utils/Vector2";

export default function updatePoints(points: Point[]) {
  for (const [i, point] of points.entries()) {
    if (point.pos.y > bottomBoundary) {
      points.splice(i, 1);
    }

    if (point.isLocked) continue;

    const vx = point.pos.x - point.oldPos.x;
    const vy = point.pos.y - point.oldPos.y;

    point.oldPos = new Vector2(point.pos.x, point.pos.y);
    point.pos.x += vx;
    point.pos.y += vy;

    point.pos.y += gravity;
  }
}
