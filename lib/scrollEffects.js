// Imperative scroll effects ported from the original script.js.
// Each init function returns a cleanup function so React can tear it down.

/** Reveal-on-scroll: toggles .visible on .reveal elements and animates skill bars. */
export function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const bars = e.target.querySelectorAll('.skill-bar-fill');
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          bars.forEach((bar) => { bar.style.width = `${bar.dataset.width}%`; });
        } else {
          e.target.classList.remove('visible');
          bars.forEach((bar) => { bar.style.width = '0%'; });
        }
      });
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

/** Staggered hero text entrance. */
export function animateHeroEntrance(gsap) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('.hero-eyebrow-v2', { opacity: 1, y: 0, duration: 0.7 })
    .to('.hero-iam-v2', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .to('.hero-name-huge-v2', { opacity: 1, y: 0, duration: 0.9 }, '-=0.35')
    .to('.hero-title-small-v2', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .to('.hero-tagline-small-v2', { opacity: 1, y: 0, duration: 0.7 }, '-=0.35');
  return () => tl.kill();
}

/** Velocity-reactive marquee rows (.scroller with data-base-velocity). */
export function initScrollVelocity(loco) {
  const scrollers = document.querySelectorAll('.scroller');
  if (!scrollers.length) return () => {};

  let scrollVelocity = 0;
  let targetVelocity = 0;
  loco.on('scroll', (args) => { targetVelocity = args.speed || 0; });

  const data = Array.from(scrollers).map((el) => {
    const span = el.querySelector('span');
    return {
      el,
      baseX: 0,
      baseVelocity: parseFloat(el.getAttribute('data-base-velocity')) || 1,
      directionFactor: 1,
      getSpanWidth: () => (span ? span.offsetWidth : 0),
    };
  });

  const wrap = (min, max, v) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
  };

  let lastTime = performance.now();
  let rafId;

  const render = (time) => {
    const delta = time - lastTime;
    lastTime = time;

    scrollVelocity += (targetVelocity - scrollVelocity) * 0.1;
    targetVelocity *= 0.9;
    const velocityFactor = scrollVelocity * 0.15;

    data.forEach((d) => {
      if (velocityFactor < -0.05) d.directionFactor = -1;
      else if (velocityFactor > 0.05) d.directionFactor = 1;

      let moveBy = d.directionFactor * d.baseVelocity * (delta / 16);
      moveBy += d.directionFactor * moveBy * velocityFactor;
      d.baseX += moveBy;

      const maxW = d.getSpanWidth();
      if (maxW > 0) {
        d.baseX = wrap(-maxW, 0, d.baseX);
        d.el.style.transform = `translate3d(${d.baseX}px, 0, 0)`;
      }
    });

    rafId = requestAnimationFrame(render);
  };

  rafId = requestAnimationFrame(render);
  return () => cancelAnimationFrame(rafId);
}

/** Magnetic snapping to any element marked [data-snap-section]. */
export function initScrollSnapping(loco) {
  let snapTimeout;
  loco.on('scroll', (args) => {
    clearTimeout(snapTimeout);
    if (Math.abs(args.speed) > 2) return;

    snapTimeout = setTimeout(() => {
      const currentY = args.scroll.y;
      const magnetThreshold = 250;
      let closest = null;
      let minDistance = Infinity;

      document.querySelectorAll('[data-snap-section]').forEach((section) => {
        const distance = Math.abs(currentY - section.offsetTop);
        if (distance < magnetThreshold && distance < minDistance) {
          minDistance = distance;
          closest = section;
        }
      });

      if (closest && minDistance > 5) {
        loco.scrollTo(closest, {
          duration: 800,
          disableLerp: false,
          easing: [0.25, 0.0, 0.35, 1.0],
        });
      }
    }, 150);
  });
  return () => clearTimeout(snapTimeout);
}
