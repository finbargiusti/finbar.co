function getChSize(el, ctx) {
  const test = document.createElement("span");
  test.textContent = "0";
  test.style.visibility = "hidden";
  test.style.fontSize = "1rem";
  el.appendChild(test);
  const height = parseFloat(getComputedStyle(test).lineHeight)
  const width =  test.getBoundingClientRect().width;
  el.removeChild(test);
  return {
    width, height
  };
}

window.addEventListener('load', () => {
  document.body.style.cursor = 'none';


  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.pointerEvents = 'none';
  canvas.style.backgroundColor = 'transparent';

  const wrap = document.getElementById('wrap');

  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  const wrapStyle = getComputedStyle(wrap);
  ctx.font = wrapStyle.font;

  let ch = getChSize(wrap, ctx);
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    const r = document.body.getBoundingClientRect()
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;

    canvas.style.width = r.width + "px";
    canvas.style.height = r.height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ch = getChSize(wrap, ctx);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  document.body.addEventListener('mousemove', e => {
    clearCanvas();
    const x = Math.floor(e.pageX / ch.width + 0.5) * ch.width;
    const y = Math.floor(e.pageY / ch.height) * ch.height;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(x, y, ch.width, ch.height);

  });
});
