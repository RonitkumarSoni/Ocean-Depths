import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSurface() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    // Use device pixel ratio for crisp rendering but cap at 1 for performance
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = 654;
    const images = {};
    const ocean = { frame: 1 };

    const getFramePath = (index) => `/fast-dream/${index.toString().padStart(5, '0')}.jpg`;

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    images[1] = firstImg;

    let lastDrawnFrame = -1;

    const render = () => {
      const frameNum = Math.round(ocean.frame);

      // Skip if same frame — prevents redundant draws
      if (frameNum === lastDrawnFrame) return;

      const img = images[frameNum];
      if (img && img.complete && img.naturalHeight !== 0) {
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
        lastDrawnFrame = frameNum;
      } else if (!images[frameNum]) {
        // On-demand load for frames not yet preloaded
        const newImg = new Image();
        newImg.src = getFramePath(frameNum);
        images[frameNum] = newImg;
        newImg.onload = () => render();
      }
    };

    firstImg.onload = render;

    // PERFORMANCE: Batch preload in chunks with idle callbacks
    // Only load 10 images at a time, then yield to main thread
    let preloadCancelled = false;

    const preloadImages = async () => {
      const BATCH_SIZE = 8;

      for (let i = 2; i <= frameCount && !preloadCancelled; i++) {
        if (images[i]) continue; // Skip already loaded

        const img = new Image();
        img.src = getFramePath(i);
        images[i] = img;

        // Every BATCH_SIZE images, yield to main thread
        if (i % BATCH_SIZE === 0) {
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      }
    };

    // Start preloading after a short delay to let the page settle
    const preloadTimeout = setTimeout(preloadImages, 500);

    // GSAP Timeline — clean, short scroll distance based on device size
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // DESKTOP: Long, cinematic scroll
        createTimeline("+=3000");
      });

      mm.add("(max-width: 767px)", () => {
        // MOBILE: Shorter scroll to prevent thumb fatigue
        createTimeline("+=1200");
      });

      function createTimeline(scrollEnd) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            start: "top top",
            end: scrollEnd,
            scrub: 0.5,
            onUpdate: render,
          }
        });

        tl.to(ocean, {
          frame: frameCount,
          snap: "frame",
          duration: 10,
          ease: "none",
        }, 0);

        // Text 1: Fade out
        tl.to(text1Ref.current, {
          opacity: 0, y: -60,
          duration: 1.5, ease: "power2.in",
        }, 0.5);

        // Text 2: Slide up in, slide up out
        tl.fromTo(text2Ref.current,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 2
        );
        tl.to(text2Ref.current, {
          opacity: 0, y: -60, duration: 1.2, ease: "power2.in",
        }, 4);

        // Text 3: Slide up in, slide up out
        tl.fromTo(text3Ref.current,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 4.5
        );
        tl.to(text3Ref.current, {
          opacity: 0, y: -60, duration: 1.2, ease: "power2.in",
        }, 6.5);

        // Text 4: Slide up in, slide up out
        tl.fromTo(text4Ref.current,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 7
        );
        tl.to(text4Ref.current, {
          opacity: 0, y: -60, duration: 1.2, ease: "power2.in",
        }, 8.5);

        // Text 5: Slide up and stay
        tl.fromTo(text5Ref.current,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 9
        );
      }
    }, containerRef);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lastDrawnFrame = -1;
      render();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      preloadCancelled = true;
      clearTimeout(preloadTimeout);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="surface" className="relative w-full h-screen bg-black overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 filter brightness-[0.65] contrast-[1.1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10 pointer-events-none mix-blend-multiply" />



      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 md:px-6">
        <div ref={text1Ref} className="absolute flex flex-col items-center top-[30%] md:top-[35%] w-full max-w-5xl text-center">
          <div className="overflow-hidden px-2">
            <h1 className="font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-4 md:mb-6 leading-none drop-shadow-2xl">
              INTO THE ABYSS
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="text-white/60 text-xs sm:text-sm md:text-lg font-light tracking-[0.3em] md:tracking-[0.4em] uppercase text-balance px-4">
              Scroll to begin descent
            </p>
          </div>
        </div>

        <div ref={text2Ref} className="absolute bottom-[20%] left-[5%] md:left-[10%] flex flex-col items-start opacity-0 text-left max-w-sm md:max-w-xl">
          <div className="overflow-hidden">
            <p className="font-display text-surface-cyan text-[10px] sm:text-xs md:text-sm tracking-[0.3em] font-bold uppercase mb-3 md:mb-4 border-l-2 border-surface-cyan pl-3 md:pl-4">
              Leaving the Light
            </p>
          </div>
          <div className="overflow-hidden">
            <h2 className="text-2xl sm:text-3xl md:text-5xl text-white font-medium tracking-tight leading-[1.15] drop-shadow-2xl text-balance">
              How deep can you go?
            </h2>
          </div>
        </div>

        <div ref={text3Ref} className="absolute top-[25%] md:top-[30%] right-[5%] md:right-[10%] flex flex-col items-end opacity-0 text-right max-w-sm md:max-w-xl">
          <div className="overflow-hidden">
            <p className="font-display text-twilight-blue text-[10px] sm:text-xs md:text-sm tracking-[0.3em] font-bold uppercase mb-3 md:mb-4 border-r-2 border-twilight-blue pr-3 md:pr-4">
              The Twilight Zone
            </p>
          </div>
          <div className="overflow-hidden">
            <h2 className="text-2xl sm:text-3xl md:text-5xl text-white font-medium tracking-tight leading-[1.15] drop-shadow-2xl text-balance">
              The ocean hides more than we know.
            </h2>
          </div>
        </div>

        <div ref={text4Ref} className="absolute bottom-[20%] right-[5%] md:right-[15%] flex flex-col items-end opacity-0 text-right max-w-sm md:max-w-xl">
          <div className="overflow-hidden">
            <p className="font-display text-neon-blue text-[10px] sm:text-xs md:text-sm tracking-[0.3em] font-bold uppercase mb-3 md:mb-4 border-r-2 border-neon-blue pr-3 md:pr-4 drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]">
              The Midnight Realm
            </p>
          </div>
          <div className="overflow-hidden">
            <h2 className="text-2xl sm:text-3xl md:text-5xl text-white font-medium tracking-tight leading-[1.15] drop-shadow-2xl text-balance">
              Total darkness. Bioluminescence flickers like stars in a liquid galaxy.
            </h2>
          </div>
        </div>

        <div ref={text5Ref} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 px-4 text-center">
          <div className="overflow-hidden">
            <p className="font-display text-neon-green text-[10px] sm:text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] font-bold uppercase mb-6 md:mb-8 border border-neon-green/40 shadow-[0_0_30px_rgba(57,255,20,0.3)] rounded-full px-6 py-2 md:px-8 md:py-3 bg-neon-green/10 backdrop-blur-md">
              Welcome to the Unknown
            </p>
          </div>
          <div className="overflow-hidden max-w-[90vw]">
            <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-medium tracking-tight leading-[1.1] max-w-5xl drop-shadow-2xl text-balance">
              Survive the pressure. Discover the mysteries that lie at the absolute bottom of the world...
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
