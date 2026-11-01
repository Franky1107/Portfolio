import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import NavSplash from '@/components/NavSplash';
import SiteProvider from '@/components/SiteProvider';
import About from '@/components/sections/About';
import Achievements from '@/components/sections/Achievements';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import Education from '@/components/sections/Education';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';

export default function Home() {
  return (
    <SiteProvider>
      <Loader />
      <Navbar />
      <NavSplash />

      <main data-scroll-container id="main-container">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Blog />
        <Contact />
        <Footer />
      </main>
    </SiteProvider>
  );
}
