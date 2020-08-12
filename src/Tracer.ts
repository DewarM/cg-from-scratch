import range from "lodash/range";

import { Scene } from "./Scene";
import Sphere from "./Sphere";
import Canvas from "./Canvas";
import Vector, {
  dot,
  subtract,
  multiplyByScalar,
  length,
  normalise,
  add,
} from "./Vector";
import Colour, { WHITE } from "./Colour";

export default class Tracer {
  scene: Scene;
  canvas: Canvas;
  origin: Vector;

  constructor(origin: Vector, scene: Scene, canvas: Canvas) {
    this.scene = scene;
    this.canvas = canvas;
    this.origin = origin;
  }

  canvasToViewport(x: number, y: number) {
    const d = 1;
    const viewport = [1, 1];
    const [viewportW, viewportH] = viewport;
    return Vector.fromArray([
      (x * viewportW) / this.canvas.width,
      (y * viewportH) / this.canvas.height,
      d,
    ]);
  }

  trace() {
    for (const x of range(-this.canvas.width / 2, this.canvas.width / 2)) {
      for (const y of range(-this.canvas.height / 2, this.canvas.height / 2)) {
        const rayDirection = this.canvasToViewport(x, y);
        const colour = this.traceRay(rayDirection, 1, Infinity);
        this.canvas.putPixel(x, y, colour);
      }
    }
    // paint generated image to canvas
    this.canvas.putImageData(0, 0);
  }

  // t represents the values of the intersection solution
  // finds the colour for a given ray
  traceRay(rayDirection: Vector, Tmin: number, Tmax: number) {
    let closestT = Infinity;
    let closestSphere = null;

    for (const sphere of this.scene.spheres) {
      const [t1, t2] = intersectRaySphere(this.origin, rayDirection, sphere);

      if (t1 > Tmin && t1 < Tmax && t1 < closestT) {
        closestT = t1;
        closestSphere = sphere;
      }

      if (t2 > Tmin && t2 < Tmax && t2 < closestT) {
        closestT = t2;
        closestSphere = sphere;
      }
    }

    if (closestSphere == null) {
      return WHITE;
    }
    const point = add(this.origin, multiplyByScalar(rayDirection, closestT)); // Compute intersection
    let normal = normalise(subtract(point, closestSphere.center)); // Compute sphere normal at intersection
    return Colour.fromVector(
      multiplyByScalar(
        Colour.toVector(closestSphere.material.colour),
        this.computeLightening(
          point,
          normal,
          multiplyByScalar(rayDirection, -1),
          closestSphere.material.specular
        )
      )
    );
  }

  computeLightening(
    point: Vector,
    normal: Vector,
    cameraDirection: Vector,
    specular: number
  ) {
    let totalIntensity = 0;
    for (const light of this.scene.lights) {
      totalIntensity += light.compute(point, normal, cameraDirection, specular);
    }
    return totalIntensity;
  }
}

// solves the ray sphere intersection
function intersectRaySphere(
  origin: Vector,
  rayDirection: Vector,
  sphere: Sphere
) {
  const C = sphere.center;
  const r = sphere.radius;
  const oc = subtract(origin, C);

  const k1 = dot(rayDirection, rayDirection);
  const k2 = 2 * dot(oc, rayDirection);
  const k3 = dot(oc, oc) - r * r;

  const discriminant = k2 * k2 - 4 * k1 * k3;
  if (discriminant < 0) {
    return [Infinity, Infinity];
  }

  const t1 = (-k2 + Math.sqrt(discriminant)) / (2 * k1);
  const t2 = (-k2 - Math.sqrt(discriminant)) / (2 * k1);
  return [t1, t2];
}
