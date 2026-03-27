import { useState } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const progress = useScrollProgress();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true); // Scrolling down - hide
    } else {
      setHidden(false); // Scrolling up - show
    }
    setScrolled(latest > 50);
  });

  // Determine logo color based on depth progress
  const logoColor = progress > 0.8 ? 'text-neon-pink' : progress > 0.4 ? 'text-neon-blue' : 'text-surface-cyan';

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} 
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ease-in-out border-b ${scrolled ? 'py-4 bg-black/40 backdrop-blur-2xl border-white/10 shadow-lg' : 'py-6 bg-transparent border-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo (Removed Icons as requested) */}
        <div className="flex items-center gap-3">
          <span className={`font-display text-xl md:text-2xl tracking-[0.3em] font-black uppercase text-white transition-colors duration-1000 ${logoColor} select-none`}>
            Ocean Depths
          </span>
        </div>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.2em] font-bold text-white/50">
          <li><a href="#surface" className="hover:text-surface-cyan transition-colors duration-300" data-cursor="interactive">SURFACE</a></li>
          <li><a href="#twilight" className="hover:text-surface-cyan transition-colors duration-300" data-cursor="interactive">ZONES</a></li>
          <li><a href="#midnight" className="hover:text-surface-cyan transition-colors duration-300" data-cursor="interactive">SPECIES</a></li>
        </ul>

        {/* CTA (Button-in-Button Architecture) */}
        <a 
          href="#abyss" 
          className="group relative hidden sm:flex items-center gap-4 px-5 py-2.5 bg-white/10 hover:bg-white border border-white/20 text-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] hover:text-black backdrop-blur-md"
          data-cursor="interactive"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">DIVE DEEPER</span>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-500 group-hover:bg-black/10 group-hover:translate-x-0.5 group-hover:-translate-y-[0.5px] group-hover:scale-105">
            <span className="text-[10px]">↓</span>
          </div>
        </a>

      </div>
    </motion.nav>
  );
}
