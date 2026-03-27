import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InteractiveSwarm from "../components/InteractiveSwarm";

gsap.registerPlugin(ScrollTrigger);

export default function SunlightZone() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        const { isMobile } = context.conditions;

        // Subtle background parallax
        gsap.to(contentRef.current, {
          y: isMobile ? -50 : -100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });

        // Staggered reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 10%",
            toggleActions: "play none none reverse",
          }
        });

        tl.fromTo(badgeRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );

        tl.fromTo(titleRef.current,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.5"
        );

        tl.fromTo(descRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );

        tl.fromTo(hintRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sunlight" className="relative w-full min-h-[100vh] bg-[#0a141e] flex items-center overflow-hidden">
      
      {/* FULLSCREEN BACKGROUND SWARM */}
      <InteractiveSwarm />

      {/* Elegant Murky Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#041e2a]/80 z-10 pointer-events-none" />

      {/* Content Container */}
      <div ref={contentRef} className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center">
        <div className="max-w-2xl px-2">

          <div ref={badgeRef} className="inline-flex items-center gap-3 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-surface-cyan/30 bg-surface-cyan/10 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.2)] mb-6 md:mb-8" style={{ opacity: 0, willChange: "transform, opacity" }}>
            <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surface-cyan opacity-80"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-surface-cyan"></span>
            </span>
            <p className="font-display text-[8px] sm:text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] font-bold uppercase text-surface-cyan">
              Interactive Biosphere Simulation
            </p>
          </div>

          <div className="overflow-hidden">
            <h2 ref={titleRef} className="font-display text-4xl sm:text-5xl md:text-7xl text-white font-bold tracking-tight uppercase mb-4 md:mb-6 leading-[1.05] drop-shadow-2xl text-balance" style={{ opacity: 0, willChange: "transform, opacity" }}>
              Here, life <span className="text-surface-aqua">thrives</span>
            </h2>
          </div>
          
          <div className="overflow-hidden">
            <p ref={descRef} className="text-white/80 text-lg sm:text-xl font-light leading-relaxed mb-6 border-l-2 border-surface-aqua pl-4 md:pl-5 drop-shadow-lg max-w-xl text-pretty" style={{ opacity: 0, willChange: "transform, opacity" }}>
              Light still reaches down to 200 meters. This is the only zone where photosynthesis occurs.
            </p>
          </div>

          <p ref={hintRef} className="text-white/60 text-xs sm:text-sm font-light mt-8 border border-white/5 bg-black/20 backdrop-blur-sm p-4 rounded-xl max-w-md hidden md:block" style={{ opacity: 0, willChange: "transform, opacity" }}>
            <strong>Hint:</strong> Move your cursor fiercely across the screen to scatter the glowing schools of fish.
          </p>
          
          <p ref={hintRef} className="text-white/60 text-xs sm:text-sm font-light mt-6 sm:mt-8 border border-white/5 bg-black/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl max-w-md md:hidden" style={{ opacity: 0, willChange: "transform, opacity" }}>
            <strong>Hint:</strong> Tap the screen to scatter the glowing schools of fish.
          </p>

        </div>
      </div>

    </section>
  );
}
