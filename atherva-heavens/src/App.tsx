/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap, { ScrollTrigger } from '@/lib/gsap';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // 1. Lenis Setup: Premium "heavy" feel with lerp 0.1
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 2. Global Magnetic Click Ripple Effect
    const handleMagneticClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('magnetic') || target.closest('.magnetic')) {
        const el = target.classList.contains('magnetic') ? target : target.closest('.magnetic') as HTMLElement;
        gsap.to(el, { scale: 0.9, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.inOut" });
      }
    };

    window.addEventListener('mousedown', handleMagneticClick);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousedown', handleMagneticClick);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 select-none">
      <Navbar />
      <Hero />
      <Services />
      <Contact />
      <About />
      <Footer />
      <div className="grain-overlay" />
    </main>
  );
}
