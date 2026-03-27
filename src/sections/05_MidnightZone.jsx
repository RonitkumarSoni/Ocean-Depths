import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { oceanZones } from "../data/oceanZones";
import CreatureCard from "../components/CreatureCard";
import InteractiveDroplets from "../components/InteractiveDroplets";

gsap.registerPlugin(ScrollTrigger);

export default function MidnightZone() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const zone = oceanZones[3]; // Midnight Zone

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        const { isDesktop, isMobile } = context.conditions;

        // Pin for a snappy scroll
        ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: isMobile ? "+=2000" : "+=800",
          anticipatePin: 1,
        });

        // Apple-style title reveal
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            }
          }
        );

        const cards = cardsRef.current?.children;
        if (cards) {
          if (isDesktop) {
            // DESKTOP: Vertical staggered reveal
            gsap.fromTo(cards,
              { opacity: 0, y: 80 },
              {
                opacity: 1, y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 50%",
                  toggleActions: "play none none reverse",
                }
              }
            );
          } else {
            // MOBILE: Horizontal Parallax Slide
            gsap.set(cardsRef.current, { x: "40%" });

            gsap.to(cardsRef.current, {
              x: "-60%",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=2000",
                scrub: 1,
              }
            });

            // Staggered fade in/up
            gsap.fromTo(cards,
              { opacity: 0, scale: 0.9 },
              {
                opacity: 1, scale: 1,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 40%",
                  toggleActions: "play none none reverse",
                }
              }
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="midnight" className="relative w-full h-screen bg-midnight-navy overflow-hidden">
      {/* Dim overlay when a card is expanded */}
      <div
        className={`absolute inset-0 bg-black/80 z-40 transition-opacity duration-500 pointer-events-none ${expandedCardId ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Immersive & Interactive Water Droplets (Marine Snow) */}
      <InteractiveDroplets 
        color="#00f2fe" 
        count={window.innerWidth > 768 ? 80 : 40} 
        velocity={0.3} 
        repulsion={200} 
        opacity={0.3}
      />

      <div className="relative z-10 w-full h-full flex flex-col pt-24 px-6 md:px-12">
        <div ref={titleRef} className="text-center mb-8 md:mb-12" style={{ opacity: 0, willChange: "transform, opacity" }}>
          <p className="text-neon-blue font-display text-[10px] sm:text-xs md:text-sm tracking-cinematic mb-2 md:mb-3 uppercase">Darkness takes over</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-cinematic text-balance px-4">Only the adapted survive</h2>
        </div>

        {/* 3 Columns / Cards Layout - Flex Row on Mobile for Horizontal Scroll */}
        <div ref={cardsRef} className="flex-1 flex flex-row md:flex-row items-center justify-center gap-10 md:gap-10 pb-20 w-fit md:w-full">
          {zone.cards.map((card) => (
            <div key={card.id} style={{ opacity: 0, willChange: "transform, opacity" }}>
              <CreatureCard
                card={card}
                isExpanded={expandedCardId === card.id}
                onClick={() => setExpandedCardId(expandedCardId === card.id ? null : card.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
