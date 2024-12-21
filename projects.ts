function makeObservables() {
  // PolyFill
  if (typeof IntersectionObserver === undefined) {
    (
      document.querySelectorAll('.listitem') as NodeListOf<HTMLDivElement>
    ).forEach((n) => {
      n.classList.add('visible');
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const t = entry.target as HTMLDivElement;

        if (!entry.isIntersecting) return;

        if (entry.intersectionRatio > 0) {
          t.classList.add('visible');
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }
  );

  document.querySelectorAll('.listitem').forEach((n) => {
    observer.observe(n);
  });
}

window.onload = makeObservables;
