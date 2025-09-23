import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Add event listeners
    lenis.on('scroll', (e) => {
      // Optional: dispatch custom events or update global state
      // console.log('Scroll event:', e);
    });

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="lenis-wrapper">
      {children}
    </div>
  );
};

export default SmoothScrollProvider;