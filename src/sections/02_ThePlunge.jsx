import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThePlunge() {
  const plungeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Basic fade to deep indigo on scroll
      gsap.to(".plunge-bg", {
        backgroundColor: "#11212b",
        ease: "none",
        scrollTrigger: {
          trigger: plungeRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });
      
      // Bubbles rushing up
      gsap.to(".plunge-bubbles", {
        y: "-150vh",
        ease: "none",
        scrollTrigger: {
          trigger: plungeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, plungeRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={plungeRef} id="plunge" className="plunge-bg relative w-full h-[150vh] flex items-center justify-center bg-surface-aqua overflow-hidden">
      <div className="plunge-bubbles absolute inset-0 opacity-30 flex justify-around">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-white mt-[100vh]" style={{ transform: `scale(${Math.random() * 2 + 1})` }} />
        ))}
      </div>
      
      <div className="relative z-10 text-center px-6">
        <h2 className="font-display text-4xl md:text-6xl text-white tracking-widest uppercase font-bold text-outline drop-shadow-xl">
          DESCEND INTO THE UNKNOWN
        </h2>
      </div>
    </section>
  );
}
