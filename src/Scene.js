// @flow

import Vector from "./Vector";
import { type Colour } from "./colour";
import { RED } from "./colour";

export class Sphere {
  center: Vector;
  radius: number;
  colour: Colour;

  constructor(
    {
      center,
      radius,
      colour,
    }: {
      center: Vector,
      radius: number,
      colour: Colour,
    } = { center: Vector.fromArray([0, 0, 0]), radius: 1, colour: RED }
  ) {
    this.center = center;
    this.radius = radius;
    this.colour = colour;
  }
}

export type Scene = {
  spheres: Array<Sphere>,
};

export default class SceneBuilder {
  spheres: Array<Sphere>;
  constructor() {
    this.spheres = [];
    return this;
  }
  setSpheres(spheres: Array<Sphere>) {
    this.spheres = spheres;
    return this;
  }
  addSphere(sphere: Sphere) {
    this.spheres.push(sphere);
    return this;
  }
  build(): Scene {
    return {
      spheres: this.spheres,
    };
  }
}
