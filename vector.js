// @flow
export type Vector = [number, number, number];

export function dot(vec1: Vector, vec2: Vector) {
  return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2];
}

export function subtract(vec1: Vector, vec2: Vector): Vector {
  return [vec1[0] - vec2[0], vec1[1] - vec2[1], vec1[2] - vec2[2]];
}
