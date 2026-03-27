import { useState, useEffect } from "react";

/**
 * Custom hook to track overall scroll progress (0 to 1).
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        setProgress(currentScrollY / scrollHeight);
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    // Initial call
    updateScroll();

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return progress;
}
