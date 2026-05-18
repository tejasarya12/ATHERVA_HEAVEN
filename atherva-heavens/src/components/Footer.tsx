/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current || !logoRef.current) return;

    const letters = logoRef.current.querySelectorAll('.letter');
    
    gsap.fromTo(letters, 
      { y: 400, opacity: 0, skewY: 10 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Typewriter effect at the bottom
    const typewriter = document.getElementById('typewriter-text');
    if (typewriter) {
      const text = "ATHERVA HEAVENS";
      let i = 0;
      const speed = 100;
      
      const type = () => {
        if (i < text.length) {
          typewriter.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      };

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top center",
        onEnter: () => {
          typewriter.innerHTML = "";
          i = 0;
          type();
        },
        once: true
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-black pt-40 pb-12 px-8 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-24 relative z-10 mb-40">
        
        {/* Left: Menu */}
        <div className="space-y-12">
          <h5 className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-black">Atmospheric_Navigation</h5>
          <ul className="space-y-6 text-sm font-bold opacity-75 uppercase tracking-[0.2em]">
            <li><a href="#home" className="hover:opacity-100 transition-opacity underline-offset-4 hover:underline magnetic">Home_Base</a></li>
            <li><a href="#services" className="hover:opacity-100 transition-opacity underline-offset-4 hover:underline magnetic">Service_Story</a></li>
            <li><a href="#about" className="hover:opacity-100 transition-opacity underline-offset-4 hover:underline magnetic">Human_About</a></li>
            <li><a href="#contact" className="hover:opacity-100 transition-opacity underline-offset-4 hover:underline magnetic">Contact_End</a></li>
          </ul>
        </div>

        {/* Center: Socials */}
        <div className="space-y-12">
          <h5 className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-black">Digital_Atmosphere</h5>
          <ul className="space-y-6 text-sm font-bold opacity-75 uppercase tracking-[0.2em]">
            <li><a href="#" className="hover:opacity-100 transition-opacity magnetic">Instagram</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity magnetic">Twitter / X</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity magnetic">LinkedIn</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity magnetic">YouTube</a></li>
          </ul>
        </div>

        {/* Right: Recall */}
        <div className="space-y-12">
          <h5 className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-black">Body_Connection</h5>
          <div className="space-y-8">
            <p className="text-xs opacity-50 uppercase tracking-widest leading-relaxed">
              Get a call from us within 12 celestial hours.
            </p>
            <div className="relative group max-w-xs">
              <input 
                type="text" 
                placeholder="Mobile number" 
                className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all duration-700 text-sm font-black uppercase tracking-widest"
              />
              <button className="absolute right-0 bottom-4 opacity-30 group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase tracking-widest magnetic">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-10">
        <div id="typewriter-text" className="text-4xl md:text-7xl font-display font-black tracking-[0.2em] uppercase opacity-40 h-20"></div>
      </div>

      <div 
        ref={logoRef}
        className="relative w-full h-[40vh] overflow-hidden mt-32 flex items-center justify-center translate-y-10"
      >
        <div 
          className="text-[14vw] font-display font-black leading-none tracking-tighter flex justify-between w-full select-none shadowy-text relative z-10 p-4"
          id="footer-logo"
        >
          {"ATHERVAHEAVENS".split("").map((letter, i) => (
            <span key={i} className="letter inline-block" data-text={letter}>{letter}</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-20 flex justify-between items-center text-[9px] opacity-20 uppercase tracking-[0.5em] font-black">
        <span>© 2026 Atherva Heavens Studio</span>
        <span>A Stra-City, AE 0001</span>
      </div>

      <div className="grain-overlay" />
    </footer>
  );
}
