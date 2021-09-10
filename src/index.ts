import updatePoints from "./functions/updatePoints";
import render from "./functions/render";
import Point from "./utils/Point";
import Stick from "./utils/Stick";
import Vector2 from "./utils/Vector2";
import updateSticks from "./functions/updateSticks";
import {clothX, iterations, marginX, marginY, clothY, cutThreshold} from "./utils/settings";
import getMiddlePoint from "./utils/middlePointOfSegment";

//mobile stuff
window.onerror = (error, url, line) => {
  alert(error + " in " + url + " at " + line?.toString());
};

//setup
const canvas: HTMLCanvasElement =
  document.getElementById('mainCanvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d')!;

//data
const points: Point[] = [];
const sticks: Stick[] = [];

generateCloth();

function update() {
  updatePoints(points);
  for (let i = 0; i < iterations; i++) {
    updateSticks(sticks);
  }

  clearCanvas();
  render(ctx, points, sticks);
  requestAnimationFrame(update);
}
update();

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function generateCloth() {
  const width = window.innerWidth - (2 * marginX);
  const height = window.innerHeight - (2 * marginY);
  const spacingX = width / clothX;
  const spacingY = height / clothY;

  for (let y = 0; y < clothY; y++) {
    for (let x = 0; x < clothX; x++) {
      const p = new Point(new Vector2(marginX + spacingX * x, marginY + spacingY * y), x % 10 == 0 && x != 0 && y == 0);
      points.push(p);

      if (x > 0) {
        sticks.push(new Stick(p, points[y * clothX + x - 1]));
      }
      if (y > 0) {
        sticks.push(new Stick(p, points[y * clothX + x - clothX]));
      }
    }
  }
}

function cut(e: TouchEvent) {
  e.preventDefault();
  const touch = e.changedTouches[0];
  const x = touch.pageX;
  const y = touch.pageY;

  for (const [i, stick] of sticks.entries()) {
    const middlePoint = getMiddlePoint(stick.p1, stick.p2);
    const dist = Vector2.distance(new Vector2(x, y), middlePoint);

    if (dist < cutThreshold) {
      sticks.splice(i, 1);
    }
  }
}

canvas.addEventListener('touchmove', cut);


