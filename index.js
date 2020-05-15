import range from "lodash/range";

const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);

const scene = {
  spheres: [
    {
      center: [0, -1, 3],
      radius: 1,
      color: [255, 0, 0], // Red
    },
    {
      center: [2, 0, 4],
      radius: 1,
      color: [0, 0, 255], // Blue
    },
    {
      center: [-2, 0, 4],
      radius: 1,
      color: [0, 255, 0], // Green
    },
  ],
};

const BACKGROUND_COLOR = [255, 255, 255];

const getColorIndicesForCoord = (x, y, width) => {
  const red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
};

function putPixel(imageData, x, y, colour) {
  x = canvas.width / 2 + x;
  y = canvas.height / 2 - y - 1;

  if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
    return;
  }
  const colorIndices = getColorIndicesForCoord(x, y, canvas.width);
  const [redIndex, greenIndex, blueIndex, alphaIndex] = colorIndices;
  imageData.data[redIndex] = colour[0];
  imageData.data[greenIndex] = colour[1];
  imageData.data[blueIndex] = colour[2];
  imageData.data[alphaIndex] = 255;
}

function canvasToViewport(x, y, canvas) {
  const d = 1;
  const viewport = [1, 1];
  const [viewportW, viewportH] = viewport;
  return [(x * viewportW) / canvas.width, (y * viewportH) / canvas.height, d];
}

function dot(vec1, vec2) {
  return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2];
}

function subtract(vec1, vec2) {
  return [vec1[0] - vec2[0], vec1[1] - vec2[1], vec1[2] - vec2[2]];
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
function traceRay(origin, rayDirection, Tmin, Tmax) {
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
    return BACKGROUND_COLOR;
  }
  return closestSphere.color;
}

const origin = [0, 0, 0]; // camera origin

for (const x of range(-canvas.width / 2, canvas.width / 2)) {
  for (const y of range(-canvas.height / 2, canvas.height / 2)) {
    const D = canvasToViewport(x, y, canvas); // direction of ray
    const color = traceRay(origin, D, 1, Infinity);
    putPixel(imageData, x, y, color);
  }
}

// paint generated image to canvas
canvasContext.putImageData(imageData, 0, 0);
