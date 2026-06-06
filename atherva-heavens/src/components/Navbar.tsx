/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import gsap from "@/lib/gsap";

const links = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" }

];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current || !btnRef.current) return;

    const openTl = gsap.timeline({ paused: true });
    const closeTl = gsap.timeline({ paused: true });

    openTl
      .set(btnRef.current, { pointerEvents: "none" })
      .to(navRef.current, {
        clipPath: "circle(200% at calc(100vw - 60px) 60px)",
        duration: 1.5,
        ease: "power4.out",
      }, 0)
      .to(navRef.current.querySelectorAll('li'), {
        x: 0,
        opacity: 1,
        pointerEvents: "all",
        duration: 1.25,
        stagger: 0.1,
        ease: "elastic.out(1.15, .95)",
      }, 0)
      .to(btnRef.current.querySelector('.close'), {
        opacity: 1,
        yPercent: -125,
        duration: 1,
        ease: "power4.out",
      }, 0)
      .to(btnRef.current.querySelector('.line'), {
        opacity: 0,
        yPercent: -125,
        duration: 1,
        ease: "power4.out",
      }, 0)
      .set(btnRef.current, { pointerEvents: "all" });

    closeTl
      .set(btnRef.current, { pointerEvents: "none" })
      .to(navRef.current.querySelectorAll('li'), {
        x: -200,
        opacity: 0,
        pointerEvents: "none",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      }, 0)
      .to(navRef.current, {
        clipPath: "circle(0px at calc(100vw - 60px) 60px)",
        duration: 1.2,
        ease: "power4.out",
      }, "-=1")
      .to(btnRef.current.querySelector('.btn--bg'), {
        scale: 0.9,
        duration: 0.25,
        ease: "power2.out",
      }, "-=.9")
      .to(btnRef.current.querySelector('.btn--bg'), {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      }, "-=.5")
      .to(btnRef.current.querySelector('.close'), {
        opacity: 0,
        yPercent: 125,
        duration: 1,
        ease: "power4.out",
      }, 0)
      .to(btnRef.current.querySelector('.line'), {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
      }, 0)
      .set(btnRef.current, { pointerEvents: "all" });

    // Initial state setup to fix glitches
    if (!menuActive) {
      gsap.set(navRef.current, { clipPath: "circle(0px at calc(100vw - 60px) 60px)" });
      gsap.set(btnRef.current.querySelector('.close'), { opacity: 0, yPercent: 125 });
    }

  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);

    // Play the corresponding timeline based on new state
    const nav = navRef.current;
    const btn = btnRef.current;
    if (!nav || !btn) return;

    if (!menuActive) {
      // Opening logic
      gsap.set(btn, { pointerEvents: "none" });
      gsap.to(nav, { clipPath: "circle(200% at calc(100vw - 60px) 60px)", duration: 1.5, ease: "power4.out" });
      gsap.to(nav.querySelectorAll('li'), { x: 0, opacity: 1, pointerEvents: "all", duration: 1.25, stagger: 0.1, ease: "elastic.out(1.15, .95)" });
      gsap.to(btn.querySelector('.close'), { opacity: 1, yPercent: -125, duration: 1, ease: "power4.out" });
      gsap.to(btn.querySelector('.line'), { opacity: 0, yPercent: -125, duration: 1, ease: "power4.out" });
      gsap.set(btn, { pointerEvents: "all", delay: 1 });
    } else {
      // Closing logic
      gsap.set(btn, { pointerEvents: "none" });
      gsap.to(nav.querySelectorAll('li'), { x: -200, opacity: 0, pointerEvents: "none", duration: 1, stagger: 0.1, ease: "power4.out" });
      gsap.to(nav, { clipPath: "circle(0px at calc(100vw - 60px) 60px)", duration: 1.2, ease: "power4.out", delay: 0.2 });
      gsap.to(btn.querySelector('.btn--bg'), { scale: 0.9, duration: 0.25, ease: "power2.out", delay: 0.3 });
      gsap.to(btn.querySelector('.btn--bg'), { scale: 1, duration: 0.25, ease: "power2.out", delay: 0.7 });
      gsap.to(btn.querySelector('.close'), { opacity: 0, yPercent: 125, duration: 1, ease: "power4.out" });
      gsap.to(btn.querySelector('.line'), { opacity: 1, yPercent: 0, duration: 1, ease: "power4.out" });
      gsap.set(btn, { pointerEvents: "all", delay: 1.2 });
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-6 z-[10000] flex justify-center px-4 pointer-events-none">
        <div className="flex items-center gap-3 w-full max-w-5xl justify-center">
          <nav
            className={`liquid-glass-navbar pointer-events-auto flex items-center justify-between gap-4 md:gap-8 rounded-full pl-4 md:pl-6 pr-[4px] md:pr-[5px] h-10 md:h-12 transition-all duration-700 ease-out flex-1 ${scrolled ? "max-w-[580px] scale-[0.98]" : "max-w-[720px]"
              }`}
          >
            <a href="#top" className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white font-4">
              Atharva<span className="text-accent">.</span>Heaven
            </a>
            <ul className="hidden gap-1 md:flex">
              {links.filter(l => l.label !== "Home").map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector(l.href) as HTMLElement;
                      if (target && (window as any).triggerWaveTransition) {
                        (window as any).triggerWaveTransition();
                        setTimeout(() => {
                          window.scrollTo({ top: target.offsetTop, behavior: 'auto' });
                        }, 800); // 0.8s is when the wave covers the screen
                      } else if (target) {
                        window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
                      }
                    }}
                    className="group relative inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white font-5"
                  >
                    <span className="absolute inset-0 -z-10 rounded-full bg-white/0 transition-all duration-500 group-hover:bg-white/10" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#contact') as HTMLElement;
                if (target && (window as any).triggerWaveTransition) {
                  (window as any).triggerWaveTransition();
                  setTimeout(() => {
                    window.scrollTo({ top: target.offsetTop, behavior: 'auto' });
                  }, 800);
                } else if (target) {
                  window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
                }
              }}
              className="hidden md:inline-flex items-center justify-center rounded-full bg-white px-5 h-[32px] md:h-[38px] text-[10px] md:text-xs font-semibold uppercase tracking-wider text-black transition-transform hover:scale-105 font-5"
            >
              Contact Us
            </a>
          </nav>
          <div className="pointer-events-auto shrink-0 flex items-center gap-2">
            <ThemeToggle />

            <button ref={btnRef} className="mobile-nav-btn block md:hidden" onClick={toggleMenu}>
              <div className="btn--bg"></div>
              <div className="icons">
                <svg viewBox="0 0 448 512" className="line">
                  <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
                </svg>
                <svg viewBox="0 0 320 512" className="close">
                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <nav ref={navRef} className="mobile-nav-overlay md:hidden">
        <ul>
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu();
                  const target = document.querySelector(l.href) as HTMLElement;
                  if (target && (window as any).triggerWaveTransition) {
                    setTimeout(() => {
                      (window as any).triggerWaveTransition();
                      setTimeout(() => {
                        window.scrollTo({ top: target.offsetTop, behavior: 'auto' });
                      }, 800);
                    }, 1200); // Wait for menu to close
                  } else if (target) {
                    window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
                  }
                }}
              >
                <span>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
