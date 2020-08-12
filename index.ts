import GUI from "./src/GUI";
import Canvas from "./src/Canvas";
import SceneBuilder from "./src/Scene";
import Sphere from "./src/Sphere";
import Material from "./src/Material";
import { RED, BLUE, GREEN, YELLOW } from "./src/Colour";
import Tracer from "./src/Tracer";
import Vector from "./src/Vector";
import { AmbiantLight, PointLight, DirectionalLight } from "./src/Light";

const origin = Vector.fromArray([0, 0, 0]); // camera origin
const canvas = new Canvas();

const redSphere = new Sphere({
  center: Vector.fromArray([0, -1, 3]),
  radius: 1,
  material: new Material({
    colour: RED,
    specular: 500,
  }),
});

const blueSphere = new Sphere({
  center: Vector.fromArray([2, 0, 4]),
  radius: 1,
  material: new Material({
    colour: BLUE,
    specular: 500,
  }),
});

const greenSphere = new Sphere({
  center: Vector.fromArray([-2, 0, 4]),
  radius: 1,
  material: new Material({
    colour: GREEN,
    specular: 10,
  }),
});

const yellowSphere = new Sphere({
  center: Vector.fromArray([-0, -5001, 0]),
  radius: 5000,
  material: new Material({
    colour: YELLOW,
    specular: 1000,
  }),
});

const light1 = new AmbiantLight({
  intensity: 0.2,
});

const light2 = new PointLight({
  intensity: 0.6,
  position: Vector.fromArray([2, 1, 0]),
});

const light3 = new DirectionalLight({
  intensity: 0.2,
  direction: Vector.fromArray([1, 4, 4]),
});

const scene = new SceneBuilder()
  .setSpheres([redSphere, blueSphere, greenSphere, yellowSphere])
  .setLights([light1, light2, light3])
  .build();

const tracer = new Tracer(origin, scene, canvas);
tracer.trace();

const gui = new GUI(scene, tracer);
gui.initalize();
