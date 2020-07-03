// @flow

import Colour from "./Colour";

export default class Material {
  specular: number;
  colour: Colour;

  constructor({ colour, specular }: { colour: Colour, specular: number }) {
    this.specular = specular;
    this.colour = colour;
  }
}
