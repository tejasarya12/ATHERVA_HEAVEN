/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowingInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  buttonClassName?: string;
  onSubmit?: () => void;
}

export default function GlowingInput({
  value,
  onChange,
  placeholder,
  onFocus,
  onBlur,
  className,
  buttonClassName,
  onSubmit,
}: GlowingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <div className="relative w-full flex items-center">
      {/* Real input, styled transparently and layered on top to capture typing & selection */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit?.();
          }
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "absolute inset-0 w-full h-full bg-transparent text-transparent caret-transparent border-none outline-none z-10 cursor-text select-text",
          className
        )}
        style={{
          color: "transparent",
          caretColor: "transparent",
          background: "transparent",
          border: "none",
        }}
      />

      {/* Visual presentation layer mimicking the input typography and layout */}
      <div
        className={cn(
          "w-full bg-transparent border-b border-[var(--border-color)] py-4 text-left pointer-events-none flex items-center relative transition-all duration-500",
          isFocused ? "border-current" : "",
          className
        )}
        style={{ borderWidth: 0, borderBottomWidth: "1px" }}
      >
        <div className="flex items-center relative whitespace-pre overflow-hidden max-w-[calc(100%-80px)]">
          {/* Typed characters */}
          <span className="text-current transition-colors duration-500">{value}</span>

          {/* Custom blinking glowing caret with spotlight beam */}
          <span
            className={cn(
              "w-[2.5px] h-[1.3em] bg-current relative inline-block shrink-0 transition-opacity duration-300 ml-[1px]",
              isFocused ? "opacity-100 animate-caret-blink" : "opacity-0"
            )}
            style={{
              boxShadow: "0 0 8px rgba(0, 210, 255, 0.8), 0 0 15px rgba(0, 114, 255, 0.6)",
            }}
          >
            {/* Spotlight outer soft glow cone */}
            <span
              className="absolute left-[2.5px] top-1/2 -translate-y-1/2 w-[180px] h-[64px] pointer-events-none origin-left opacity-90 transition-transform duration-300"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0, 114, 255, 0.75) 0%, rgba(0, 210, 255, 0.35) 35%, rgba(0, 210, 255, 0) 100%)",
                clipPath: "polygon(0 42%, 100% 0, 100% 100%, 0 58%)",
                filter: "blur(6px)",
              }}
            />
            {/* Spotlight inner bright core cone */}
            <span
              className="absolute left-[2.5px] top-1/2 -translate-y-1/2 w-[100px] h-[40px] pointer-events-none origin-left opacity-95 transition-transform duration-300"
              style={{
                background:
                  "linear-gradient(90deg, rgba(164, 244, 253, 0.95) 0%, rgba(0, 210, 255, 0.5) 45%, rgba(0, 210, 255, 0) 100%)",
                clipPath: "polygon(0 45%, 100% 12%, 100% 88%, 0 55%)",
                filter: "blur(3px)",
              }}
            />
          </span>

          {/* Placeholder layer shown when value is empty */}
          {!value && (
            <span className="absolute left-0 text-current opacity-15 uppercase transition-colors duration-500 select-none">
              {placeholder}
            </span>
          )}
        </div>
      </div>

      {/* Controlled Submit Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSubmit?.();
        }}
        className={cn(
          "absolute right-0 bottom-4 transition-opacity z-20 pointer-events-auto p-2 magnetic font-black text-[10px] uppercase tracking-widest text-current",
          value ? "opacity-100 hover:scale-105" : "opacity-30",
          buttonClassName
        )}
      >
        Submit
      </button>
    </div>
  );
}
