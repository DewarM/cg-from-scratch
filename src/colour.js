// @flow
import Vector from "./Vector";

export default class Colour {
  red: number;
  green: number;
  blue: number;

  static fromArray(array: [number, number, number]) {
    const [red, green, blue] = array;
    return new Colour(red, green, blue);
  }

  static toArray(colour: Colour): [number, number, number] {
    return [colour.red, colour.green, colour.blue];
  }

  static toVector(colour: Colour): Vector {
    return Vector.fromArray([colour.red, colour.green, colour.blue]);
  }

  static fromVector(vec: Vector): Colour {
    return new Colour(vec.x, vec.y, vec.z);
  }

  constructor(red: number, green: number, blue: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
}

export const RED: Colour = Colour.fromArray([255, 0, 0]);
export const BLUE: Colour = Colour.fromArray([0, 0, 255]);
export const GREEN: Colour = Colour.fromArray([0, 255, 0]);
export const YELLOW: Colour = Colour.fromArray([255, 255, 0]);
export const WHITE: Colour = Colour.fromArray([255, 255, 255]);
