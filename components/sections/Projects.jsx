'use client';

import { useState } from 'react';
import { projectFilters, projects } from '@/lib/content';
import ComingSoonLink from '../ComingSoonLink';
import SectionHeader from '../SectionHeader';
import { useSite } from '../SiteProvider';
import { ExternalIcon, GitHubIcon } from '../icons';

const delayClass = (i) => (i % 3 ? ` reveal-delay-${i % 3}` : '');

export default function Projects() {
  const { refresh } = useSite();
  const [filter, setFilter] = useState('all');
  const [touched, setTouched] = useState(false);

  const choose = (id) => {
    setFilter(id);
    setTouched(true);
    refresh(); // grid height changed — let smooth scroll re-measure
  };

  return (
    <section id="projects">
      <div className="container">
        <SectionHeader tag="What I've Built" title="Featured" dim="Projects" />

        <div className="filter-bar reveal">
          {projectFilters.map((f) => (
            <button
              key={f.id}
              className={`filter-btn${filter === f.id ? ' active' : ''}`}
              onClick={() => choose(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => {
            const shown = filter === 'all' || p.category === filter;
            return (
              <div
                key={p.title}
                className={`project-card reveal${delayClass(i)}${shown ? '' : ' hidden'}`}
                data-category={p.category}
                style={shown && touched ? { animation: 'fadeUp 0.4s ease forwards' } : undefined}
              >
                <div className="project-number">{p.number}</div>
                <div className="project-title">{p.title}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-learning">
                  <div className="project-learning-label">Key Learning</div>
                  <div className="project-learning-text">{p.learning}</div>
                </div>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={p.github} className="project-link" target="_blank" rel="noreferrer">
                    <GitHubIcon />
                    GitHub
                  </a>
                  {p.demo && (
                    <ComingSoonLink className="project-link" message={p.demo.message}>
                      <ExternalIcon />
                      {p.demo.label}
                    </ComingSoonLink>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
