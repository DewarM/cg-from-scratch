// @flow
import range from "lodash/range";
import Canvas from "./Canvas";
import { dot, subtract } from "./vector";
import SceneBuilder, { Sphere } from "./Scene";

const BACKGROUND_COLOUR = [255, 255, 255];

function canvasToViewport(x, y, canvas) {
  const d = 1;
  const viewport = [1, 1];
  const [viewportW, viewportH] = viewport;
  return [(x * viewportW) / canvas.width, (y * viewportH) / canvas.height, d];
}

// solves the ray sphere intersection
function intersectRaySphere(origin, rayDirection, sphere) {
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

// t represents the values of the intersection solution
// finds the colour for a given ray
function traceRay(scene, origin, rayDirection, Tmin, Tmax) {
  let closestT = Infinity;
  let closestSphere = null;

  for (const sphere of scene.spheres) {
    const [t1, t2] = intersectRaySphere(origin, rayDirection, sphere);

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
    return BACKGROUND_COLOUR;
  }
  return closestSphere.colour;
}

const origin = [0, 0, 0]; // camera origin
const canvas = new Canvas();
const scene = new SceneBuilder()
  .setSpheres([
    new Sphere({
      center: [0, -1, 3],
      radius: 1,
      colour: [255, 0, 0], // Red
    }),
    new Sphere({
      center: [2, 0, 4],
      radius: 1,
      colour: [0, 0, 255], // Blue
    }),
    new Sphere({
      center: [-2, 0, 4],
      radius: 1,
      colour: [0, 255, 0], // Green
    }),
  ])
  .build();

for (const x of range(-canvas.width / 2, canvas.width / 2)) {
  for (const y of range(-canvas.height / 2, canvas.height / 2)) {
    const D = canvasToViewport(x, y, canvas); // direction of ray
    const colour = traceRay(scene, origin, D, 1, Infinity);
    canvas.putPixel(x, y, colour);
  }
}

// paint generated image to canvas
canvas.putImageData(0, 0);
