'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { splashWords } from '@/lib/content';
import {
  animateHeroEntrance,
  initReveal,
  initScrollSnapping,
  initScrollVelocity,
} from '@/lib/scrollEffects';

const SiteContext = createContext(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>');
  return ctx;
}

const WORD_INTERVAL = 250; // ms each greeting is shown in the splash

const initialNav = { scrolled: false, hidden: false, fab: false, toTop: false, active: '' };
const sameNav = (a, b) => Object.keys(a).every((k) => a[k] === b[k]);

export default function SiteProvider({ children }) {
  const locoRef = useRef(null);
  const cleanups = useRef([]);
  const lastY = useRef(0);
  const splashBusy = useRef(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [nav, setNav] = useState(initialNav);
  // phase: 'idle' | 'active' | 'closing';  index: current greeting
  const [splash, setSplash] = useState({ phase: 'idle', index: -1 });

  // ---- Nav state driven by scroll position ----
  const handleScroll = useCallback((y) => {
    const hero = document.getElementById('hero');
    const heroHeight = hero ? hero.offsetHeight - 100 : 500;
    const pastHero = y > heroHeight;
    const scrollingUp = y < lastY.current;

    let active = '';
    document.querySelectorAll('section[id]').forEach((s) => {
      if (y >= s.offsetTop - 120) active = s.id;
    });

    const next = {
      scrolled: y > 50,
      toTop: y > 400,
      hidden: pastHero,
      fab: pastHero && scrollingUp,
      active,
    };
    lastY.current = y;
    setNav((prev) => (sameNav(prev, next) ? prev : next));
  }, []);

  // ---- Instant jump (used while the splash covers the screen) ----
  const jumpTo = useCallback((target) => {
    const loco = locoRef.current;
    if (loco) {
      loco.scrollTo(target, { duration: 0, disableLerp: true });
    } else if (typeof target === 'number') {
      window.scrollTo(0, target);
    } else {
      target?.scrollIntoView();
    }
  }, []);

  const refresh = useCallback(() => {
    requestAnimationFrame(() => locoRef.current?.update());
  }, []);

  // ---- Greeting splash transition, then jump to the target ----
  const runSplash = useCallback(
    (onCovered) => {
      if (splashBusy.current) return;
      splashBusy.current = true;

      let index = 0;
      setSplash({ phase: 'active', index });

      const cycle = setInterval(() => {
        index += 1;
        setSplash({ phase: 'active', index });
        if (index < splashWords.length) return;

        clearInterval(cycle);
        onCovered();

        setTimeout(() => {
          setSplash({ phase: 'closing', index });
          setTimeout(() => {
            setSplash({ phase: 'idle', index: -1 });
            splashBusy.current = false;
            locoRef.current?.update();
          }, 600);
        }, 200);
      }, WORD_INTERVAL);
    },
    [],
  );

  /** Navigate to "#section" (or "#top") with the splash transition. */
  const navigateTo = useCallback(
    (hash) => {
      setMenuOpen(false);
      if (hash === '#top') {
        runSplash(() => jumpTo(0));
        return;
      }
      const el = document.querySelector(hash);
      if (el) runSplash(() => jumpTo(el));
    },
    [jumpTo, runSplash],
  );

  // ---- Called by <Loader> once its exit animation has finished ----
  const onLoaded = useCallback(async () => {
    const [{ default: LocomotiveScroll }, { gsap }, { ScrollTrigger }] = await Promise.all([
      import('locomotive-scroll'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]);

    cleanups.current.push(initReveal());
    cleanups.current.push(animateHeroEntrance(gsap));

    const scrollContainer = document.querySelector('#main-container');
    const loco = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      multiplier: 1,
      lerp: 0.08,
      smartphone: { smooth: false },
      tablet: { smooth: true, breakpoint: 768 },
    });
    locoRef.current = loco;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.scrollerProxy(scrollContainer, {
      scrollTop(value) {
        return arguments.length
          ? loco.scrollTo(value, { duration: 0, disableLerp: true })
          : loco.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: scrollContainer.style.transform ? 'transform' : 'fixed',
    });

    loco.on('scroll', (args) => {
      ScrollTrigger.update();
      handleScroll(args.scroll.y);
    });

    const onRefresh = () => loco.update();
    ScrollTrigger.addEventListener('refresh', onRefresh);
    ScrollTrigger.refresh();

    cleanups.current.push(initScrollVelocity(loco));
    cleanups.current.push(initScrollSnapping(loco));

    // Re-measure once late assets (fonts, hero image) have loaded.
    const onLoad = () => setTimeout(() => loco.update(), 300);
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad);

    cleanups.current.push(() => {
      window.removeEventListener('load', onLoad);
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      loco.destroy();
      locoRef.current = null;
    });
  }, [handleScroll]);

  // Tear everything down on unmount.
  useEffect(() => () => {
    cleanups.current.forEach((fn) => fn?.());
    cleanups.current = [];
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const value = {
    nav,
    splash,
    menuOpen,
    toggleMenu: () => setMenuOpen((o) => !o),
    closeMenu: () => setMenuOpen(false),
    navigateTo,
    refresh,
    onLoaded,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
