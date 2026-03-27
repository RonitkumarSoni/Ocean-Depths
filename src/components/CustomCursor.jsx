import { useEffect, useState } from "react";
import { useMousePosition } from "../hooks/useMousePosition";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Detect hover on interactive elements globally using event delegation
    const handleMouseOver = (e) => {
      // Check if the target or its parents have data-cursor attribute or are buttons/links
      const interactiveEl = e.target.closest('a, button, [data-cursor="interactive"]');
      setIsHovering(!!interactiveEl);
    };

    document.addEventListener("mouseover", handleMouseOver);
    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, []);

  // Don't render cursor on mobile devices
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <div
      className={`custom-cursor ${isHovering ? "hovering" : ""}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    />
  );
}
