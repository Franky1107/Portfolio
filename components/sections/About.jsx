import { aboutStats, interests, marqueeRows, profile } from '@/lib/content';
import ComingSoonLink from '../ComingSoonLink';
import SectionHeader from '../SectionHeader';

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <SectionHeader tag="Who I Am" title="About" dim="Me" />
        <div className="about-grid">
          <div className="about-avatar-wrap reveal">
            <div className="about-avatar">
              <div className="avatar-initials">SM</div>
              <div className="avatar-inner">
                <div className="avatar-icon">🧑‍💻</div>
                <div className="avatar-name">{profile.name}</div>
                <div className="avatar-sub">CS Student · Developer</div>
              </div>
            </div>
            <div className="about-corner about-corner-tl" />
            <div className="about-corner about-corner-br" />
            <div className="about-stats">
              {aboutStats.map((s) => (
                <div key={s.label} className="stat-card">
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-text reveal reveal-delay-2">
            <p>
              Hi! I&apos;m <strong>{profile.name}</strong>, a Computer Science student with a deep
              passion for technology and problem-solving. I&apos;m on a continuous learning journey,
              exploring the fascinating intersections of{' '}
              <strong>Artificial Intelligence, Machine Learning,</strong> and software development.
            </p>
            <p>
              What excites me most is building things — whether it&apos;s experimenting with{' '}
              <strong>GANs for video anomaly detection</strong> or crafting clean, functional web
              applications. I believe in the power of curiosity-driven learning and embrace every
              challenge as an opportunity to grow.
            </p>
            <p>
              I&apos;m not an expert yet — and that&apos;s the point. I&apos;m a student who shows up
              consistently, asks the right questions, and iterates quickly. Every project I build
              teaches me something new, and that&apos;s what keeps me going.
            </p>
            <div className="interest-pills">
              {interests.map((i) => (
                <span key={i} className="pill">{i}</span>
              ))}
            </div>
            <ComingSoonLink className="resume-btn" message="Resume download coming soon!">
              ⬇ Download Resume (PDF)
            </ComingSoonLink>
          </div>
        </div>
      </div>

      <div className="scroll-velocity-wrapper reveal">
        {marqueeRows.map((row) => (
          <div key={row.text} className="parallax">
            <div className="scroller" data-base-velocity={row.velocity}>
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i}>{row.text.replace(/ $/, ' ')}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
