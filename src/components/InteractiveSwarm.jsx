import { useEffect, useRef } from "react";

export default function InteractiveSwarm() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let particles = [];
    
    // SOLID BLACK Silhouettes
    const fishSilhouettes = [
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" fill="%23000000"><path d="M95,25 Q80,10 50,15 T5,25 T50,35 Q80,40 95,25 M5,25 L0,15 L0,35 Z" /></svg>`, // Generic Fish
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" fill="%23000000"><path d="M100,25 Q80,5 50,15 T0,25 T50,35 Q80,45 100,25 M20,15 L30,0 L40,15 Z M20,35 L30,50 L40,35 Z" /></svg>`, // Shark-like
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" fill="%23000000"><path d="M90,25 Q70,5 40,15 T10,25 T40,35 Q70,45 90,25 M10,25 L0,20 L0,30 Z" /></svg>` // Tuna-like
    ];

    const fishImages = fishSilhouettes.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });

    let mouse = { x: -1000, y: -1000 };
    
    // High-performance mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    const numParticles = window.innerWidth > 768 ? 250 : 100; 
    const mouseRadius = 250; 

    class Fish {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 60 + 15; 
        this.density = (Math.random() * 20) + 1;
        // BASE VELOCITY (for 'swimming' feel)
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 2;
        this.img = fishImages[Math.floor(Math.random() * fishImages.length)];
        this.opacity = Math.random() * 0.4 + 0.6; 
        this.tick = Math.random() * 100; // for tail wave
      }

      draw() {
        this.tick += 0.1;
        const heading = Math.atan2(this.vy, this.vx);
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(heading);
        
        ctx.globalAlpha = this.opacity;
        
        // SWIM ANIMATION: Subtle horizontal squeeze to simulate tail movement
        const wave = Math.sin(this.tick) * 0.1;
        const scaleX = 1 + wave;
        const scaleY = 1 - wave;
        
        ctx.scale(scaleX, scaleY);
        ctx.drawImage(this.img, -this.size / 2, -this.size / 4, this.size, this.size / 2);
        
        ctx.restore();
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          // FLEE BEHAVIOR: Push velocity away strongly
          const force = (mouseRadius - distance) / mouseRadius;
          const directionX = (dx / distance) * force * this.density;
          const directionY = (dy / distance) * force * this.density;
          
          this.vx -= directionX * 0.5;
          this.vy -= directionY * 0.5;
          
          // Panic speed boost
          this.vx *= 1.1; 
          this.vy *= 1.1;
        }

        // Apply friction
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Apply velocity to position
        this.x += this.vx;
        this.y += this.vy;

        // Smooth cruising limits (don't stop moving)
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = 5; // panicking speed
        const minSpeed = 1.0; // cruising speed
        
        if (speed > maxSpeed) {
            this.vx *= 0.95;
            this.vy *= 0.95;
        } else if (speed < minSpeed) {
            this.vx *= 1.05;
            this.vy *= 1.05;
        }

        // Wrap around
        if (this.x < -150) this.x = canvas.width + 100;
        if (this.x > canvas.width + 150) this.x = -100;
        if (this.y < -150) this.y = canvas.height + 100;
        if (this.y > canvas.height + 150) this.y = -100;

        this.draw();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Fish());
      }
    }

    function animate() {
      // Cinematic Background
      ctx.fillStyle = '#1a3a5a'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#2b4d6e');
      grad.addColorStop(1, '#0a141e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth || window.innerWidth;
      canvas.height = parent.clientHeight || window.innerHeight;
      init();
    };

    let loaded = 0;
    fishImages.forEach(img => {
      img.onload = () => {
        loaded++;
        if (loaded === fishImages.length) {
          resize();
          animate();
        }
      };
    });

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 cursor-crosshair transition-opacity duration-1000"
    />
  );
}
