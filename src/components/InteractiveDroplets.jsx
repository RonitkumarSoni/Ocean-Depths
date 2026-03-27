import { useEffect, useRef } from "react";

export default function InteractiveDroplets({ 
  color = "#00f2fe", 
  count = 60, 
  velocity = 0.5,
  repulsion = 150,
  opacity = 0.4
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    class Droplet {
      constructor() {
        this.init(true);
      }

      init(isInitial = false) {
        this.x = Math.random() * canvas.width;
        this.y = isInitial ? (Math.random() * canvas.height) : (canvas.height + 50);
        this.size = Math.random() * 5 + 1.8; // Larger for clear visibility
        this.vx = (Math.random() - 0.5) * 0.1;
        this.vy = -(Math.random() * velocity + 0.1);
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.015 + 0.005;
        this.alpha = Math.random() * opacity + 0.3; // Much more visible
        this.depth = Math.random(); 
      }

      update() {
        this.y += this.vy;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * (0.5 * this.depth);

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < repulsion) {
          const force = (repulsion - distance) / repulsion;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 4;
          this.y -= Math.sin(angle) * force * 4;
        }

        if (this.y < -50) {
          this.init(false);
        }

        this.draw();
      }

      draw() {
        ctx.save();
        
        // Premium High-Visibility Layering
        const finalAlpha = this.depth < 0.4 ? (this.alpha * 0.5) : this.alpha;
        ctx.globalAlpha = finalAlpha;
        
        // Luminous Core Glow
        ctx.shadowBlur = this.depth * 12;
        ctx.shadowColor = color;

        const highlightX = this.x - this.size * 0.3;
        const highlightY = this.y - this.size * 0.3;
        
        const grad = ctx.createRadialGradient(
          highlightX, highlightY, 0,
          this.x, this.y, this.size
        );
        
        grad.addColorStop(0, "#ffffff"); // Specular 
        grad.addColorStop(0.2, "rgba(255, 255, 255, 0.4)"); 
        grad.addColorStop(0.5, `${color}44`); // Tinted volume
        grad.addColorStop(0.8, "rgba(255, 255, 255, 0.5)"); // Rim light
        grad.addColorStop(1, "rgba(255, 255, 255, 0)"); 

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const init = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? Math.floor(count / 2) : count;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Droplet());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());
      animationFrameId = requestAnimationFrame(animate);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth || window.innerWidth;
      canvas.height = parent.clientHeight || window.innerHeight;
      init();
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, count, velocity, repulsion, opacity]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-[15] pointer-events-none"
    />
  );
}
