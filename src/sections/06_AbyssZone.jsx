import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMousePosition } from "../hooks/useMousePosition";

gsap.registerPlugin(ScrollTrigger);

export default function AbyssZone() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const promptRef = useRef(null);
  const { x, y } = useMousePosition();

  useEffect(() => {
    // Update CSS variables for the flashlight mask
    const updatePosition = (clientX, clientY) => {
      if (sectionRef.current && containerRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const relativeX = clientX - rect.left;
        const relativeY = clientY - rect.top;

        containerRef.current.style.setProperty("--mouse-x", `${relativeX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${relativeY}px`);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    updatePosition(x, y);

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
    };
  }, [x, y]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Apple-style text slide up reveal
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(promptRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="abyss" className="relative w-full h-screen bg-abyss-black overflow-hidden flex items-center justify-center">
      


      {/* Background Dark Void */}
      <div className="absolute inset-0 z-0">
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-6xl md:text-8xl font-bold text-white/5 whitespace-nowrap select-none">
          THE ABYSS
        </h2>
      </div>

      {/* Flashlight Masked Layer */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10 clip-mask-flashlight pointer-events-none"
        style={{ '--mouse-x': '50%', '--mouse-y': '50%' }}
      >
        <div className="w-full h-full bg-abyss-deep flex flex-col items-center justify-center">
          <div ref={textRef} className="flex flex-col items-center" style={{ opacity: 0, willChange: "transform, opacity" }}>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-neon-green tracking-cinematic drop-shadow-[0_0_15px_#39ff14] mb-4 text-center max-w-4xl px-4 leading-tight uppercase">
              The unknown begins here.
            </h2>
            <p className="text-xl md:text-3xl text-white/70 font-light tracking-widest text-center uppercase">
              Infinite pressure. Infinite silence.
            </p>
          </div>

          {/* Revealed Creatures */}
          <div className="absolute top-1/4 left-1/4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_15px_#ff00ff]" />
            <div className="w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_15px_#ff00ff]" />
            <span className="text-neon-pink text-xs uppercase tracking-widest ml-4">Anglerfish</span>
          </div>

          <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center gap-2">
            <span className="text-neon-blue text-xs uppercase tracking-widest">Gulper Eel</span>
            <div className="w-6 h-1 rounded-full bg-neon-blue shadow-[0_0_10px_#00ffff]" />
          </div>
        </div>
      </div>

      {/* Persistent Prompt */}
      <div ref={promptRef} className="relative z-20 absolute bottom-12 text-center w-full pointer-events-none" style={{ opacity: 0, willChange: "transform, opacity" }}>
        <p className="text-white/30 text-xs tracking-cinematic uppercase animate-pulse">
          {typeof window !== 'undefined' && window.innerWidth < 768 ? 'Tap/Drag to explore' : 'Move your cursor to explore'}
        </p>
      </div>

    </section>
  );
}
