/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import { useLanguage } from '@/contexts/LanguageContext';

const SERVICES_DATA = [
  {
    id: 'Jacuzzi',
    video: '/videos/service_2.mp4',
    key: 'jacuzzi'
  },
  {
    id: 'Steam Room',
    video: '/videos/service_1.mp4',
    key: 'steam'
  },
  {
    id: 'Wine Massage',
    video: '/videos/service_3.mp4',
    key: 'wine'
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const cards = gsap.utils.toArray('.service-card', containerRef.current) as HTMLElement[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${(cards.length + 1) * 200}%`,
        pin: true,
        scrub: 1.5,
        snap: {
          snapTo: "labelsDirectional",
          duration: { min: 0.5, max: 1.5 },
          delay: 0.1,
          ease: "power1.inOut"
        },
        onLeave: () => { activeCardIndex = -1; },
        onLeaveBack: () => { activeCardIndex = -1; },
        onEnterBack: () => {
          activeCardIndex = cards.length - 1;
          scrambleTls[cards.length - 1]?.restart();
        }
      }
    });

    // Add a cinematic entrance delay that aligns with the Hero door reveal
    tl.to({}, { duration: 1.5 });

    const scrambleTls: gsap.core.Timeline[] = [];
    let activeCardIndex = -1;

    cards.forEach((card, i) => {
      const inner = card.querySelector('.card-inner') as HTMLElement;
      const title = card.querySelector('.service-title') as HTMLElement;
      const desc = card.querySelector('.service-desc') as HTMLElement;

      if (!inner || !title || !desc) return;

      // 1. Prepare ScrambleText Timeline
      if (!SERVICES_DATA[i]) return;
      const serviceKey = SERVICES_DATA[i].key;
      const titleText = t(`services.${serviceKey}.title`);
      const descText = t(`services.${serviceKey}.desc`);
      title.innerText = "";
      desc.innerText = "";

      const scrambleTl = gsap.timeline({ paused: true });
      scrambleTl
        .set([title, desc], { opacity: 1 })
        .to(title, {
          duration: 1.5,
          ease: "none",
          scrambleText: {
            text: titleText,
            oldClass: "title-scrambling",
            newClass: "title-settled",
            revealDelay: 0.5
          }
        })
        .to(desc, {
          duration: 1.5,
          ease: "none",
          scrambleText: {
            text: descText,
            oldClass: "desc-scrambling",
            newClass: "desc-settled",
            revealDelay: 0.5
          }
        }, "-=1.0");

      scrambleTls.push(scrambleTl);

      // 2. Add Animations to Main Timeline
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
          { 
            scale: 1, opacity: 1, duration: 2, ease: "power3.out",
            onStart: () => {
              if (activeCardIndex !== 0) {
                activeCardIndex = 0;
                scrambleTls[0]?.restart();
              }
            }
          }
        );
        tl.set(inner, { borderRadius: "0px" }, 0);
      }

      // Add label right when the card is fully in view and centered
      tl.addLabel(`service-${i}`);
      
      // Stay centered - Trigger Scramble on forward scroll
      tl.to({}, { 
        duration: 1,
        onStart: () => {
          if (activeCardIndex !== i) {
            activeCardIndex = i;
            scrambleTls[i]?.restart();
          }
        }
      });

      // Exit left with shrink and rounding - Trigger Scramble on backward scroll
      if (i < cards.length - 1) {
        tl.to(card, {
          xPercent: -100,
          scale: 0.85,
          filter: 'blur(30px)',
          opacity: 0,
          duration: 1.5,
          ease: "power2.in",
          onReverseComplete: () => {
            if (activeCardIndex !== i) {
              activeCardIndex = i;
              scrambleTls[i]?.restart();
            }
          }
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
          duration: 1,
          onReverseComplete: () => {
            if (activeCardIndex !== i) {
              activeCardIndex = i;
              scrambleTls[i]?.restart();
            }
          }
        });
        tl.to(inner, {
          borderRadius: "100px",
          duration: 1
        }, "<");
      }
    });

    return () => {
      tl.kill();
      scrambleTls.forEach(st => st.kill());
    };
  }, [t]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen bg-[var(--bg-primary)] transition-colors duration-500 overflow-hidden z-[50]"
    >
      {/* Section label on top-left of the screen */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-50 text-xs md:text-sm font-black uppercase tracking-[0.3em] text-white">
        {t("nav.services")}
      </div>

      <div
        ref={containerRef}
        className="relative h-full w-full flex items-center justify-center p-0"
      >
        {SERVICES_DATA.map((service, index) => (
          <div
            key={service.id}
            className="service-card absolute w-full h-full flex items-center justify-center"
            id={`service-${index}`}
            style={{ zIndex: SERVICES_DATA.length - index }}
          >
            <div className="card-inner relative w-full h-full bg-transparent overflow-hidden group">
              {/* Background Video */}
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onCanPlay={(e) => {
                  const vid = e.target as HTMLVideoElement;
                  vid.playbackRate = 0.5;
                }}
                className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3s] ease-out opacity-100"
              >
                <source src={service.video} type="video/mp4" />
              </video>

              {/* Text Container */}
              <div className="relative z-10 w-full h-full p-8 pt-32 md:p-32 md:pt-48 flex flex-col justify-start items-center text-center gap-8">
                <div>
                  <span className="service-title title-settled inline text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-tight max-w-4xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] font-6" id={`service-title-${index}`} style={{ opacity: 1 }}>
                    {t(`services.${service.key}.title`)}
                  </span>
                </div>
                <div>
                  <span className="service-desc desc-settled inline text-base md:text-lg lg:text-xl font-bold max-w-2xl leading-relaxed tracking-widest drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] font-7" id={`service-desc-${index}`} style={{ opacity: 1 }}>
                    {t(`services.${service.key}.desc`)}
                  </span>
                </div>

                <div className="absolute top-12 right-12 text-xs font-mono text-white/60 tracking-[0.5em] font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  [{service.id}]
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
