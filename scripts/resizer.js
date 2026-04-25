// Get width of 1ch in pixels
function getChWidth(el) {
  const test = document.createElement("span");
  test.textContent = "0";
  test.style.visibility = "hidden";
  test.style.fontSize = getComputedStyle(el).fontSize;
  test.style.fontFamily = getComputedStyle(el).fontFamily;

  el.appendChild(test);
  const width = test.getBoundingClientRect().width;
  el.removeChild(test);

  return width;
}

window.addEventListener("load", () => {

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const containerWidth = entry.target.getBoundingClientRect().width;

      const chUnit = getChWidth(entry.target) * 6; // width of 6ch in px

      const units = containerWidth / chUnit;

      const snapped = Math.floor(units);

      const target = entry.target.querySelector(".pinsize");
      if (target) {
        target.style.width = snapped * 6 + "ch";
      }
    }
  });

  const els = document.querySelectorAll(".pinsize");

  els.forEach((el) => {
    if (el.parentElement) {
      observer.observe(el.parentElement);
    }
  });
});
