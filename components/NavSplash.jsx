'use client';

import { splashWords } from '@/lib/content';
import { useSite } from './SiteProvider';

export default function NavSplash() {
  const { splash } = useSite();
  const { phase, index } = splash;
  const running = phase !== 'idle';

  return (
    <div
      className={['nav-splash', phase === 'active' && 'active', phase === 'closing' && 'closing']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="nav-splash-inner">
        {splashWords.map((word, i) => {
          let cls = 'splash-word';
          if (running && i === index) cls += ' active';
          else if (running && i < index) cls += ' exit';
          return (
            <h1 key={word} className={cls}>
              {word}
            </h1>
          );
        })}
      </div>
    </div>
  );
}
