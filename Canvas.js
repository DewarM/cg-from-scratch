// @flow

export type Colour = [number, number, number];

const getColorIndicesForCoord = (x, y, width) => {
  const red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
};

class Canvas {
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  imageData: ImageData;

  constructor() {
    const canvas = document.querySelector("canvas");
    if (canvas === null) {
      throw new Error("Canvas: Canvas not found.");
    }
    const canvasContext = canvas.getContext("2d");
    const imageData = canvasContext.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    this.canvas = canvas;
    this.canvasContext = canvasContext;
    this.imageData = imageData;
  }

  putPixel(x: number, y: number, colour: Colour) {
    x = this.canvas.width / 2 + x;
    y = this.canvas.height / 2 - y - 1;

    if (x < 0 || x >= this.canvas.width || y < 0 || y >= this.canvas.height) {
      return;
    }
    const colorIndices = getColorIndicesForCoord(x, y, this.canvas.width);
    const [redIndex, greenIndex, blueIndex, alphaIndex] = colorIndices;
    this.imageData.data[redIndex] = colour[0];
    this.imageData.data[greenIndex] = colour[1];
    this.imageData.data[blueIndex] = colour[2];
    this.imageData.data[alphaIndex] = 255;
  }

  putImageData(x: number, y: number) {
    this.canvasContext.putImageData(this.imageData, x, y);
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }
}

export default Canvas;
