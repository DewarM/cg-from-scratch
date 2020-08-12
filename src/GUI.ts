// @flow
import * as dat from "dat.gui";
import flatMap from "lodash/flatMap";
import { Scene } from "./Scene";
import Tracer from "./Tracer";

export default class GUI {
  scene: Scene;
  tracer: Tracer;

  constructor(scene: Scene, tracer: Tracer) {
    this.scene = scene;
    this.tracer = tracer;
  }

  initalize() {
    const gui = new dat.GUI();
    const speheres = gui.addFolder("Spheres");

    const sphereControllers = flatMap(this.scene.spheres, (sphere, i) => {
      const folder = speheres.addFolder(`Sphere ${i}`);
      const radiusController = folder.add(sphere, "radius", 0, 2, 0.1);
      const positionFolder = folder.addFolder("position");
      const materialFolder = folder.addFolder("material");
      positionFolder.open();
      materialFolder.open();
      const colourFolder = materialFolder.addFolder("colour");

      const xController = positionFolder.add(sphere.center, "x", -5, 5, 1);
      const yController = positionFolder.add(sphere.center, "y", -5, 5, 1);
      const zController = positionFolder.add(sphere.center, "z", -5, 5, 1);

      const specularController = materialFolder.add(
        sphere.material,
        "specular",
        0,
        1000
      );

      const redController = colourFolder.add(
        sphere.material.colour,
        "red",
        0,
        255
      );
      const greenController = colourFolder.add(
        sphere.material.colour,
        "green",
        0,
        255
      );
      const blueController = colourFolder.add(
        sphere.material.colour,
        "blue",
        0,
        255
      );

      return [
        specularController,
        radiusController,
        redController,
        greenController,
        blueController,
        xController,
        yController,
        zController,
      ];
    });

    const lights = gui.addFolder("Lights");
    const lightControllers = flatMap(this.scene.lights, (light, i) => {
      const folder = lights.addFolder(`${light.kind} ${i}`);
      const intensity = folder.add(light, "intensity", 0, 1);
      return [intensity];
    });

    sphereControllers.concat(lightControllers).forEach((controller) => {
      controller.onFinishChange((value) => {
        this.tracer.trace();
      });
    });
  }
}
