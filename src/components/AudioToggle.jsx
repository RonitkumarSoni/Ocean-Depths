import { useState, useRef } from "react";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleSound = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.error("Audio block:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/01/18/audio_651f89b917.mp3?filename=underwater-ambient-14732.mp3" // Sample deep sea audio
        preload="auto"
      />
      
      <button
        onClick={toggleSound}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-110 hover:border-surface-cyan/50 transition-all duration-300 group focus:outline-none"
        aria-label={isPlaying ? "Mute Ocean Audio" : "Play Ocean Audio"}
        data-cursor="interactive"
      >
        {isPlaying ? (
          // Sound Waves Animation Icon
          <div className="flex items-end justify-center gap-[3px] w-5 h-4">
            <span className="w-1 bg-surface-cyan rounded-t-sm animate-[bounce_1s_infinite] origin-bottom delay-100 h-2 group-hover:bg-neon-blue" />
            <span className="w-1 bg-surface-cyan rounded-t-sm animate-[bounce_1s_infinite] origin-bottom delay-300 h-4 group-hover:bg-neon-blue" />
            <span className="w-1 bg-surface-cyan rounded-t-sm animate-[bounce_1s_infinite] origin-bottom delay-200 h-3 group-hover:bg-neon-blue" />
          </div>
        ) : (
          // Muted Icon
          <svg className="w-5 h-5 text-white/50 group-hover:text-surface-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </button>
    </>
  );
}
