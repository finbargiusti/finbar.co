// import Rellax from 'rellax';

// let rellax = new Rellax('.rellax');

const loadbar = document.querySelector('.loaded');

let downloaded = false;

window.addEventListener('scroll', () => {
  requestAnimationFrame(() => {
    // Slow scrolling
    const factor = Math.pow(window.scrollY / (window.innerHeight * 0.3), 6);

    loadbar.style.width = 400 * factor + 'px';

    if (factor < 1) {
      downloaded = false;
      window.scrollTo(0, window.scrollY - (1 - factor) * 4);
    } else {
      if (!downloaded) {
        download();
        downloaded = true;
      }
    }
  });
});

const download = () => {
  const anchor = document.createElement('a');
  anchor.href = '/CV.pdf';
  anchor.download = 'CV.pdf';

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};
