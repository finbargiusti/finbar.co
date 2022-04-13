const container = document.querySelector('.section.two');

const canvas = document.querySelector('#projects-back');

const ctx = canvas.getContext('2d');

ctx.canvas.width = container.clientWidth;
ctx.canvas.height = container.clientHeight;

const pixelSize = 10;

const scrollFactor = 0.2;

const render = () => {
  requestAnimationFrame(() => {
    const frame =
      (Math.min(window.scrollY / window.innerHeight, 1) - 0.3) * scrollFactor;

    const maxWidth = ctx.canvas.width / pixelSize;
    const maxHeight = ctx.canvas.height / pixelSize;

    for (let x = 0; x < maxWidth; x++) {
      for (let y = 0; y < maxHeight; y++) {
        const x_adj = x - maxWidth / 2;
        const y_adj = y - maxHeight / 2;
        ctx.fillStyle = `hsl(${Math.cos((x_adj + y_adj) / 80) * 360}, 100%, ${
          (Math.cos(x_adj * y_adj * frame) + Math.sin(x_adj * y_adj * frame)) *
          50
        }%)`;
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  });
};

window.addEventListener('scroll', render);

render();
