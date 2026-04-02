import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Education } from '../components/Education';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const { colors } = useTheme();
  
  return (
    <div 
      className="min-h-screen overflow-x-hidden transition-colors duration-500" 
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <Navigation />
      <Hero />
      <About />
      <Education />
      <Projects />
      <Contact />
    </div>
  );
}