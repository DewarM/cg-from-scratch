import Vector, { dot, length, subtract, multiplyByScalar } from "./Vector";

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
export enum LightKind {
  AMBIANT = "AMBIANT",
  DIRECTIONAL = "DIRECTIONAL",
  POINT = "POINT",
}

export interface Light {
  kind: LightKind;
  intensity: number;
  compute(
    point: Vector,
    normal: Vector,
    cameraDirection: Vector,
    specular: number
  ): number;
}

export class PointLight implements Light {
  kind: LightKind.POINT;
  intensity: number;
  position: Vector;

  constructor({
    intensity,
    position,
  }: {
    intensity: number;
    position: Vector;
  }) {
    this.kind = LightKind.POINT;
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

export class DirectionalLight implements Light {
  kind: LightKind.DIRECTIONAL;
  intensity: number;
  direction: Vector;

  constructor({
    intensity,
    direction,
  }: {
    intensity: number;
    direction: Vector;
  }) {
    this.kind = LightKind.DIRECTIONAL;
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

export class AmbiantLight implements Light {
  kind: LightKind.AMBIANT;
  intensity: number;

  constructor({ intensity }: { intensity: number }) {
    this.kind = LightKind.AMBIANT;
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
