import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Conclusion() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonsRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(headingRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );

      tl.fromTo(paraRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      tl.fromTo(buttonsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="conclusion" className="relative w-full h-[80vh] bg-abyss-black flex flex-col items-center justify-center overflow-hidden border-t border-white/5">



      <div className="relative z-10 text-center px-6 max-w-3xl">
        <div className="overflow-hidden">
          <h2 ref={headingRef} className="text-3xl md:text-5xl font-display font-medium text-white/90 leading-tight mb-8" style={{ opacity: 0, willChange: "transform, opacity" }}>
            We know more about <span className="text-surface-cyan">space</span> than our <span className="text-white">oceans</span>.
          </h2>
        </div>

        <div className="overflow-hidden">
          <p ref={paraRef} className="text-base md:text-lg text-white/50 leading-relaxed font-light mb-12" style={{ opacity: 0, willChange: "transform, opacity" }}>
            Deep-sea mining, plastic pollution, and overfishing threaten ecosystems millions of years in the making. We must protect what we do not yet fully understand.
          </p>
        </div>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-6" style={{ opacity: 0, willChange: "transform, opacity" }}>
          <button
            className="px-8 py-3 bg-neon-green/10 border border-neon-green text-neon-green rounded-full text-sm font-bold tracking-widest uppercase hover:bg-neon-green hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.2)]"
            data-cursor="interactive"
          >
            Protect the Ocean
          </button>

          <button
            onClick={scrollToTop}
            className="px-8 py-3 border border-white/20 text-white/80 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
            data-cursor="interactive"
          >
            Explore More
          </button>
        </div>
      </div>

      <footer className="absolute bottom-6 w-full text-center z-10">
        <p className="text-[10px] text-white/20 tracking-cinematic uppercase">
          &copy; {new Date().getFullYear()} Ocean Depths | Built for the Web
        </p>
      </footer>
    </section>
  );
}
