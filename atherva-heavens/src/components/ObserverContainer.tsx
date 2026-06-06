/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import gsap, { ScrollTrigger } from '@/lib/gsap';

import About from './About';
import Footer from './Footer';

export default function ObserverContainer() {
  const pageRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    const main = mainRef.current;
    if (!page || !main) return;

    const sections = gsap.utils.toArray('.panel') as HTMLElement[];
    let tl: gsap.core.Timeline | null = null;
    let scrollTrigger: ScrollTrigger | null = null;

    const initScrollWipe = () => {
      // Amount of scrolling space (in pixels) to pause and let the user read before the next wipe
      const getReadingDelay = () => window.innerHeight * 1.5;

      // 1. Calculate total scroll
      const getTotalScroll = () => {
        let totalScroll = 0;
        sections.forEach(section => {
          totalScroll += section.offsetHeight;
        });
        totalScroll -= window.innerHeight;
        // Add reading delay for every section transition
        totalScroll += getReadingDelay() * (sections.length - 1);
        return totalScroll;
      };

      // 2. Setup Timeline
      tl = gsap.timeline();
      tl.addLabel("label-initial");

      sections.forEach((section, index) => {
        const nextSection = sections[index + 1];
        if (!nextSection) return;

        // Add empty space in the timeline so the user can scroll normally (read) without triggering the wipe immediately
        tl!.to({}, { duration: getReadingDelay() });

        tl!.to(nextSection, {
          y: () => -1 * nextSection.offsetHeight,
          duration: () => nextSection.offsetHeight,
          ease: 'none',
        }).addLabel(`label${index}`);
      });

      // 3. Setup ScrollTrigger
      scrollTrigger = ScrollTrigger.create({
        id: 'mainScroll',
        trigger: main,
        animation: tl,
        pin: true,
        scrub: 1, // Add a tiny bit of smoothing to scrub
        snap: {
          snapTo: (value) => {
            if (!tl) return value;
            let labels = Object.values(tl.labels);
            const snapPoints = labels.map(x => (x as number) / tl!.totalDuration());
            const proximity = 0.1;
            
            for (let i = 0; i < snapPoints.length; i++) {
              if (value > snapPoints[i] - proximity && value < snapPoints[i] + proximity) {
                return snapPoints[i];
              }
            }
            return value;
          },
          duration: { min: 0.2, max: 0.6 },
        },
        start: 'top top',
        end: () => '+=' + getTotalScroll(),
        invalidateOnRefresh: true,
      });
    };

    // Give the DOM a tiny bit of time to settle before measuring heights
    const timeoutId = setTimeout(() => {
      initScrollWipe();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (scrollTrigger) scrollTrigger.kill();
      if (tl) tl.kill();
    };
  }, []);

  return (
    <div id="page" ref={pageRef} className="relative w-full">
      <main ref={mainRef} className="relative h-screen w-full overflow-hidden z-50 bg-black">
        
        {/* About Section */}
        <section className="panel absolute h-screen w-full top-0 left-0 z-20 bg-[var(--bg-primary)] overflow-y-auto overflow-x-hidden">
          <About />
        </section>

        {/* Footer Section */}
        <section className="panel absolute h-screen w-full top-full left-0 z-30 bg-black overflow-y-auto overflow-x-hidden">
          <Footer />
        </section>

      </main>
    </div>
  );
}
