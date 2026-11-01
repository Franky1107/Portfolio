import { achievements } from '@/lib/content';
import SectionHeader from '../SectionHeader';

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="container">
        <SectionHeader tag="Growth & Learning" title="Achievements &" dim="Certifications" />
        <div className="achievements-grid">
          {achievements.map((a, i) => (
            <div
              key={a.title}
              className={`achievement-card reveal${i % 3 ? ` reveal-delay-${i % 3}` : ''}`}
            >
              <div className={`achievement-icon ach-${a.tone}`}>{a.icon}</div>
              <div>
                <div className="achievement-title">{a.title}</div>
                <div className="achievement-sub">{a.sub}</div>
                <div className="achievement-badge">{a.badge}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
