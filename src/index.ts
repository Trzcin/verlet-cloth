import updatePoints from './functions/updatePoints';
import render from './functions/render';
import Point from './utils/Point';
import Stick from './utils/Stick';
import Vector2 from './utils/Vector2';
import updateSticks from './functions/updateSticks';
import {
  clothX,
  iterations,
  marginX,
  marginY,
  clothY,
  cutThreshold,
} from './utils/settings';
import getMiddlePoint from './utils/middlePointOfSegment';

//mobile stuff
window.onerror = (error, url, line) => {
  alert(error + ' in ' + url + ' at ' + line?.toString());
};
window.addEventListener('contextmenu', (e) => e.preventDefault());

//setup
const canvas: HTMLCanvasElement = document.getElementById(
  'mainCanvas'
) as HTMLCanvasElement;
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
  const width = window.innerWidth - 2 * marginX;
  const height = window.innerHeight - 2 * marginY;
  const spacingX = width / clothX;
  const spacingY = height / clothY;

  for (let y = 0; y < clothY; y++) {
    for (let x = 0; x < clothX; x++) {
      const p = new Point(
        new Vector2(marginX + spacingX * x, marginY + spacingY * y),
        x % 10 == 0 && x != 0 && y == 0
      );
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

function cut(x: number, y: number) {
  for (const [i, stick] of sticks.entries()) {
    const middlePoint = getMiddlePoint(stick.p1, stick.p2);
    const dist = Vector2.distance(new Vector2(x, y), middlePoint);

    if (dist < cutThreshold) {
      sticks.splice(i, 1);
    }
  }
}

let draggedPoint: Point | undefined = undefined;
function beginDrag(x: number, y: number) {
  let minDist = Infinity;
  let minPoint: Point | undefined = undefined;
  for (const point of points) {
    const dist = Vector2.distance(new Vector2(x, y), point.pos);
    if (dist < minDist) {
      minDist = dist;
      minPoint = point;
    }
  }

  draggedPoint = minPoint;
}

function drag(x: number, y: number) {
  if (!draggedPoint) return;

  draggedPoint.pos = new Vector2(x, y);
  if (draggedPoint.isLocked) {
    draggedPoint.oldPos = new Vector2(x, y);
  }
}

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const touch = e.changedTouches[0];
  cut(touch.pageX, touch.pageY);
});

canvas.addEventListener('mousedown', (e) => {
  if (e.buttons === 2) {
    e.preventDefault();
    cut(e.pageX, e.pageY);
  } else if (e.buttons === 1) {
    e.preventDefault();
    beginDrag(e.pageX, e.pageY);
  } else {
    return;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (e.buttons === 2) {
    e.preventDefault();
    cut(e.pageX, e.pageY);
  } else if (e.buttons === 1) {
    e.preventDefault();
    drag(e.pageX, e.pageY);
  } else return;
});

canvas.addEventListener('mouseup', (e) => {
  if (e.buttons === 2) {
    e.preventDefault();
    cut(e.pageX, e.pageY);
  } else if (e.buttons === 1) {
    e.preventDefault();
    draggedPoint = undefined;
  } else return;
});
