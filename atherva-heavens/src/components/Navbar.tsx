/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-6 z-[10000] flex justify-center px-4 pointer-events-none">
      <nav
        className={`liquid-glass pointer-events-auto flex items-center justify-between gap-4 md:gap-8 rounded-full px-4 md:px-6 py-2 md:py-3 transition-all duration-700 ease-out ${
          scrolled ? "w-[min(680px,90vw)] scale-[0.98]" : "w-[min(820px,92vw)]"
        }`}
      >
        <a href="#top" className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/90">
          Atherva<span className="text-accent">.</span>Heavens
        </a>
        <ul className="hidden gap-1 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="group relative inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                <span className="absolute inset-0 -z-10 rounded-full bg-white/0 transition-all duration-500 group-hover:bg-white/10" />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-white px-4 py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-black transition-transform hover:scale-105"
        >
          Begin
        </a>
      </nav>
    </header>
  );
}
