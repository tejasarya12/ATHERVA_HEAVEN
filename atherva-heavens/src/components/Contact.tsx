/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<SVGFETurbulenceElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Subtle floating movement for plastic
    gsap.to(filterRef.current, {
      attr: { seed: "+=10" },
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!filterRef.current) return;
      const { clientX } = e;
      
      gsap.to(filterRef.current, {
        attr: { baseFrequency: 0.015 + (clientX / window.innerWidth) * 0.005 },
        duration: 2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=300%",
        pin: true,
        scrub: true,
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      pinTl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center p-8 overflow-hidden z-[40]"
    >
      {/* Plastic Overlay Layer */}
      <div 
        className="absolute inset-0 pointer-events-none z-30 opacity-60 mix-blend-screen"
        style={{ filter: 'url(#plastic-displacement)' }}
      >
        <div className="w-full h-full bg-white/5 backdrop-blur-[1px] shadow-[inset_0_0_100px_rgba(255,255,255,0.1)]" />
      </div>

      <svg className="hidden">
        <filter id="plastic-displacement">
          <feTurbulence 
            ref={filterRef}
            type="fractalNoise" 
            baseFrequency="0.015" 
            numOctaves="5" 
            result="noise" 
            seed="1"
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale="60" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 bg-white/10 border border-white/20" id="contact-grid">
        {/* Left: Large Text */}
        <div className="p-16 flex items-center justify-center border-r border-white/20">
          <h2 className="text-[10vw] font-display font-black leading-[0.85] tracking-tighter uppercase opacity-90 select-none">
            DROP US<br />A LINE
          </h2>
        </div>

        {/* Right: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Box 1: Location */}
          <div className="p-12 border-b border-r border-white/20 flex flex-col justify-between group min-h-[300px]">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-6 block font-bold">Location</span>
              <h4 className="text-xl font-medium opacity-87 leading-tight">
                Jack Lemkus Store,<br/>26 St Georges Mall,<br/>Cape Town
              </h4>
            </div>
            <button className="w-fit px-6 py-2 border border-white/20 rounded-full text-[10px] font-bold tracking-widest hover:bg-white hover:text-black transition-all magnetic uppercase">
              Get Directions
            </button>
          </div>

          {/* Box 2: Contact */}
          <div className="p-12 border-b border-white/20 flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-6 block font-bold">Contact</span>
              <div className="space-y-4">
                <p className="text-sm opacity-87 border-b border-white/10 pb-2 inline-block">info@atherva.heaven</p>
                <div className="text-sm opacity-60 flex flex-col gap-1">
                  <p>021 425 2166</p>
                  <p>084 581 1878</p>
                </div>
              </div>
            </div>
          </div>

          {/* Box 3: Trading Hours */}
          <div className="p-12 border-r border-white/20 flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-6 block font-bold">Trading Hours</span>
              <div className="space-y-2 text-[11px] opacity-70 uppercase tracking-widest leading-relaxed font-medium">
                <div className="flex justify-between"><span>Monday - Friday:</span> <span>08:45 to 17:00</span></div>
                <div className="flex justify-between"><span>Saturdays:</span> <span>09:00 to 14:00</span></div>
                <div className="flex justify-between"><span>Sundays:</span> <span>Closed</span></div>
                <div className="flex justify-between"><span>Public Holidays:</span> <span>Closed</span></div>
              </div>
            </div>
          </div>

          {/* Box 4: Get a call from us */}
          <div className={cn(
            "p-12 flex flex-col justify-between min-h-[300px] transition-all duration-700",
            isFocused ? "shadow-[inset_0_0_100px_rgba(255,255,255,0.05)]" : ""
          )}>
            <div>
              <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-6 block font-bold">Callback_request</span>
              <div className="relative mt-4">
                <input 
                  type="text" 
                  placeholder="Your mobile number"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all duration-500 text-lg font-black uppercase tracking-tighter placeholder:text-white/10"
                />
                <button className="absolute right-0 bottom-4 opacity-30 hover:opacity-100 transition-opacity p-2 magnetic font-black text-[10px] uppercase tracking-widest">
                  Submit
                </button>
              </div>
            </div>
            <p className="text-[9px] opacity-20 uppercase tracking-[0.4em] font-medium">Tactile Material Realism Applied</p>
          </div>
        </div>
      </div>
      
      <div className="grain-overlay" />
    </section>
  );
}
