// @flow

import { type Vector } from "./vector";
import { type Colour } from "./Canvas";

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
    } = { center: [0, 0, 0], radius: 1, colour: [255, 0, 0] }
  ) {
    this.center = center;
    this.radius = radius;
    this.colour = colour;
  }
}

type Scene = {
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
