// @flow
export function dot(vec1: Vector, vec2: Vector) {
  return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
}

export function subtract(vec1: Vector, vec2: Vector): Vector {
  return Vector.fromArray([vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z]);
}

export default class Vector {
  x: number;
  y: number;
  z: number;

  static fromArray(array: [number, number, number]) {
    const [x, y, z] = array;
    return new Vector(x, y, z);
  }

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
