import {lockedPointColor, pointRadius, stickWidth} from "../utils/settings";
import Point from "../utils/Point";
import Stick from "../utils/Stick";

export default function render(ctx: CanvasRenderingContext2D, points: Point[], sticks: Stick[]) {
  renderSticks(ctx, sticks);
}

function renderPoints(ctx: CanvasRenderingContext2D, points: Point[]) {
  points.forEach(point => {
    if (point.isLocked) ctx.fillStyle = lockedPointColor;
    else ctx.fillStyle = 'black';

    ctx.beginPath();
    ctx.arc(point.pos.x, point.pos.y, pointRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  });
}

function renderSticks(ctx: CanvasRenderingContext2D, sticks: Stick[]) {
  ctx.lineWidth = stickWidth;

  sticks.forEach(stick => {
    ctx.beginPath();
    ctx.moveTo(stick.p1.pos.x, stick.p1.pos.y);
    ctx.lineTo(stick.p2.pos.x, stick.p2.pos.y);
    ctx.stroke();
    ctx.closePath();
  });
}



