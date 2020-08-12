// @flow

import Sphere from "./Sphere";
import { Light } from "./Light";

export interface Scene {
  spheres: Array<Sphere>;
  lights: Array<Light>;
}

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
