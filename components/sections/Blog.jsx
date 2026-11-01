import { posts } from '@/lib/content';
import ComingSoonLink from '../ComingSoonLink';
import SectionHeader from '../SectionHeader';

export default function Blog() {
  return (
    <section id="blog">
      <div className="container">
        <SectionHeader tag="Thoughts & Notes" title="From the" dim="Blog" />
        <div className="blog-grid">
          {posts.map((post, i) => (
            <div key={post.title} className={`blog-card reveal${i ? ` reveal-delay-${i}` : ''}`}>
              <div className="blog-date">{post.date}</div>
              <div className="blog-title">{post.title}</div>
              <div className="blog-excerpt">{post.excerpt}</div>
              <ComingSoonLink className="blog-read-more" message="Blog coming soon!">
                Read More →
              </ComingSoonLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
