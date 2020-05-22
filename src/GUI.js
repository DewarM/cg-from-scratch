// @flow
import * as dat from "dat.gui";
import flatMap from "lodash/flatMap";
import type { Scene } from "./Scene";
import Tracer from "./Tracer";

export default class GUI {
  constructor(scene: Scene, tracer: Tracer) {
    const gui = new dat.GUI();
    const controllers = flatMap(scene.spheres, (sphere, i) => {
      const folder = gui.addFolder(`Sphere ${i}`);
      folder.open();
      const radiusController = folder.add(sphere, "radius", 0, 2, 0.1);
      const colourController = folder.addColor(sphere, "colour");
      return [radiusController, colourController];
    });

    controllers.forEach((controller) => {
      controller.onFinishChange(function (value) {
        tracer.trace();
      });
    });
  }
}
