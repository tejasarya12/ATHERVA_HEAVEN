/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';
import GlowingInput from './GlowingInput';

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    } catch (error) {
      console.error(error);
      alert("Failed to send request. Please try again.");
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    // Typewriter effect at the bottom
    const typewriter = document.getElementById('typewriter-text');
    if (typewriter) {
      const text = "Atharva heaven";
      let i = 0;
      const speed = 150;
      let timeoutId: any;

      const type = () => {
        if (i < text.length) {
          typewriter.innerHTML += text.charAt(i);
          i++;
          timeoutId = setTimeout(type, speed);
        }
      };

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        onEnter: () => {
          clearTimeout(timeoutId);
          typewriter.innerHTML = "";
          i = 0;
          type();
        },
        onEnterBack: () => {
          clearTimeout(timeoutId);
          typewriter.innerHTML = "";
          i = 0;
          type();
        }
      });
    }

    const waves = containerRef.current.querySelectorAll('.footer-wave');
    const waveTl = gsap.timeline({ repeat: -1, yoyo: true });
    waves.forEach((wave, i) => {
      waveTl.to(wave, {
        y: -20 + i * 10,
        scaleX: 1.2,
        duration: 3 + i,
        ease: "sine.inOut"
      }, 0);
    });

    return () => {
      waveTl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Aurora Waves */}
      <div className="relative w-full overflow-hidden leading-[0] z-10 pointer-events-none" style={{ height: '50px', marginBottom: '-1px' }}>
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="aurora-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00d2ff" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
            <linearGradient id="aurora-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0072ff" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
            <linearGradient id="aurora-grad-3" x1="100%" y1="100%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000000ff" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>

          <path
            className="footer-wave"
            d="M0,30 C240,70 480,10 720,40 C960,70 1200,10 1440,30 L1440,200 L0,200 Z"
            fill="url(#aurora-grad-1)"
          />
          <path
            className="footer-wave"
            d="M0,50 C360,10 720,80 1080,30 C1260,10 1380,60 1440,50 L1440,200 L0,200 Z"
            fill="url(#aurora-grad-2)"
          />
          <path
            className="footer-wave"
            d="M0,80 C180,60 360,20 540,50 C720,80 1080,20 1440,60 L1440,200 L0,200 Z"
            fill="url(#aurora-grad-3)"
          />
        </svg>
      </div>

    <div className="relative font-display w-full h-full flex flex-col" id="footer-container">
      <footer className="relative bg-black transition-colors duration-500 pt-20 pb-0 px-8 overflow-hidden text-white flex-1 flex flex-col justify-between">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none footer-video"
        >
          <source src="/videos/footer_background.mp4" type="video/mp4" />
        </video>

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-24 relative z-10 mb-40">

          {/* Left: Menu */}
          <div className="space-y-12">
            <h5 className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-black">Navigation</h5>
            <ul className="space-y-6 text-sm font-bold opacity-75 uppercase tracking-[0.2em]">
              <li><a href="#home" className="hover:opacity-100 transition-opacity underline-offset-4 hover:underline magnetic">Home_Base</a></li>
              <li><a href="#services" className="hover:opacity-100 transition-opacity underline-offset-4 hover:underline magnetic">Service_Story</a></li>
              <li><a href="#about" className="hover:opacity-100 transition-opacity underline-offset-4 hover:underline magnetic">Human_About</a></li>
              <li><a href="#contact" className="hover:opacity-100 transition-opacity underline-offset-4 hover:underline magnetic">Contact_End</a></li>
            </ul>
          </div>

          {/* Center: Socials */}
          <div className="space-y-12">
            <h5 className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-black">Social_Connect</h5>
            <ul className="space-y-6 text-sm font-bold opacity-75 uppercase tracking-[0.2em]">
              <li><a href="#" className="hover:opacity-100 transition-opacity magnetic">Instagram</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity magnetic">Twitter / X</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity magnetic">LinkedIn</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity magnetic">YouTube</a></li>
            </ul>
          </div>

          {/* Right: Recall */}
          <div className="w-full flex items-center justify-center lg:justify-end">
            <div className="group rounded-[2rem] p-1.5 pb-0 bg-[#ffd60a] hover:bg-[#38bdf8] transition-colors duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex flex-col w-full max-w-sm relative">

              {/* Top Content (Inner Card) */}
              <div className="bg-[black] group-hover:bg-[#fefcff] text-[white] group-hover:text-black rounded-[1.75rem] p-8 space-y-8 flex-1 shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-colors duration-500">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold opacity-90">Connect with phone</h5>
                  <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                </div>
                <p className="text-xs opacity-70 leading-relaxed font-medium">
                  Get a call from us within 12 celestial hours.
                </p>
                <div className="relative group/input w-full">
                  <GlowingInput
                    value={mobileNumber}
                    onChange={(val) => {
                      const digits = val.replace(/\D/g, '');
                      if (digits.length <= 10) setMobileNumber(digits);
                    }}
                    placeholder="Mobile number"
                    className="text-sm font-black tracking-widest w-full"
                    onSubmit={handleSubmit}
                  />
                  {submitted && (
                    <p className="absolute -bottom-8 left-0 text-[10px] text-green-500 font-bold tracking-widest uppercase transition-opacity duration-500">
                      We will reach you early
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="px-8 py-5 flex items-center justify-between text-[#111]">
                <span className="text-sm font-bold opacity-90">Contact with ease</span>
                {/* Badge of phone icon in transparent silver */}
                <div className="bg-white/40 backdrop-blur-md rounded-full p-2 shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-white/50">
                  <svg className="w-4 h-4 text-black/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mb-20 relative z-10">
          <div id="typewriter-text" className="Atharva-Heaven-footer-text text-4xl md:text-7xl font-black tracking-[0.2em] h-20 font-17"></div>
        </div>

        <div className="relative z-10 mt-10 flex justify-between items-center text-[9px] opacity-40 uppercase tracking-[0.5em] font-black pb-10">
          <span>© 2026 Atharva Heaven Studio</span>
          <span>A Stra-City, AE 0001</span>
        </div>

        <div className="grain-overlay" />
      </footer>
    </div>
    </div>
  );
}
