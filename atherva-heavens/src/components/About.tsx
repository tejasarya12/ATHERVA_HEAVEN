/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import gsap, { ScrollTrigger, Draggable } from '@/lib/gsap';

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

    const rotations = [-2.5, 2.2, -1.2];
    const offsetsX = [-6, 5, -2];
    const offsetsY = [0, 4, 8];

    // Remove ScrollTrigger for cards. Just stack them immediately.
    cards.forEach((card, i) => {
      gsap.set(card, {
        rotation: rotations[i],
        x: offsetsX[i],
        y: offsetsY[i],
        zIndex: cards.length - i,
        scale: 1
      });
    });

    let topZIndex = cards.length;

    // Draggable & Shuffle logic
    Draggable.create(cards, {
      type: "x,y",
      edgeResistance: 0.65,
      onClick: function () {
        const card = this.target;
        const index = cards.indexOf(card);

        // Shuffle to bottom
        const tl = gsap.timeline();
        tl.to(card, {
          x: '+=150', // move right
          rotation: '+=15',
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            // Move to bottom by increasing other cards' zIndex
            cards.forEach(c => {
              const currZ = parseInt(gsap.getProperty(c, "zIndex") as string) || 0;
              gsap.set(c, { zIndex: currZ + 1 });
            });
            gsap.set(card, { zIndex: 1 });
          }
        })
          .to(card, {
            x: offsetsX[index],
            y: offsetsY[index],
            rotation: rotations[index],
            duration: 0.3,
            ease: "power2.inOut"
          });
      },
      onDragStart: function () {
        topZIndex++;
        gsap.set(this.target, { zIndex: topZIndex });
      },
      onDragEnd: function () {
        const card = this.target;
        const index = cards.indexOf(card);
        // Snap back after 5s
        setTimeout(() => {
          gsap.to(card, {
            x: offsetsX[index],
            y: offsetsY[index],
            rotation: rotations[index],
            duration: 0.8,
            ease: "power2.out"
          });
        }, 5000);
      }
    });

    const ratingObj = { val: 0 };
    const particles = sectionRef.current.querySelectorAll('.particle-c');

    const resetAnimation = () => {
      // kill any active tweens on the rating and particles
      gsap.killTweensOf(ratingObj);
      gsap.killTweensOf(particles);
      gsap.killTweensOf('.particles-wrap');

      // Reset values
      ratingObj.val = 0;
      const el = document.getElementById('rating-number');
      if (el) el.innerHTML = "0.0";

      const wrap = document.querySelector('.particles-wrap');
      if (wrap) wrap.classList.add('active');

      gsap.set('.particles-wrap', { opacity: 1, rotationY: 0, rotationX: 0 });
      gsap.set(particles, { '--r': '120px', '--p-opacity': 0 });

      // Start rotating the wrap continuously
      gsap.to('.particles-wrap', {
        rotationY: 360,
        rotationX: 360,
        duration: 14,
        repeat: -1,
        ease: "none"
      });

      // 1. Counter animation
      gsap.to(ratingObj, {
        val: 4.6,
        duration: 4,
        ease: "power1.out",
        onUpdate: () => {
          if (el) el.innerHTML = ratingObj.val.toFixed(1);
        },
        onComplete: () => {
          // Stop blinking, set to solid and spread slowly
          gsap.killTweensOf(particles);

          // Infinity spread
          particles.forEach((p) => {
            gsap.fromTo(p,
              { '--r': '150px', '--p-opacity': Math.random() * 0.8 + 0.2 },
              {
                '--r': `${150 + Math.random() * 150}vw`,
                '--p-opacity': 0,
                duration: 10 + Math.random() * 10,
                delay: Math.random() * 5,
                repeat: -1,
                ease: "none"
              }
            );
          });
        }
      });

      gsap.fromTo('.hand-draw-stroke',
        { strokeDashoffset: 600 },
        { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", stagger: 0.5, delay: 1 }
      );

      // 2. Particle Blinking & radius animation during count
      particles.forEach((p) => {
        gsap.fromTo(p,
          { '--p-opacity': 0 },
          {
            '--p-opacity': () => 0.2 + Math.random() * 0.8,
            duration: () => 0.2 + Math.random() * 0.4,
            repeat: 15,
            yoyo: true,
            delay: Math.random() * 1.2,
            ease: "sine.inOut"
          }
        );
        gsap.to(p, {
          '--r': '150px',
          duration: 4,
          ease: "power1.inOut"
        });
      });
    };

    const ratingTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      onEnter: resetAnimation,
      onEnterBack: resetAnimation,
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-[var(--bg-primary)] transition-colors duration-500 py-32 px-8 flex flex-col items-center justify-center overflow-hidden text-[var(--text-primary)]"
    >
      {/* Section label on top-left of the screen */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-50 text-xs md:text-sm font-black uppercase tracking-[0.3em] text-[var(--text-primary)] transition-colors duration-500">
        about us
      </div>

      <div className="w-full max-w-[90vw] grid grid-cols-1 md:grid-cols-3 gap-20 relative z-10 items-center">

        {/* Left: Business Description */}
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl md:text-3xl font-display font-black leading-tight uppercase tracking-tighter lumen-gradient">
            We redefine the limits of human sensation.
          </h2>
          <p className="text-[13px] font-bold uppercase tracking-[0.3em] max-w-xs leading-relaxed lumen-desc-gradient">
            Athra Heavens is a sanctuary for the modern body, merging tech and tranquility with editorial luxury layouts.
          </p>
        </div>

        {/* Center: Prominent Rating */}
        <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-0">
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="text-8xl md:text-[12rem] font-display font-black leading-none opacity-90 select-none tracking-tighter relative z-10 text-[var(--text-primary)] transition-colors duration-500" id="rating-number">
              0.0
            </div>
            <div className="particles-wrap">
              {Array.from({ length: 1000 }).map((_, i) => {
                const z = Math.random() * 360;
                const y = Math.random() * 360;
                const hue = (40 / 1000 * (i + 1)) + 180;
                return (
                  <div
                    key={i}
                    className="particle-c"
                    style={{
                      animationDelay: `${(i + 1) * 0.01}s`,
                      backgroundColor: `hsla(${hue}, 100%, 50%, 1)`,
                      color: `hsla(${hue}, 100%, 50%, 1)`,
                      '--z': `${z}deg`,
                      '--y': `${y}deg`
                    } as React.CSSProperties}
                  />
                )
              })}
            </div>
          </div>
          <div className="mt-1 text-3xl opacity-20 animate-pulse select-none z-10">Average Rating</div>

          <div className="mt-8 text-8xl opacity-10 select-none font-black z-10">✳</div>
        </div>

        {/* Right: Review Cards Stack (Pinned Storytelling) */}
        <div className="relative h-[400px] md:h-[500px] flex items-center justify-center mt-12 md:mt-0">

          {/* Hand drawn hint */}
          <div className="absolute -bottom-16 -right-6 md:-bottom-20 md:-right-24 w-[240px] md:w-[320px] z-20 pointer-events-none opacity-90">
            <svg viewBox="0 0 350 250" className="w-full h-full text-[var(--text-primary)]" style={{ overflow: 'visible' }}>
              <text x="10" y="190" fontFamily="'Caveat', cursive" fontSize="44" className="hand-draw-stroke font-bold" transform="rotate(-8 10 190)">
                Tap or
              </text>
              <text x="40" y="235" fontFamily="'Caveat', cursive" fontSize="44" className="hand-draw-stroke font-bold" transform="rotate(-8 40 235)">
                drag cards
              </text>
              {/* Thick arrow pointing UP and LEFT to the cards */}
              <path d="M 220 230 C 370 230 328 50 260 50 M 260 50 L 290 35 M 260 50 L 285 75" className="hand-draw-stroke" style={{ strokeWidth: 8, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
            </svg>
          </div>

          <div ref={stackRef} className="relative w-full max-w-[360px] h-[350px] md:h-[450px]">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="absolute inset-0 p-10 solid-card rounded-[32px] flex flex-col"
                style={{ zIndex: i + 1 }}
              >
                <div className="flex-1 space-y-6">
                  <div className="text-2xl">{review.emoji}</div>
                  <h4 className="text-2xl font-black leading-none uppercase tracking-tighter opacity-90">
                    "{review.quote}"
                  </h4>
                  <p className="text-sm font-medium opacity-60 leading-relaxed">
                    {review.text}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--card-divider)] transition-colors duration-500">
                  <div className="text-sm font-black opacity-90 uppercase tracking-widest">{review.user}</div>
                  <div className="text-[10px] opacity-50 uppercase tracking-[0.2em] mt-1">{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grain-overlay" />
    </section>
  );
}
