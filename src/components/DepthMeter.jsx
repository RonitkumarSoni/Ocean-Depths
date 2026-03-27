import { useState, useEffect } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { oceanZones } from "../data/oceanZones";

export default function DepthMeter() {
  const progress = useScrollProgress();
  // Map 0-1 progress to 0-11000 meters
  const currentDepth = Math.round(progress * 11000);

  // Determine current zone based on depth
  const currentZone =
    currentDepth < 200
      ? oceanZones[1]
      : currentDepth < 1000
        ? oceanZones[2]
        : currentDepth < 4000
          ? oceanZones[3]
          : oceanZones[4];

  // Rough calc for pressure (atm) and temp (C)
  const pressure = Math.max(1, Math.round(currentDepth / 10)); // ~1 atm per 10m
  const temp = Math.max(2, Math.round(20 - (currentDepth / 1000) * 4)); // Surface ~20C, drops to 2C

  return (
    <div className="fixed right-4 md:right-auto md:left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 md:gap-4 pointer-events-none scale-[0.8] md:scale-100 origin-right md:origin-left">
      {/* Zone Label */}
      <div className="glass-card px-3 py-1.5 transition-colors duration-500" style={{ borderColor: `${currentZone.color}40` }}>
        <span className="text-[10px] tracking-cinematic uppercase font-medium" style={{ color: currentZone.color }}>
          {currentZone.name}
        </span>
      </div>

      {/* Progress Track */}
      <div className="relative w-1 h-48 md:h-64 rounded-full bg-white/10 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-surface-cyan via-twilight-blue to-neon-blue transition-all duration-300 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
        {/* Current Position Dot */}
        <div
          className="absolute w-3 h-3 left-1/2 -translate-x-1/2 rounded-full shadow-[0_0_10px_#00f2fe]"
          style={{
            top: `${progress * 100}%`,
            backgroundColor: currentZone.color,
            transform: 'translate(-50%, -50%)',
            transition: 'top 0.3s ease-out, background-color 0.5s'
          }}
        />
      </div>

      {/* Stats Display - Hidden on very small screens to save space */}
      <div className="glass-card hidden sm:flex flex-col items-center p-3 gap-2 min-w-[70px]">
        {/* Depth */}
        <div className="flex flex-col items-center">
          <span className="text-lg font-display font-medium text-white">{currentDepth}m</span>
          <span className="text-[9px] text-white/40 uppercase tracking-widest">Depth</span>
        </div>
        {/* Pressure */}
        <div className="flex flex-col items-center">
          <span className="text-sm font-display text-white/80">{pressure}atm</span>
          <span className="text-[9px] text-white/40 uppercase tracking-widest">Press</span>
        </div>
        {/* Temp */}
        <div className="flex flex-col items-center">
          <span className="text-sm font-display text-white/80">{temp}°C</span>
          <span className="text-[9px] text-white/40 uppercase tracking-widest">Temp</span>
        </div>
      </div>
    </div>
  );
}
