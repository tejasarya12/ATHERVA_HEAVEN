/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Read saved theme from localStorage, default is dark
    const savedTheme = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center justify-between rounded-full p-1 w-28 h-10 md:h-12 cursor-pointer select-none transition-all duration-500 backdrop-blur-xl outline-none group border ${
        theme === "dark"
          ? "bg-black/15 border-white/10 hover:border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_4px_20px_rgba(0,0,0,0.4)]"
          : "bg-white/15 border-black/10 hover:border-black/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_4px_20px_rgba(0,0,0,0.08)]"
      }`}
      aria-label="Toggle dark and light theme"
    >
      {/* Background active texts */}
      {/* Left text "Dark" is visible when dark mode is selected (knob is on the right) */}
      <span
        className={`absolute left-3 text-[10px] uppercase font-bold tracking-widest transition-all duration-500 ease-in-out ${
          theme === "dark" ? "opacity-60 text-white translate-x-0" : "opacity-0 text-black -translate-x-2"
        }`}
      >
        Dark
      </span>

      {/* Right text "Light" is visible when light mode is selected (knob is on the left) */}
      <span
        className={`absolute right-3 text-[10px] uppercase font-bold tracking-widest transition-all duration-500 ease-in-out ${
          theme === "light" ? "opacity-60 text-black translate-x-0" : "opacity-0 text-white translate-x-2"
        }`}
      >
        Light
      </span>

      {/* Sliding Knob */}
      <div
        className={`h-full aspect-square rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-out relative z-10 ${
          theme === "dark" ? "translate-x-[72px] md:translate-x-[64px]" : "translate-x-0"
        }`}
      >
        {/* Sun Icon (shown when light theme active) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-3.5 h-3.5 text-black absolute transition-all duration-500 ${
            theme === "light" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90"
          }`}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>

        {/* Moon Icon (shown when dark theme active) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-3.5 h-3.5 text-black absolute transition-all duration-500 ${
            theme === "dark" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-90"
          }`}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </div>

      {/* Glass bubble highlight reflection effect inside the button container */}
      <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
        <div className="w-full h-1/2 bg-white/5 absolute top-0 left-0 rounded-t-full" />
      </div>
    </button>
  );
}
