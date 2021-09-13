import Vector2 from '../utils/Vector2';
import Stick from '../utils/Stick';
import { bottomBoundary } from '../utils/settings';

export default function updateSticks(sticks: Stick[]) {
  for (const [i, stick] of sticks.entries()) {
    if (
      stick.p1.del ||
      stick.p2.del ||
      (stick.p1.pos.y > bottomBoundary && stick.p2.pos.y > bottomBoundary)
    ) {
      sticks.splice(i, 1);
    }

    if (stick.p1.isLocked && stick.p2.isLocked) continue;

    const distance = Vector2.distance(stick.p1.pos, stick.p2.pos);
    const diff = stick.length - distance;
    const percent = diff / distance / 2;
    const dx = stick.p2.pos.x - stick.p1.pos.x;
    const dy = stick.p2.pos.y - stick.p1.pos.y;
    const offsetX = dx * percent;
    const offsetY = dy * percent;

    if (stick.p1.isLocked) {
      stick.p2.pos.x += offsetX * 2;
      stick.p2.pos.y += offsetY * 2;
    } else if (stick.p2.isLocked) {
      stick.p1.pos.x -= offsetX * 2;
      stick.p1.pos.y -= offsetY * 2;
    } else {
      stick.p1.pos.x -= offsetX;
      stick.p1.pos.y -= offsetY;
      stick.p2.pos.x += offsetX;
      stick.p2.pos.y += offsetY;
    }
  }
}
