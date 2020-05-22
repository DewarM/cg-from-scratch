// @flow

import Canvas from "./src/Canvas";

import SceneBuilder, { Sphere } from "./src/Scene";
import { RED, BLUE, GREEN } from "./src/colour";
import Tracer from "./src/Tracer";

const origin = [0, 0, 0]; // camera origin
const canvas = new Canvas();
const scene = new SceneBuilder()
  .setSpheres([
    new Sphere({
      center: [0, -1, 3],
      radius: 1,
      colour: RED,
    }),
    new Sphere({
      center: [2, 0, 4],
      radius: 1,
      colour: BLUE,
    }),
    new Sphere({
      center: [-2, 0, 4],
      radius: 1,
      colour: GREEN,
    }),
  ])
  .build();

const tracer = new Tracer(origin, scene, canvas);

tracer.trace();
