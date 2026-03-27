import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis } from '@studio-freight/react-lenis'

import Navbar from './components/Navbar'
import DepthMeter from './components/DepthMeter'
import CustomCursor from './components/CustomCursor'

import HeroSurface from './sections/01_HeroSurface'
import SunlightZone from './sections/03_SunlightZone'
import TwilightZone from './sections/04_TwilightZone'
import MidnightZone from './sections/05_MidnightZone'
import AbyssZone from './sections/06_AbyssZone'
import Conclusion from './sections/07_Conclusion'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef()

  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 1500);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    // Sync GSAP ticker with Lenis
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Ensure ScrollTrigger updates on scroll
    const lenis = lenisRef.current?.lenis
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
    }

    return () => {
      gsap.ticker.remove(update)
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update)
      }
    }
  }, [])

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ 
      lerp: 0.07, 
      duration: 1.5, 
      smoothTouch: true, // Enable JS-controlled smooth scroll on touch for better parallax sync
      smoothWheel: true 
    }}>
      <div className="relative">
        <CustomCursor />
        <Navbar />
        <DepthMeter />

        <main className="w-full relative">
          <HeroSurface />
          <SunlightZone />
          <TwilightZone />
          <MidnightZone />
          <AbyssZone />
          <Conclusion />
        </main>
      </div>
    </ReactLenis>
  )
}
