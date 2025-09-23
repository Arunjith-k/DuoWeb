import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollTextRef = useRef(null);
  const mainTextRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      infinite: false,
      gestureOrientation: 'vertical',
      normalizeWheel: false,
      smoothTouch: false
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP animations
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate title
    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    // Animate subtitle
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6"
    )
    // Animate scroll text
    .fromTo(scrollTextRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4"
    )
    // Animate main text
    .fromTo(mainTextRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.3"
    );

    // ScrollTrigger animations for sections
    gsap.utils.toArray('.section-animate').forEach((section) => {
      gsap.fromTo(section,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        </div>
        
        {/* Main Title */}
        <div className="text-center z-10">
          <h1
            ref={titleRef}
            className="text-[8vw] md:text-[12vw] lg:text-[15vw] font-dark font-black leading-none tracking-tight mb-4"
          >
           DUO <span className='text-violet-600 font-yugi'>WEB</span> 
          </h1>
          
          <p
            ref={subtitleRef}
            className="text-sm md:text-base lg:text-lg font-light tracking-[0.3em] opacity-70 mb-8"
          >
            FreeLancing Agency
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollTextRef}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center"
        >
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm font-light tracking-[0.2em] opacity-60">SCROLL</p>
            <p className="text-sm font-light tracking-[0.2em] opacity-60">TO EXPLORE</p>
            <div className="w-px h-16 bg-white/20"></div>
          </div>
        </div>
      </section>

      {/* --- ALL YOUR OTHER SECTIONS REMAIN THE SAME --- */}

      {/* Second Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12 relative">
        <div className="text-center z-10">
          <p className="text-lg md:text-xl lg:text-2xl font-light tracking-[0.2em] opacity-80 mb-8">
            A SMOOTH SCROLL LIBRARY
          </p>
          <p className="text-base md:text-lg font-light tracking-[0.15em] opacity-60 mb-16">
            FRESH OUT OF DARKROOM.ENGINEERING
          </p>
          <p className="text-sm md:text-base font-light tracking-[0.1em] opacity-50 mb-8">
            WEBSITE DESIGNED BY STUDIO FREIGHT
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-8 py-3 border border-white/20 text-sm font-light tracking-[0.1em] hover:bg-white hover:text-black transition-all duration-300">
              DOCUMENTATION
            </button>
            <button className="px-8 py-3 bg-white text-black text-sm font-light tracking-[0.1em] hover:bg-white/90 transition-all duration-300">
              BECOME A SPONSOR
            </button>
          </div>
        </div>
      </section>

      {/* Why Smooth Scroll Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide opacity-80 mb-16">
            Why smooth scroll?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">
                CREATE MORE IMMERSIVE INTERFACES
              </h3>
              <p className="text-base font-light opacity-80 leading-relaxed">
                Unlock the creative potential and impact of your web experiences. Smoothing the scroll pulls users into the flow of the experience that feels so substantial that they forget they're navigating a web page.
              </p>
            </div>
            
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">
                NORMALIZE ALL YOUR USER INPUTS
              </h3>
              <p className="text-base font-light opacity-80 leading-relaxed">
                Give all your users the same (dope) experience whether they're using trackpads, mouse wheels, or otherwise. With smooth scroll, you control how silky, heavy, or responsive the experience should be — no matter the input. Magic!
              </p>
            </div>
            
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">
                MAKE YOUR ANIMATIONS FLAWLESS
              </h3>
              <p className="text-base font-light opacity-80 leading-relaxed">
                Synchronization with native scroll is not reliable. Those jumps and delays with scroll-linked animations are caused by multi-threading, where modern browsers run animations/effects asynchronously with the scroll. Smooth scroll fixes this.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rethinking Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide opacity-80 mb-8">
              Rethinking smooth scroll
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 mb-12">
              We have to give props to libraries like <span className="underline">Locomotive Scroll</span> and <span className="underline">GSAP ScrollSmoother</span>. They're well built and well documented – and we've used them a lot. But they still have issues that keep them from being bulletproof.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProblemCard 
              number="01"
              title="LOSS OF PERFORMANCE BUDGET DUE TO USING CSS TRANSFORMS"
            />
            <ProblemCard 
              number="02"
              title="INACCESSIBILITY FROM NO PAGE SEARCH SUPPORT AND NATIVE SCROLLBAR"
            />
            <ProblemCard 
              number="03"
              title="NON-NEGLIGIBLE IMPORT COSTS (12.1KB - 24.34KB GZIPPED)"
            />
            <ProblemCard 
              number="04"
              title="LIMITED ANIMATION SYSTEMS FOR COMPLEX, SCROLL-BASED ANIMATIONS"
            />
            <ProblemCard 
              number="05"
              title="ERASING NATIVE APIS LIKE INTERSECTION-OBSERVER, CSS STICKY, ETC."
            />
          </div>
        </div>
      </section>

      {/* So We Built Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <p className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wide opacity-80 mb-8">
              SO WE BUILT
            </p>
            <h2 className="text-[6vw] md:text-[8vw] lg:text-[10vw] font-black leading-none tracking-tight mb-8">
              WEB SCROLLING
            </h2>
          </div>
        </div>
      </section>

      {/* Enter Lenis Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <h3 className="text-[4vw] md:text-[6vw] lg:text-[8vw] font-black leading-none tracking-tight mb-4">
              ENTER
            </h3>
            <h2 className="text-[8vw] md:text-[12vw] lg:text-[15vw] font-black leading-none tracking-tight mb-8">
              LENIS
            </h2>
          </div>
          
          <div className="mb-16">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wide opacity-80 mb-12">
              AS IT SHOULD BE
            </h3>
          </div>
        </div>
      </section>

      {/* Main Description Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={mainTextRef}
            className="mb-16"
          >
            <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed opacity-90">
              Lenis is an{" "}
              <span className="font-semibold">open-source library</span>{" "}
              built to standardize scroll experiences and sauce up websites with 
              butter-smooth navigation, all while using the platform and keeping it accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[4vw] md:text-[6vw] lg:text-[8vw] font-black text-center mb-16">
            Lenis brings<br />the heat
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              number="01"
              title="RUN SCROLL IN THE MAIN THREAD"
            />
            <FeatureCard 
              number="02"
              title="LIGHTWEIGHT (UNDER 4KB)"
            />
            <FeatureCard 
              number="03"
              title="MADE FOR 2025+"
            />
            <FeatureCard 
              number="04"
              title="BRING YOUR OWN ANIMATION LIBRARY"
            />
            <FeatureCard 
              number="05"
              title="CONTROL THE SCROLL EASING DURATION"
            />
            <FeatureCard 
              number="06"
              title="USE ANY ELEMENT AS SCROLLER"
            />
            <FeatureCard 
              number="07"
              title="ENJOY HORIZONTAL + VERTICAL SUPPORT"
            />
            <FeatureCard 
              number="08"
              title='FEEL FREE TO USE "POSITION: STICKY" AGAIN'
            />
            <FeatureCard 
              number="09"
              title="TOUCH SUPPORT"
            />
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[4vw] md:text-[6vw] lg:text-[8vw] font-black mb-16">
            Lenis<br />in use
          </h2>
          
          <div className="space-y-8">
            <UsageItem 
              name="Deso"
              company="Studio Freight"
            />
            <UsageItem 
              name="Sculpting Harmony"
              company="Resn"
            />
            <UsageItem 
              name="Superpower"
              company=""
            />
            <UsageItem 
              name="Daylight Computer"
              company="Basement Studio"
            />
            <UsageItem 
              name="Lifeworld by Olafur Eliasson"
              company=""
            />
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base md:text-lg font-light leading-relaxed opacity-90 mb-8">
            Lenis is a 100% free and open-source project, built to enhance web experiences. 🚀<br />
            But maintaining and improving Lenis takes time and resources.
          </p>
          
          <p className="text-base md:text-lg font-light leading-relaxed opacity-90 mb-12">
            If you use Lenis and want to support its development, consider becoming a sponsor! 💙<br />
            A huge thank you to everyone who helps keep Lenis alive! 🙌
          </p>
          
          <button className="px-12 py-4 bg-white text-black text-lg font-light tracking-[0.1em] hover:bg-white/90 transition-all duration-300">
            BECOME A SPONSOR
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ number, title }) => {
  return (
    <div className="border border-white/10 p-6 hover:border-white/30 transition-all duration-300 group">
      <div className="text-sm font-light opacity-40 mb-4 group-hover:opacity-60 transition-opacity">
        {number}
      </div>
      <h3 className="text-sm font-medium tracking-wide leading-tight group-hover:opacity-90 transition-opacity">
        {title}
      </h3>
    </div>
  );
};

const ProblemCard = ({ number, title }) => {
  return (
    <div className="border border-white/10 p-6 hover:border-red-500/30 transition-all duration-300 group">
      <div className="text-sm font-light opacity-40 mb-4 group-hover:opacity-60 transition-opacity text-red-400">
        {number}
      </div>
      <h3 className="text-sm font-medium tracking-wide leading-tight group-hover:opacity-90 transition-opacity">
        {title}
      </h3>
    </div>
  );
};

const UsageItem = ({ name, company }) => {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-4 hover:border-white/30 transition-all duration-300 group">
      <div className="flex items-center space-x-4">
        <span className="text-lg md:text-xl font-light group-hover:opacity-90 transition-opacity">
          {name}
        </span>
        {company && (
          <span className="text-sm opacity-60 group-hover:opacity-80 transition-opacity">
            {company}
          </span>
        )}
      </div>
      <div className="w-2 h-2 bg-white/20 rounded-full group-hover:bg-white/40 transition-all"></div>
    </div>
  );
};

export default Hero;

