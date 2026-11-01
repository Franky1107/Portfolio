'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/lib/content';
import { useSite } from './SiteProvider';

const DURATION = 800; // ms to count 0 → 100
const TICK = 20;

export default function Loader() {
  const { onLoaded } = useSite();
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timeouts = [];
    const increment = 100 / (DURATION / TICK);
    let value = 0;

    const timer = setInterval(() => {
      value += increment;
      if (Math.random() > 0.8) value += Math.random() * 5; // natural jitter

      if (value < 100) {
        setPct(value);
        return;
      }

      clearInterval(timer);
      setPct(100);
      // Hold at 100%, slide the loader away, then start the page.
      timeouts.push(
        setTimeout(() => {
          setHidden(true);
          timeouts.push(setTimeout(onLoaded, 800));
        }, 1000),
      );
    }, TICK);

    return () => {
      clearInterval(timer);
      timeouts.forEach(clearTimeout);
    };
  }, [onLoaded]);

  return (
    <div id="loader" className={hidden ? 'hidden' : undefined} style={{ gap: '3rem' }}>
      <div className="loader-content">
        <span className="loader-name">
          {profile.firstName}
          <br />
          {profile.lastName}
        </span>
        <div className="loader-line-wrap">
          <div className="loader-line" style={{ width: `${pct}%` }} />
        </div>
        <span className="loader-pct">{Math.floor(pct)}%</span>
      </div>

      {/* From Uiverse.io by Praashoo7 */}
      <div className="main">
        <div className="up">
          <div className="loaders">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="loader" />
            ))}
          </div>
          <div className="loadersB">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="loaderA">
                <div className={`ball${i}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
