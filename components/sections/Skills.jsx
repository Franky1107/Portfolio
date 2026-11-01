import { skillGroups } from '@/lib/content';
import SectionHeader from '../SectionHeader';

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <SectionHeader tag="Technical Stack" title="Skills &" dim="Tools" />
        <div className="skills-grid">
          {skillGroups.map((group, gi) => (
            <div key={group.title} className={`skill-card reveal${gi ? ` reveal-delay-${gi}` : ''}`}>
              <div className="skill-card-icon">{group.icon}</div>
              <div className="skill-card-title">{group.title}</div>
              <div className="skill-items">
                {group.items.map(([name, pct]) => (
                  <div key={name} className="skill-item">
                    <div className="skill-item-top">
                      <span className="skill-item-name">{name}</span>
                      <span className="skill-item-pct">{pct}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-bar-fill" data-width={pct} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
