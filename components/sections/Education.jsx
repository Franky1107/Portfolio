import { education } from '@/lib/content';
import SectionHeader from '../SectionHeader';

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <SectionHeader tag="Academic Journey" title="Education" />
        <div className="edu-card reveal">
          <div className="edu-icon">🎓</div>
          <div>
            <div className="edu-degree">{education.degree}</div>
            <div className="edu-school">{education.school}</div>
            <div className="edu-year">{education.years}</div>
            <div className="edu-courses-title">Relevant Coursework</div>
            <div className="edu-courses">
              {education.courses.map((c) => (
                <span key={c} className="course-tag">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
