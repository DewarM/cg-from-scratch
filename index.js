// @flow

import GUI from "./src/GUI";
import Canvas from "./src/Canvas";
import SceneBuilder, { Sphere } from "./src/Scene";
import { RED, BLUE, GREEN } from "./src/colour";
import Tracer from "./src/Tracer";
import Vector from "./src/Vector";

const origin = Vector.fromArray([0, 0, 0]); // camera origin
const canvas = new Canvas();

const redSphere = new Sphere({
  center: Vector.fromArray([0, -1, 3]),
  radius: 1,
  colour: RED,
});

const blueSphere = new Sphere({
  center: Vector.fromArray([2, 0, 4]),
  radius: 1,
  colour: BLUE,
});

const greenSphere = new Sphere({
  center: Vector.fromArray([-2, 0, 4]),
  radius: 1,
  colour: GREEN,
});

const scene = new SceneBuilder()
  .setSpheres([redSphere, blueSphere, greenSphere])
  .build();

const tracer = new Tracer(origin, scene, canvas);
tracer.trace();

const gui = new GUI(scene, tracer);
gui.initalize();
