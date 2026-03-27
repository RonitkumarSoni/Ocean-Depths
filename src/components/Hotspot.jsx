import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hotspot({ creature }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="absolute z-30 flex items-center justify-center pointer-events-auto"
      style={{ left: creature.x, top: creature.y }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
      data-cursor="interactive"
    >
      {/* Pulsing Dot (+) */}
      <motion.div 
        className="w-8 h-8 rounded-full bg-surface-cyan/20 border border-surface-cyan flex items-center justify-center cursor-pointer relative"
        whileHover={{ scale: 1.2 }}
        animate={{ boxShadow: ["0px 0px 0px rgba(0,242,254,0)", "0px 0px 15px rgba(0,242,254,0.6)", "0px 0px 0px rgba(0,242,254,0)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-surface-cyan font-bold text-lg leading-none">+</span>
      </motion.div>

      {/* Tooltip Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 w-48 p-3 glass-card bg-[#11212b]/95 border-surface-cyan/30 z-40"
          >
            <h4 className="text-surface-cyan font-display uppercase tracking-wider text-sm mb-1">{creature.name}</h4>
            <p className="text-xs text-white/80 leading-relaxed font-light">{creature.fact}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
