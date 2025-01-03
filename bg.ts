const draw1 = (height: number, width: number, interval: number): ImageData => {
  const buf = new ArrayBuffer(width * height * 4);
  const buf8 = new Uint8ClampedArray(buf);
  const pixels = new Uint32Array(buf);

  const center = { x: width / 2, y: height / 2 };
  const maxDist = Math.sqrt(center.x ** 2 + center.y ** 2);
  const amp = 0.2;
  const half_P = height / 12;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dist = Math.sqrt((x - center.x) ** 2 + (y - center.y) ** 2);

      const dist_offset_1 = (amp / half_P) * (half_P - Math.abs(y % (2 * half_P) - half_P));
      const ratio = (dist / maxDist - interval + dist_offset_1 + 1) % 1;
      const i = y * width + x;
      pixels[i] = hslToRgb(ratio, 0.8, Math.max(0, 0.9 - dist / maxDist));
    }
  }

  return new ImageData(buf8, width, height);
};

const draw2 = (height: number, width: number, interval: number): ImageData => {
  const buf = new ArrayBuffer(width * height * 4);
  const buf8 = new Uint8ClampedArray(buf);
  const pixels = new Uint32Array(buf);

  const center = { x: width / 2, y: height / 2 };
  const maxDist = Math.sqrt(center.x ** 2 + center.y ** 2);
  const amp = 0.2;
  const half_P = Math.PI / 12;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dist = Math.sqrt((x - center.x) ** 2 + (y - center.y) ** 2) / maxDist;
      let angle = Math.atan2(y - center.y, x - center.x); 
      if (angle < 0) {
        angle += 2 * Math.PI;
      }
      angle = (angle + ((dist / 2)) * 2 * Math.PI) % (2 * Math.PI);
      const dist_offset = (amp / half_P) * (half_P - Math.abs(angle  % (2 * half_P) - half_P));
      const ratio = (dist - ((interval * 3) % 1) + dist_offset + 1) % 1;
      const i = y * width + x;
      const hue = (ratio > 0.5 ? 1.0 - ratio : 0. + ratio) * 0.25 + 0.62;
      const lightness = (1-dist) * 0.25 + (ratio > 0.5 ? 0.5-ratio/2 : 0.+ratio/2);
      pixels[i] = hslToRgb(hue, 1, lightness);
    }
  }

  return new ImageData(buf8, width, height);
};

class Background {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private scaling = 1000;

  constructor(canv: HTMLCanvasElement) {
    const ctx = canv.getContext("2d");
    if (ctx === null) {
      throw new Error("2d context is null");
    }
    this.ctx = ctx;
    this.canvas = canv;
  }

  draw(interval: number): number {
    const { width, height } = this.canvas;
    const img = draw2(height, width, interval / this.scaling);
    this.ctx.putImageData(img, 0, 0);
    return ++interval % this.scaling;
  }
}

const startRender = () => {
  const canvas = document.querySelector("canvas#bg") as HTMLCanvasElement;
  if (canvas === null) {
    throw new Error("Canvas not found");
  }

  const resize = () => {
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;
  }

  window.addEventListener('resize', resize);
  resize();

  const bg = new Background(canvas);

  console.log("Starting render loop");

  let frame = 0;

  setInterval(() => {
    requestAnimationFrame(() => {
      let time = performance.now();
      frame = bg.draw(frame);
      console.log("Frame time", performance.now() - time);
    })
  }, 1000 / 60);
}

// https://gist.github.com/mjackson/5311256
function hslToRgb(h: number, s: number, l: number) {
  let r: number, g: number, b: number;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3) * 255;
    g = hue2rgb(p, q, h) * 255;
    b = hue2rgb(p, q, h - 1 / 3) * 255;
  }

  return 0xff000000 + (r << 16) + (g << 8) + b;
}


window.addEventListener("load", startRender);
