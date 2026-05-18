/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';

const REVIEWS = [
  { 
    quote: "ABSOLUTELY TRANSFORMATIVE", 
    text: "Bogdan was exceptional from start to finish. The final site feels like us: professional, confident, and true to what we do.", 
    emoji: "✨", 
    user: "Khris", 
    role: "Founder, Agency" 
  },
  { 
    quote: "FROM GENERIC TO PREMIUM", 
    text: "The difference was clear right away. The new site feels premium, focused, and much more aligned with the level we operate at.", 
    emoji: "💎", 
    user: "Clara", 
    role: "Founder, Tech Firm" 
  },
  { 
    quote: "A PREMIUM PRESENCE", 
    text: "He helped us move from a generic space to something much more refined and confident. The new design feels premium without trying too hard.", 
    emoji: "🌗", 
    user: "Ariel", 
    role: "Director, Design Studio" 
  }
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !stackRef.current) return;

    const cards = Array.from(stackRef.current.children) as HTMLElement[];
    
    // Pinned storytelling for review cards
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
      }
    });

    cards.forEach((card, i) => {
      if (i === 0) return; // First card stays base

      tl.fromTo(card, 
        { y: "100%", opacity: 0, scale: 0.9, rotationX: -10 },
        { 
          y: i * 15, // Stack offset
          opacity: 1, 
          scale: 1 - (i * 0.05),
          rotationX: 0,
          ease: "none",
        },
        i * 0.5
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative min-h-screen bg-black py-32 px-8 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-[90vw] grid grid-cols-1 md:grid-cols-3 gap-20 relative z-10 items-center">
        
        {/* Left: Business Description */}
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-display font-black leading-tight opacity-80 uppercase tracking-tighter">
            We redefine the limits of human sensation.
          </h2>
          <p className="text-xs opacity-50 font-medium uppercase tracking-[0.3em] max-w-xs leading-relaxed">
            Athra Heavens is a sanctuary for the modern body, merging tech and tranquility with editorial luxury layouts.
          </p>
        </div>

        {/* Center: Prominent Rating */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-[12rem] font-display font-black leading-none opacity-90 select-none tracking-tighter">
            4.6
          </div>
          <div className="text-xs opacity-30 uppercase tracking-[0.5em] mt-4">Average Rating</div>
          <div className="mt-12 text-6xl opacity-20 animate-pulse select-none">✳</div>
          <div className="mt-8 text-8xl opacity-10 select-none font-black">®</div>
        </div>

        {/* Right: Review Cards Stack (Pinned Storytelling) */}
        <div className="relative h-[500px] flex items-center justify-center">
          <div ref={stackRef} className="relative w-full max-w-[360px] h-[450px]">
            {REVIEWS.map((review, i) => (
              <div 
                key={i} 
                className="absolute inset-0 p-10 glass rounded-[32px] flex flex-col border border-white/10 shadow-2xl overflow-hidden"
                style={{ zIndex: i + 1 }}
              >
                <div className="flex-1 space-y-6">
                  <div className="text-2xl">{review.emoji}</div>
                  <h4 className="text-2xl font-black leading-none uppercase tracking-tighter opacity-90">
                    "{review.quote}"
                  </h4>
                  <p className="text-sm font-medium opacity-50 leading-relaxed">
                    {review.text}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="text-sm font-black opacity-80 uppercase tracking-widest">{review.user}</div>
                  <div className="text-[10px] opacity-30 uppercase tracking-[0.2em] mt-1">{review.role}</div>
                </div>

                {/* Specular Highlight */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grain-overlay" />
    </section>
  );
}
