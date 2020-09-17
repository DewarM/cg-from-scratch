import Vector from "./Vector";
import Material from "./Material";

export default class Sphere {
  center: Vector;
  radius: number;
  material: Material;

  constructor({
    center,
    radius,
    material,
  }: {
    center: Vector;
    radius: number;
    material: Material;
  }) {
    this.center = center;
    this.radius = radius;
    this.material = material;
  }
}
