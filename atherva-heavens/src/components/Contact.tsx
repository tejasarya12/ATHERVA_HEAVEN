/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import GlowingInput from './GlowingInput';
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<SVGFETurbulenceElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { t, language } = useLanguage();

  const handleSubmit = async () => {
    if (!mobileNumber) {
      alert("Mobile number is required.");
      return;
    }
    if (mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      await fetch("https://formsubmit.co/ajax/anithanaik656@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "New Callback Request!",
          message: `A new user requested a callback. Their number is: ${mobileNumber}`
        })
      });
      setSubmitted(true);
      setMobileNumber('');
      setTimeout(() => setSubmitted(false), 5000);

      // Confetti Animation
      const createConfetti = () => {
        const colors = ['#fde047', '#38bdf8', '#818cf8', '#a78bfa', '#ec4899', '#ffffff'];
        const piece = document.createElement('div');
        piece.style.position = 'fixed';
        piece.style.left = '50%';
        piece.style.top = '60%';
        piece.style.width = `${Math.random() * 6 + 4}px`;
        piece.style.height = piece.style.width;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        piece.style.zIndex = '9999';
        piece.style.pointerEvents = 'none';
        document.body.appendChild(piece);
        return piece;
      };

      for (let i = 0; i < 40; i++) {
        const piece = createConfetti();
        const angle = gsap.utils.random(210, 330) * (Math.PI / 180);
        const velocity = gsap.utils.random(200, 500);
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        // Horizontal movement & rotation
        gsap.to(piece, {
          x: tx,
          rotation: gsap.utils.random(-720, 720),
          duration: gsap.utils.random(1.5, 2.5),
          ease: "power2.out",
          onComplete: () => piece.remove()
        });

        // Vertical movement (gravity simulation)
        gsap.to(piece, {
          y: ty,
          duration: gsap.utils.random(0.5, 0.8),
          ease: "power2.out",
          onComplete: () => {
            gsap.to(piece, {
              y: ty + 400,
              duration: gsap.utils.random(1, 1.5),
              ease: "power2.in"
            });
          }
        });
      }

    } catch (error) {
      console.error(error);
      alert("Failed to send request. Please try again.");
    }
  };

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

    const gridContainer = document.getElementById('contact-grid');

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      }
    });

    scrollTl.fromTo(gridContainer,
      { scale: 0.8, opacity: 0, y: 100 },
      { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )
      .to(gridContainer, {
        scale: 0.9,
        opacity: 0.5,
        duration: 0.5,
        ease: "power2.in"
      });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      scrollTl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative min-h-screen w-full bg-[var(--bg-primary)] transition-colors duration-500 flex flex-col items-center justify-center p-8 overflow-hidden z-[40]"
    >
      {/* Plastic Overlay Layer */}
      <div
        className="absolute inset-0 pointer-events-none z-30 opacity-60 mix-blend-screen animate-pulse duration-1000"
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

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 bg-[var(--glass-bg)] border border-[var(--border-color)] transition-colors duration-500" id="contact-grid">
        {/* Bold section title in card top-left corner */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 text-xs md:text-sm font-black uppercase tracking-[0.3em] text-[var(--text-primary)] z-50">
          {t("contact.label")}
        </div>

        {/* Left: Large Text */}
        <div className="p-6 md:p-16 flex items-center justify-center border-b md:border-b-0 md:border-r border-[var(--border-color)] transition-colors duration-500 overflow-hidden">
          <h2 className={`font-black leading-[0.85] tracking-tighter uppercase opacity-90 select-none text-[var(--text-primary)] transition-colors duration-500 text-center lg:text-left font-8 ${language === 'kn' ? 'text-4xl md:text-6xl lg:text-[6vw] break-words' : 'text-5xl md:text-6xl lg:text-[10vw]'}`} style={{ whiteSpace: 'pre-line' }}>
            {t("contact.title")}
          </h2>
        </div>

        {/* Right: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Box 1: Location */}
          <div className="p-6 md:p-12 border-b md:border-r border-[var(--border-color)] transition-colors duration-500 flex flex-col justify-between group min-h-[250px] md:min-h-[300px]">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-[var(--text-primary)] opacity-40 uppercase mb-6 block font-bold transition-all duration-500 font-9">{t("contact.location.label")}</span>
              <h4 className="text-xl font-medium opacity-87 leading-tight text-[var(--text-primary)] transition-colors duration-500 font-10">
                {t("contact.location.address").split(', ').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && i % 2 !== 0 && <br />}
                    {i < arr.length - 1 && i % 2 === 0 && ', '}
                  </span>
                ))}
              </h4>
            </div>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Atharva+Heaven+Touch+Spa+&+Salon+opposit+Indian+Bank+Veerannana++7th+A+Cross+Rd+Nagavara+Bengaluru+Karnataka+560045" target="_blank" rel="noreferrer" className="w-fit">
              <button className="px-6 py-2 border border-[var(--border-color)] rounded-full text-[10px] font-bold tracking-widest hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-500 magnetic uppercase">
                {t("contact.location.btn")}
              </button>
            </a>
          </div>

          {/* Box 2: Get a call from us */}
          <div
            className={`contact-glow-box p-6 md:p-12 border-b border-[var(--border-color)] flex flex-col justify-between min-h-[250px] md:min-h-[300px] transition-all duration-700 ${isFocused ? 'focused' : ''}`}
          >
            <div>
              <span className="text-[10px] tracking-[0.4em] text-[var(--text-primary)] opacity-40 uppercase mb-6 block font-bold transition-all duration-500 font-9">{t("contact.callback.label")}</span>
              <div className="relative mt-4">
                <GlowingInput
                  value={mobileNumber}
                  onChange={(val) => {
                    const digits = val.replace(/\D/g, '');
                    if (digits.length <= 10) setMobileNumber(digits);
                  }}
                  placeholder={t("contact.callback.placeholder")}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="text-lg font-black uppercase tracking-tighter"
                  onSubmit={handleSubmit}
                />
                {submitted && (
                  <p className="absolute -bottom-8 left-0 text-[10px] text-green-400 font-bold tracking-widest uppercase transition-opacity duration-500">
                    {t("contact.callback.success")}
                  </p>
                )}
              </div>
            </div>
            <p className="text-[9px] opacity-20 uppercase tracking-[0.4em] font-medium text-[var(--text-primary)] transition-colors duration-500">{t("contact.callback.desc")}</p>
          </div>



          {/* Box 3: Trading Hours */}
          <div className="p-6 md:p-12 border-b md:border-b-0 md:border-r border-[var(--border-color)] transition-colors duration-500 flex flex-col justify-between min-h-[250px] md:min-h-[300px]">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-[var(--text-primary)] opacity-40 uppercase mb-6 block font-bold transition-all duration-500 font-9">{t("contact.hours.label")}</span>
              <div className="space-y-2 text-[11px] opacity-70 uppercase tracking-widest leading-relaxed font-medium text-[var(--text-primary)] transition-all duration-500 font-10">
                <div className="flex justify-between"><span>{t("contact.hours.mon_fri")}</span> <span>{t("contact.hours.mon_fri_time")}</span></div>
                <div className="flex justify-between"><span>{t("contact.hours.sat_sun")}</span> <span>{t("contact.hours.sat_sun_time")}</span></div>
              </div>
            </div>
          </div>

          {/* Box 4: Contact */}
          <div className="p-6 md:p-12 border-b md:border-b-0 border-[var(--border-color)] transition-colors duration-500 flex flex-col justify-between min-h-[250px] md:min-h-[300px]">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-[var(--text-primary)] opacity-40 uppercase mb-6 block font-bold transition-all duration-500 font-9">{t("contact.social.label")}</span>
              <div className="space-y-4 font-10">
                <div className="text-sm opacity-60 flex flex-col gap-1 text-[var(--text-primary)] transition-all duration-500">
                  <p className="hover:text-[#38bdf8]"><a href="tel:6360118439">6360118439</a></p>
                </div>
                <p className="text-sm opacity-87 border-b border-[var(--border-color)]/40 pb-2 inline-block text-[var(--text-primary)] transition-all duration-500 hover:text-[#38bdf8]">
                  <a href="mailto:anithanaik656@gmail.com">anithanaik656@gmail.com</a>
                </p>

              </div>
            </div>
          </div>


        </div>
      </div>

      <div className="grain-overlay" />
    </section>
  );
}
