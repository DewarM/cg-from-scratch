// @flow
export function dot(vec1: Vector, vec2: Vector): number {
  return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
}

export function subtract(vec1: Vector, vec2: Vector): Vector {
  return Vector.fromArray([vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z]);
}

export function add(vec1: Vector, vec2: Vector): Vector {
  return Vector.fromArray([vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z]);
}

export function length(vec: Vector): number {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
}

export function multiplyByScalar(vec: Vector, scalar: number): Vector {
  return Vector.fromArray([vec.x * scalar, vec.y * scalar, vec.z * scalar]);
}

export function divideByScalar(vec: Vector, scalar: number): Vector {
  return multiplyByScalar(vec, 1 / scalar);
}

export function normalise(vec: Vector): Vector {
  return divideByScalar(vec, length(vec));
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
