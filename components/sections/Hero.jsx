import Image from 'next/image';
import heroPhoto from '@/assets/hero-photo.png';
import { profile } from '@/lib/content';

export default function Hero() {
  return (
    <section id="hero" className="hero-image-v2">
      <Image src={heroPhoto} alt={profile.name} className="hero-photo-bg" priority placeholder="empty" />
      <div className="hero-overlay-v2" />

      <div className="hero-inner-v2">
        <div className="hero-card-v2">
          <div className="hero-top-v2">
            <div className="hero-eyebrow-v2">Hello, Geeks!</div>
          </div>

          <div className="hero-bottom-v2">
            <div className="hero-name-group-v2">
              <div className="hero-iam-v2">I am</div>
              <h1 className="hero-name-huge-v2">
                {profile.firstName}
                <br />
                {profile.lastName}
              </h1>
            </div>
            <div className="hero-info-right-v2">
              <div className="hero-title-small-v2">
                Computer Science Student /<br />
                Aspiring Software Developer
              </div>
              <p className="hero-tagline-small-v2">
                Exploring <em>AI</em>, building projects, and continuously learning new technologies —
                one commit at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
