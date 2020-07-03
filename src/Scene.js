// @flow

import Vector from "./Vector";
import Colour, { RED } from "./Colour";
import type { Light } from "./Light";

export class Sphere {
  center: Vector;
  radius: number;
  colour: Colour;
  specular: number;

  constructor(
    {
      center,
      radius,
      colour,
      specular,
    }: {
      center: Vector,
      radius: number,
      colour: Colour,
      specular: number,
    } = {
      center: Vector.fromArray([0, 0, 0]),
      radius: 1,
      colour: RED,
      specular: -1,
    }
  ) {
    this.center = center;
    this.radius = radius;
    this.colour = colour;
    this.specular = specular;
  }
}

export type Scene = {|
  spheres: Array<Sphere>,
  lights: Array<Light>,
|};

export default class SceneBuilder {
  spheres: Array<Sphere>;
  lights: Array<Light>;

  constructor() {
    this.spheres = [];
    this.lights = [];
    return this;
  }
  setSpheres(spheres: Array<Sphere>) {
    this.spheres = spheres;
    return this;
  }
  setLights(lights: Array<Light>) {
    this.lights = lights;
    return this;
  }
  addSphere(sphere: Sphere) {
    this.spheres.push(sphere);
    return this;
  }
  build(): Scene {
    return {
      spheres: this.spheres,
      lights: this.lights,
    };
  }
}
