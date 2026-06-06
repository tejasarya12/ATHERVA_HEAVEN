/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import gsap from '@/lib/gsap';

export default function WaveTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Define a global function to trigger the wave
    (window as any).triggerWaveTransition = (onComplete?: () => void) => {
      if (!containerRef.current || !pathRef.current) return;

      const path = pathRef.current;
      const container = containerRef.current;

      const startPath = "M0,1000 C300,1000 700,1000 1000,1000 L1000,1000 L0,1000 Z";
      const midPath = "M0,1000 C300,800 700,500 1000,600 L1000,1000 L0,1000 Z";
      const fullPath = "M0,1000 C300,1000 700,1000 1000,1000 L1000,0 L0,0 Z";
      
      const outMidPath = "M0,0 C300,200 700,500 1000,400 L1000,0 L0,0 Z";
      const outEndPath = "M0,0 C300,0 700,0 1000,0 L1000,0 L0,0 Z";

      gsap.set(container, { pointerEvents: "all", zIndex: 99999 });
      gsap.set(path, { attr: { d: startPath } });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { pointerEvents: "none" });
          if (onComplete) onComplete();
        }
      });

      // Wave going up
      tl.to(path, {
        attr: { d: midPath },
        duration: 0.4,
        ease: "power2.in"
      })
      .to(path, {
        attr: { d: fullPath },
        duration: 0.4,
        ease: "power2.out"
      })
      // Wave going down to reveal next content
      .to(path, {
        attr: { d: outMidPath },
        duration: 0.4,
        ease: "power2.in",
        delay: 0.2 // brief pause fully covered
      })
      .to(path, {
        attr: { d: outEndPath },
        duration: 0.4,
        ease: "power2.out"
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M0,1000 C300,1000 700,1000 1000,1000 L1000,1000 L0,1000 Z"
          fill="#111111"
        />
      </svg>
    </div>
  );
}
