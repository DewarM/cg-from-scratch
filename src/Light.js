// @flow
import Vector, { dot, length, subtract } from "./Vector";

export const LIGHT_TYPE: {
  AMBIANT: "AMBIANT",
  DIRECTIONAL: "DIRECTIONAL",
  POINT: "POINT",
} = {
  AMBIANT: "AMBIANT",
  DIRECTIONAL: "DIRECTIONAL",
  POINT: "POINT",
};

export type Light = PointLight | AmbiantLight | DirectionalLight;

export class PointLight {
  type: typeof LIGHT_TYPE.POINT;
  intensity: number;
  position: Vector;

  constructor({
    intensity,
    position,
  }: {|
    intensity: number,
    position: Vector,
  |}) {
    this.type = LIGHT_TYPE.POINT;
    this.intensity = intensity;
    this.position = position;
  }

  compute(point: Vector, normal: Vector) {
    const lightVector = subtract(this.position, point);
    const dotProduct = dot(normal, lightVector);
    if (dotProduct > 0) {
      return (
        (this.intensity * dotProduct) / (length(normal) * length(lightVector))
      );
    }
    return 0;
  }
}

export class DirectionalLight {
  type: typeof LIGHT_TYPE.DIRECTIONAL;
  intensity: number;
  direction: Vector;

  constructor({
    intensity,
    direction,
  }: {|
    intensity: number,
    direction: Vector,
  |}) {
    this.type = LIGHT_TYPE.DIRECTIONAL;
    this.intensity = intensity;
    this.direction = direction;
  }

  compute(point: Vector, normal: Vector) {
    const lightVector = this.direction;
    const dotProduct = dot(normal, lightVector);
    if (dotProduct > 0) {
      return (
        (this.intensity * dotProduct) / (length(normal) * length(lightVector))
      );
    }
    return 0;
  }
}

export class AmbiantLight {
  type: typeof LIGHT_TYPE.AMBIANT;
  intensity: number;

  constructor({ intensity }: {| intensity: number |}) {
    this.type = LIGHT_TYPE.AMBIANT;
    this.intensity = intensity;
  }

  compute(_point: Vector, _normal: Vector) {
    return this.intensity;
  }
}
