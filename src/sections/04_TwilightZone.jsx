import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TwilightZone() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const quote1Ref = useRef(null);
  const quote2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        const { isMobile } = context.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: isMobile ? 1 : true, // Smoother scrub for mobile
          }
        });

        // High-performance parallax using yPercent on an oversized container
        // On mobile, we reduce the movement slightly to avoid harsh crops
        tl.to(bgRef.current, { 
          yPercent: isMobile ? 15 : 20, 
          ease: "none" 
        }, 0);
      });

      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          end: "top 5%",
          toggleActions: "play none none reverse",
        }
      });

      contentTl.fromTo(badgeRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
      contentTl.fromTo(titleRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.3"
      );
      contentTl.fromTo(quote1Ref.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
      contentTl.fromTo(quote2Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="twilight" 
      className="relative w-full h-[120vh] bg-[#01080e] overflow-hidden flex flex-col items-center justify-center"
    >
      
      {/* High-Performance GSAP Parallax Layer */}
      <div 
        ref={bgRef}
        className="absolute left-0 right-0 -top-[20%] h-[140%] w-full bg-cover bg-center opacity-40 filter grayscale brightness-75 contrast-125 pointer-events-none will-change-transform"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* Atmospheric Overlays */}
      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black via-[#01080e]/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center max-w-5xl">
        
        <div className="overflow-hidden">
          <p ref={badgeRef} className="text-[#00c5ff] font-display text-[10px] sm:text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-8 uppercase border border-cyan-500/30 rounded-full px-6 py-2 md:px-10 bg-cyan-950/20 backdrop-blur-md" style={{ opacity: 0 }}>
            Depth: 200m - 1000m
          </p>
        </div>
        
        <div className="overflow-hidden">
          <h2 ref={titleRef} className="text-5xl sm:text-7xl md:text-9xl font-display font-black text-white mb-8 md:mb-10 leading-[0.9] tracking-tighter drop-shadow-2xl text-balance" style={{ opacity: 0 }}>
            THE <span className="text-white">TWILIGHT</span> ZONE
          </h2>
        </div>
        
        <div className="space-y-6 md:space-y-8">
          <div className="overflow-hidden">
            <p ref={quote1Ref} className="text-2xl sm:text-3xl md:text-5xl text-white/60 font-light italic leading-snug px-6 md:px-8 border-l-4 border-cyan-500/50 text-balance mx-auto max-w-3xl" style={{ opacity: 0 }}>
              &ldquo;Light begins to fade.&rdquo;
            </p>
          </div>
          <div className="overflow-hidden">
            <p ref={quote2Ref} className="text-lg sm:text-xl md:text-2xl text-white/40 font-extralight tracking-[0.1em] md:tracking-widest max-w-2xl mx-auto leading-relaxed uppercase" style={{ opacity: 0 }}>
              Silence grows deeper.
            </p>
          </div>
        </div>
      </div>


    </section>
  );
}
