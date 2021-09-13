import Vector2 from './Vector2';

export default class Point {
  public oldPos: Vector2;

  constructor(
    public pos: Vector2,
    public isLocked?: boolean,
    public del?: boolean
  ) {
    this.oldPos = this.pos;
  }
}
