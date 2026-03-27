import { motion } from "framer-motion";

export default function CreatureCard({ card, isExpanded, onClick }) {
  return (
    <motion.div
      layout
      data-cursor="interactive"
      onClick={onClick}
      // OUTER SHELL (Double-Bezel technique)
      // touch-action: pan-y ensures vertical scrolling works even if touch starts on card
      // select-none prevents accidental selection during scroll
      className={`relative cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ring-1 ring-white/10 select-none touch-pan-y ${isExpanded
          ? "w-[95vw] md:w-[80vw] max-w-5xl h-[85vh] md:h-[80vh] z-50 p-1 md:p-2 shadow-[0_40px_100px_rgba(0,0,0,0.8)] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] md:rounded-[2.5rem]"
          : "w-[85vw] sm:w-72 h-[22rem] sm:h-[26rem] p-1.5 rounded-[1.5rem] sm:rounded-[2rem] hover:-translate-y-2 sm:hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-white/5"
        }`}
      style={{
        background: isExpanded ? "rgba(10, 20, 30, 0.4)" : "rgba(255,255,255,0.02)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* INNER CORE */}
      <motion.div
        layout
        className={`relative w-full h-full overflow-hidden flex flex-col ${isExpanded ? "rounded-[calc(2.5rem-0.375rem)] md:rounded-[calc(2.5rem-0.5rem)]" : "rounded-[calc(2rem-0.375rem)]"}`}
        style={{
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 0 20px rgba(255,255,255,0.05)"
        }}
      >
      {/* Background Graphic Layer */}
      <motion.div
        layout
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-1000"
        style={{
          backgroundImage: isExpanded
            ? `linear-gradient(to right, rgba(10, 20, 35, 0.95) 0%, rgba(10, 20, 35, 0.4) 50%, transparent 100%), url(${card.image})`
            : `linear-gradient(to top, rgba(10, 20, 35, 0.95) 0%, rgba(10,20,35,0.2) 60%, transparent 100%), url(${card.image})`,
          backgroundSize: "cover",
          backgroundPosition: isExpanded ? "center right" : "center",
          opacity: isExpanded ? 0.7 : 0.8,
          filter: isExpanded ? "brightness(1.1) contrast(1.1)" : "brightness(0.9) contrast(1.2)"
        }}
      />

      {/* Content Layer */}
      <motion.div layout className={`relative z-10 flex flex-col h-full ${isExpanded ? 'p-6 md:p-14 justify-end md:justify-center md:max-w-[50%]' : 'p-5 sm:p-6 justify-end w-full'}`}>

        {/* Sub-label */}
        <motion.p
          layout
          className={`font-display text-surface-cyan uppercase tracking-[0.2em] md:tracking-[0.3em] font-semibold mb-2 md:mb-3 ${isExpanded ? 'text-xs md:text-sm' : 'text-[10px]'}`}
        >
          {card.icon} Midnight Zone
        </motion.p>

        {/* Title */}
        <motion.h3
          layout
          className={`font-display font-medium text-white tracking-tight leading-[1.1] drop-shadow-lg ${isExpanded ? 'text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-8' : 'text-2xl sm:text-3xl'}`}
        >
          {card.title}
        </motion.h3>

        {/* Expanded Content Body */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-white/80 leading-relaxed font-light text-sm sm:text-base md:text-xl drop-shadow-md pb-6 md:pb-8 line-clamp-4 md:line-clamp-none">
              {card.content}
            </p>

            {/* Nested CTA Architecture */}
            <button
              className="group relative flex items-center justify-between gap-4 bg-white/10 hover:bg-white border border-white/20 text-white hover:text-black pl-6 pr-2 py-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] active:scale-[0.98]"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Close Details</span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 group-hover:bg-black/10 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                <span className="text-sm">←</span>
              </div>
            </button>
          </motion.div>
        )}
      </motion.div>
      </motion.div>
    </motion.div>
  );
}
