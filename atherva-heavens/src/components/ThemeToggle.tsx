/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Always start in dark mode on refresh
    setTheme("dark");
    document.documentElement.classList.remove("light");
    // Clear any previously saved preferences
    localStorage.removeItem("theme");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <div className="relative group inline-flex items-center justify-center">
      <button
        onClick={toggleTheme}
        className={`relative flex items-center justify-center rounded-full w-10 h-10 cursor-pointer select-none transition-all duration-500 outline-none hover:bg-white/10 ${
          theme === "dark"
            ? "text-white"
            : "text-black hover:bg-black/5"
        }`}
        aria-label="Toggle dark and light theme"
      >
        <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-[#3c4043]/30 group-hover:bg-[#3c4043]/60' : 'bg-[#e8eaed]/50 group-hover:bg-[#e8eaed]'} scale-90`} />
        
        {theme === "dark" ? (
          // Sun Icon (Switch to light)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 relative z-10 transition-transform duration-500 hover:rotate-90"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          // Moon Icon (Switch to dark)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 relative z-10 transition-transform duration-500 hover:-rotate-12"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </button>

      {/* Tooltip */}
      <div className="absolute top-full right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 mt-2 px-3 py-1.5 bg-[#f1f3f4] text-[#202124] text-[13px] font-sans rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[99999] border border-black/5 font-medium tracking-normal">
        Switch to {theme === "dark" ? "light" : "dark"} theme
      </div>
    </div>
  );
}
