/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasLeftRef = useRef<HTMLCanvasElement>(null);
  const canvasRightRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState(0);
  const totalFrames = 74;
  const frames = useRef<HTMLImageElement[]>([]);
  const ZOOM_FACTOR = 1.0;

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/frames/ffout${String(i).padStart(3, '0')}.gif`;
      img.onload = () => {
        loadedCount++;
        setLoaded(Math.round((loadedCount / totalFrames) * 100));
      };
      frames.current.push(img);
    }
  }, []);

  const drawFrame = (index: number) => {
    if (!canvasLeftRef.current || !canvasRightRef.current || frames.current.length === 0) return;

    const img = frames.current[index];
    if (!img || !img.complete) return;

    // We draw the full image on both canvases, but CSS positioning handles the split.
    // Both canvases are the same size (full screen width/height).
    const canvases = [canvasLeftRef.current, canvasRightRef.current];

    canvases.forEach(canvas => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      drawWidth *= ZOOM_FACTOR;
      drawHeight *= ZOOM_FACTOR;
      offsetX = (canvas.width - drawWidth) / 2 - 13.6;
      offsetY = (canvas.height - drawHeight) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasLeftRef.current && canvasRightRef.current) {
        // Both canvases act as full screen canvases
        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvasLeftRef.current.width = w * dpr;
        canvasLeftRef.current.height = h * dpr;
        canvasRightRef.current.width = w * dpr;
        canvasRightRef.current.height = h * dpr;
        // Redraw current frame to avoid flicker on resize
        requestAnimationFrame(() => drawFrame(0));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded]);

  useEffect(() => {
    if (loaded < 100) return;
    if (!sectionRef.current || !containerRef.current || !leftDoorRef.current || !rightDoorRef.current || !textRef.current || !canvasLeftRef.current) return;

    // Initial draw
    drawFrame(0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 1.5,
        pinSpacing: false,
        onUpdate: (self) => {
          // Frame sequence plays across the first 60% of the scroll
          const progress = Math.min(self.progress / 0.6, 1);
          const frameIndex = Math.min(Math.floor(progress * totalFrames), totalFrames - 1);
          requestAnimationFrame(() => drawFrame(frameIndex));
        }
      }
    });

    // Enforce timeline duration to be exactly 100 for easy percentage mapping
    tl.to({}, { duration: 100 }, 0);



    // Door Opening (Starts at 26%, ends at 60% to match visual frames)
    tl.to(leftDoorRef.current, {
      xPercent: -100,
      duration: 25,
      ease: "power2.inOut"
    }, 26);

    tl.to(rightDoorRef.current, {
      xPercent: 100,
      duration: 25,
      ease: "power2.inOut"
    }, 26);

    // Text Fade/Dissolve (starts before door opens)
    tl.to(textRef.current, {
      opacity: 0,
      filter: "blur(40px)",
      scale: 0.8,
      duration: 2,
      ease: "power2.in"
    }, 8);

    // Final Hero Fade out to fully transition to Services
    tl.to(sectionRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 20,
    }, 50);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loaded]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen w-full overflow-hidden bg-transparent z-[60]"
    >
      {/* Loading Overlay */}
      {loaded < 100 && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black">
          <div className="text-white/50 text-sm tracking-[0.3em] font-mono mb-4 uppercase">WELCOME TO ATHERVA HEAVEN</div>
          <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
              style={{ width: `${loaded}%` }}
            />
          </div>
          <div className="text-white mt-4 text-xs font-mono">{loaded}%</div>
        </div>
      )}

      {/* Door Layers holding the split canvas */}
      <div ref={containerRef} className="absolute inset-0 z-20 flex pointer-events-none will-change-transform">
        <div
          ref={leftDoorRef}
          className="relative w-1/2 h-full overflow-hidden will-change-transform hero-door"
        >
          {/* Canvas is 200vw width to cover full screen, positioned left-0 */}
          <canvas
            ref={canvasLeftRef}
            className="absolute left-0 top-0 w-[200%] h-full max-w-none will-change-transform hero-canvas"
          />
          {/* Symmetrical detail on door edge */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-[var(--border-color)] transition-colors duration-500" />
        </div>
        <div
          ref={rightDoorRef}
          className="relative w-1/2 h-full overflow-hidden will-change-transform hero-door"
        >
          {/* Canvas is 200vw width to cover full screen, positioned right-0 */}
          <canvas
            ref={canvasRightRef}
            className="absolute right-0 top-0 w-[200%] h-full max-w-none will-change-transform hero-canvas"
          />
          {/* Symmetrical detail on door edge */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-[var(--border-color)] transition-colors duration-500" />
        </div>
      </div>

      {/* Atmospheric Fog Layers */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      </div>

      {/* Hero Typography */}
      <div
        ref={textRef}
        className="absolute bottom-8 right-4 md:bottom-12 md:right-8 z-40 select-none pointer-events-none max-w-[80vw] text-right"
      >
        <h1 className="text-[20vw] md:text-[12vw] font-display font-black leading-[0.75] tracking-[-0.07em] text-white transition-colors duration-500 uppercase drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]" style={{ WebkitFontSmoothing: 'antialiased' }}>
          ATHERVA<br />HEAVEN
        </h1>
      </div>

      {/* Ambient grain */}
      <div className="grain-overlay opacity-20 z-50 pointer-events-none" />

      {/* Scroll Indicator */}
      {/*<div className="absolute bottom-12 right-12 z-40 flex flex-col items-center gap-4 opacity-30">
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[var(--text-primary)] transition-colors duration-500">Entry_Protocol</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[var(--text-primary)] to-transparent" />
      </div>*/}
    </section>
  );
}
