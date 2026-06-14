/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLanguage } from "@/contexts/LanguageContext";

export default function TranslateToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="relative group inline-flex items-center justify-center ml-4">
      <button
        onClick={toggleLanguage}
        className="relative flex items-center justify-center rounded-full w-10 h-10 cursor-pointer select-none transition-all duration-500 outline-none hover:bg-white/10 text-white"
        aria-label="Toggle language between English and Kannada"
      >
        <div className="absolute inset-0 rounded-full transition-colors duration-300 bg-[#3c4043]/30 group-hover:bg-[#3c4043]/60 scale-90" />
        
        <span className="relative z-10 font-bold text-sm transition-transform duration-500 group-hover:scale-110">
          {language === "en" ? "ಅ" : "A"}
        </span>
      </button>

      {/* Tooltip */}
      <div className="absolute top-full right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 mt-2 px-3 py-1.5 bg-[#f1f3f4] text-[#202124] text-[13px] font-sans rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[99999] border border-black/5 font-medium tracking-normal">
        {language === "en" ? "Translate to Kannada" : "Translate to English"}
      </div>
    </div>
  );
}
