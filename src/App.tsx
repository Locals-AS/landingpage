import { MotionConfig } from 'framer-motion';
import { SmoothScroll } from './lenis';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Story from './components/Story';
import Marquee from './components/Marquee';
import Kinds from './components/Kinds';
import Travel from './components/Travel';
import Join from './components/Join';
import Footer from './components/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Nav />
        <main>
          <Hero />
          <Story />
          <Marquee />
          <Kinds />
          <Travel />
          <Join />
        </main>
        <Footer />
      </SmoothScroll>
    </MotionConfig>
  );
}
