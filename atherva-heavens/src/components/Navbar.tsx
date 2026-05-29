/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" }

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
      <div className="flex items-center gap-3 w-full max-w-5xl justify-center">
        <nav
          className={`liquid-glass-navbar pointer-events-auto flex items-center justify-between gap-4 md:gap-8 rounded-full pl-4 md:pl-6 pr-[4px] md:pr-[5px] h-10 md:h-12 transition-all duration-700 ease-out flex-1 ${scrolled ? "max-w-[580px] scale-[0.98]" : "max-w-[720px]"
            }`}
        >
          <a href="#top" className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white">
            Atherva<span className="text-accent">.</span>Heavens
          </a>
          <ul className="hidden gap-1 md:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="group relative inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  <span className="absolute inset-0 -z-10 rounded-full bg-white/0 transition-all duration-500 group-hover:bg-white/10" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 h-[32px] md:h-[38px] text-[10px] md:text-xs font-semibold uppercase tracking-wider text-black transition-transform hover:scale-105"
          >
            Contact Us
          </a>
        </nav>
        <div className="pointer-events-auto shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
