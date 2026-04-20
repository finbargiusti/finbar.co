
// Get width of 1ch in pixels
function getChWidth(el) {
  const test = document.createElement("span");
  test.textContent = "0";
  test.style.visibility = "hidden";
  el.appendChild(test);
  const width = test.getBoundingClientRect().width;
  el.removeChild(test);
  return width;
}

window.addEventListener('load', () => {
  const wrap = document.getElementById("wrap");
  const main = document.getElementById("main");

  const chWidth = getChWidth(main);

  const observer = new ResizeObserver(() => {
    const widthPx = wrap.getBoundingClientRect().width
    const ch = widthPx / chWidth;

    const snapped = Math.round(ch);

    main.style.width = snapped + "ch";
  });

  observer.observe(wrap);
});
