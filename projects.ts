function makeObservables() {
  if (typeof IntersectionObserver === undefined) {
    (
      document.querySelectorAll('.project') as NodeListOf<HTMLDivElement>
    ).forEach((n) => {
      n.classList.add('visible');
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const t = entry.target as HTMLDivElement;

        if (!entry.isIntersecting) return;

        if (entry.intersectionRatio > 0.1) {
          t.classList.add('visible');
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 1.0,
    }
  );

  document.querySelectorAll('.project').forEach((n) => {
    observer.observe(n);
  });
}

window.onload = makeObservables;
