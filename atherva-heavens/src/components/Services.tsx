/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';

const SERVICES = [
  {
    id: 'Jacuzzi',
    title: 'Ultimate Hydro Relaxation :',
    description: 'Enjoy a soothing soak in our Jacuzzi tub, where warm water and gentle jets help relax muscles, improve circulation, and melt away daily stress.',
    video: '/videos/service_2.mp4'
  },
  {
    id: 'Steam Room',
    title: 'Pure Steam Therapy :',
    description: 'Relax in a warm steam-filled environment that helps open pores, cleanse the skin, and promote overall well-being. The soothing heat helps reduce stress and leaves you feeling refreshed.',
    video: '/videos/service_1.mp4'
  },
  {
    id: 'Wine Massage',
    title: 'Luxurious Wine Therapy :',
    description: 'Our wine massage combines soothing massage techniques with antioxidant-rich ingredients to help improve skin texture, reduce stress, and leave you feeling refreshed.',
    video: '/videos/service_3.mp4'
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const cards = gsap.utils.toArray('.service-card') as HTMLElement[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${(cards.length + 1) * 200}%`,
        pin: true,
        scrub: 1.5,
      }
    });

    // Add a cinematic entrance delay that aligns with the Hero door reveal
    tl.to({}, { duration: 1.5 });

    cards.forEach((card, i) => {
      const inner = card.querySelector('.card-inner') as HTMLElement;
      const title = card.querySelector('.service-title');
      const desc = card.querySelector('.service-desc');

      // Move each card sequentially
      if (i > 0) {
        // Bring in and zoom to full screen
        tl.fromTo(card,
          { xPercent: 100, scale: 0.85, filter: 'blur(10px)', opacity: 0 },
          { xPercent: 0, scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.2, ease: "power2.out" }
        );
        tl.fromTo(inner,
          { borderRadius: "80px" },
          { borderRadius: "0px", duration: 1.2, ease: "power2.out" },
          "<"
        );
      } else {
        // First card starts visible behind the door, full screen
        tl.fromTo(card,
          { scale: 0.8, opacity: 0.3 },
          { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
        );
        tl.set(inner, { borderRadius: "0px" }, 0);

        // First card text reveal timing correction (starts at 2.0s aligned with entrance)
        tl.fromTo([title, desc],
          { y: 150, opacity: 0, filter: 'blur(15px)' },
          {
            y: 0,
            opacity: (_index: number, target: HTMLElement) => target.classList.contains('service-title') ? 0.9 : 0.6,
            filter: 'blur(0px)',
            duration: 1.5,
            stagger: 0.3,
            ease: "expo.out"
          },
          2.0
        );
      }

      // Stay centered
      tl.to({}, { duration: 1 });

      // Exit left with shrink and rounding
      if (i < cards.length - 1) {
        tl.to(card, {
          xPercent: -100,
          scale: 0.85,
          filter: 'blur(30px)',
          opacity: 0,
          duration: 1.5,
          ease: "power2.in"
        });
        tl.to(inner, {
          borderRadius: "80px",
          duration: 1.5,
          ease: "power2.in"
        }, "<");
      } else {
        tl.to(card, {
          scale: 0.8,
          filter: 'blur(15px)',
          opacity: 0.3,
          duration: 1
        });
        tl.to(inner, {
          borderRadius: "100px",
          duration: 1
        }, "<");
      }

      // Reveal text with staggered cinematic entrance for remaining cards
      if (i > 0) {
        gsap.fromTo([title, desc],
          { y: 150, opacity: 0, filter: 'blur(15px)' },
          {
            y: 0,
            opacity: (_index: number, target: HTMLElement) => target.classList.contains('service-title') ? 0.9 : 0.6,
            filter: 'blur(0px)',
            duration: 1.5,
            stagger: 0.3,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left center",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen bg-[var(--bg-primary)] transition-colors duration-500 overflow-hidden z-[50]"
    >
      {/* Section label on top-left of the screen */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-50 text-xs md:text-sm font-black uppercase tracking-[0.3em] text-white">
        our services
      </div>

      <div
        ref={containerRef}
        className="relative h-full w-full flex items-center justify-center p-0"
      >
        {SERVICES.map((service, index) => (
          <div
            key={service.id}
            className="service-card absolute w-full h-full flex items-center justify-center"
            id={`service-${index}`}
            style={{ zIndex: SERVICES.length - index }}
          >
            <div className="card-inner relative w-full h-full bg-transparent overflow-hidden group">
              {/* Background Video */}
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3s] ease-out opacity-100"
              >
                <source src={service.video} type="video/mp4" />
              </video>

              {/* Text Container */}
              <div className="relative z-10 w-full h-full p-8 md:p-32 flex flex-col justify-center gap-8">
                <div className="service-title text-4xl md:text-[10vw] font-display font-black tracking-tighter text-white uppercase leading-[0.8] max-w-5xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]" id={`service-title-${index}`}>
                  {service.title}
                </div>
                <div className="service-desc text-lg md:text-2xl font-bold text-white/80 max-w-2xl leading-relaxed uppercase tracking-widest drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]" id={`service-desc-${index}`}>
                  {service.description}
                </div>

                <div className="absolute top-12 right-12 text-xs font-mono text-white/60 tracking-[0.5em] font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  [{service.id}_HEAVEN]
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grain-overlay" />
    </section>
  );
}
