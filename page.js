const right = 30;

const dist = 160;

const the_page = document.querySelector('#page');

const setPage = () => {
  const height = window.innerHeight;
  const ratio = window.scrollY / height;

  the_page.style = `right: ${right - Math.abs(ratio - 1) * dist}px;`;
};

window.addEventListener('scroll', setPage);

setPage();
