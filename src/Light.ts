// @flow
import Vector, { dot, length, subtract, multiplyByScalar } from "./Vector";

export const LIGHT_TYPE: {
  AMBIANT: "AMBIANT";
  DIRECTIONAL: "DIRECTIONAL";
  POINT: "POINT";
} = {
  AMBIANT: "AMBIANT",
  DIRECTIONAL: "DIRECTIONAL",
  POINT: "POINT",
};

export type Light = PointLight | AmbiantLight | DirectionalLight;

function diffuseLight(normal: Vector, lightVector: Vector, intensity: number) {
  const dotProduct = dot(normal, lightVector);
  if (dotProduct > 0) {
    return (intensity * dotProduct) / (length(normal) * length(lightVector));
  }
  return 0;
}

function specularLight(
  normal: Vector,
  lightVector: Vector,
  intensity: number,
  cameraDirection: Vector,
  specular: number
) {
  if (specular <= 0) return 0;
  // 2*Normal*dot(Normal, LightVector) - LightVector
  const reflection = subtract(
    multiplyByScalar(multiplyByScalar(normal, 2), dot(normal, lightVector)),
    lightVector
  );
  const dotProduct = dot(reflection, cameraDirection);
  if (dotProduct > 0) {
    return (
      intensity *
      Math.pow(
        dotProduct / (length(reflection) * length(cameraDirection)),
        specular
      )
    );
  }
  return 0;
}

export class PointLight {
  type: typeof LIGHT_TYPE.POINT;
  intensity: number;
  position: Vector;

  constructor({
    intensity,
    position,
  }: {
    intensity: number;
    position: Vector;
  }) {
    this.type = LIGHT_TYPE.POINT;
    this.intensity = intensity;
    this.position = position;
  }

  compute(
    point: Vector,
    normal: Vector,
    cameraDirection: Vector,
    specular: number
  ) {
    const lightVector = subtract(this.position, point);
    return (
      diffuseLight(normal, lightVector, this.intensity) +
      specularLight(
        normal,
        lightVector,
        this.intensity,
        cameraDirection,
        specular
      )
    );
  }
}

export class DirectionalLight {
  type: typeof LIGHT_TYPE.DIRECTIONAL;
  intensity: number;
  direction: Vector;

  constructor({
    intensity,
    direction,
  }: {
    intensity: number;
    direction: Vector;
  }) {
    this.type = LIGHT_TYPE.DIRECTIONAL;
    this.intensity = intensity;
    this.direction = direction;
  }

  compute(
    point: Vector,
    normal: Vector,
    cameraDirection: Vector,
    specular: number
  ) {
    const lightVector = this.direction;
    return (
      diffuseLight(normal, lightVector, this.intensity) +
      specularLight(
        normal,
        lightVector,
        this.intensity,
        cameraDirection,
        specular
      )
    );
  }
}

export class AmbiantLight {
  type: typeof LIGHT_TYPE.AMBIANT;
  intensity: number;

  constructor({ intensity }: { intensity: number }) {
    this.type = LIGHT_TYPE.AMBIANT;
    this.intensity = intensity;
  }

  compute(
    _point: Vector,
    _normal: Vector,
    _cameraDirection: Vector,
    _specular: number
  ) {
    return this.intensity;
  }
}
