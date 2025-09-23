import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

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
  const webTextRef = useRef(null);
  const lenisRef = useRef(null);

  // Array of your custom font classes with size configurations
  const fontConfigs = [
    { class: "font-broken", scale: 1.0 },
    { class: "font-living", scale: 1.0 },
    { class: "font-manu", scale: 1.0 },
    { class: "font-omerta", scale: 1.3 }, // This font will be 30% larger
    { class: "font-raven", scale: 1.0 },
    { class: "font-stroke", scale: 1.2 }, // This font will be 20% larger
    { class: "font-wells", scale: 1.0 },
    { class: "font-yugi", scale: 1.4 }, // This font will be 40% larger
    { class: "font-dark", scale: 1.1 }, // This font will be 10% larger
  ];

  // Extract just the class names for the cycling logic
  const fontClasses = fontConfigs.map((config) => config.class);

  useEffect(() => {
    // Initialize Lenis smooth scroll with better configuration
    const lenis = new Lenis({
      lerp: 0.05,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // GSAP animations
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate title with better performance
    tl.fromTo(
      titleRef.current,
      {
        y: 80,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
        clearProps: "transform",
      }
    )
      // Animate subtitle
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
        },
        "-=0.8"
      )
      // Animate scroll text
      .fromTo(
        scrollTextRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.5"
      )
      // Animate main text
      .fromTo(
        mainTextRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

    // Font cycling animation for "WEB" text - WITH VARIABLE SIZES
    const fontCycleTL = gsap.timeline({
      repeat: -1, // Infinite loop
      repeatDelay: 0.01,
    });

    fontConfigs.forEach((config, index) => {
      fontCycleTL.to(webTextRef.current, {
        duration: 0.8,
        ease: "power2.inOut",
        onStart: () => {
          // Remove all font classes
          fontClasses.forEach((font) => {
            webTextRef.current.classList.remove(font);
          });
          // Add current font class
          webTextRef.current.classList.add(config.class);

          // Apply scale based on font configuration
          gsap.set(webTextRef.current, {
            scale: config.scale,
            transformOrigin: "center center",
          });
        },
      });
    });

    // Optional: Add hover effect to pause animation
    if (webTextRef.current) {
      webTextRef.current.addEventListener("mouseenter", () => {
        fontCycleTL.pause();
        // Get current scale before hover
        const currentScale = gsap.getProperty(webTextRef.current, "scale");
        gsap.to(webTextRef.current, {
          scale: currentScale * 1.1, // Scale up from current size
          color: "#8b5cf6",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      webTextRef.current.addEventListener("mouseleave", () => {
        fontCycleTL.play();
        // Return to the scale defined by the current font config
        const currentFontClass = fontClasses.find((font) =>
          webTextRef.current.classList.contains(font)
        );
        const currentConfig = fontConfigs.find(
          (config) => config.class === currentFontClass
        );
        gsap.to(webTextRef.current, {
          scale: currentConfig ? currentConfig.scale : 1,
          color: "#8b5cf6",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }

    // ScrollTrigger animations with performance optimization
    gsap.utils.toArray(".section-animate").forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          y: 60,
          opacity: 0,
          rotationX: 5,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false,
          },
          clearProps: "all",
        }
      );
    });

    // Handle resize events
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      fontCycleTL.kill();

      // Clean up event listeners
      if (webTextRef.current) {
        webTextRef.current.removeEventListener("mouseenter", () => {});
        webTextRef.current.removeEventListener("mouseleave", () => {});
      }
    };
  }, [fontConfigs, fontClasses]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        {/* Main Title with Font Animation */}
        <div className="text-center z-10">
          <h1
            ref={titleRef}
            className="text-[8vw] md:text-[12vw] lg:text-[15vw] leading-none tracking-tight mb-4 font-dark"
          >
            <span>DUO</span>
            <span
              ref={webTextRef}
              className="text-violet-600 font-yugi transition-all duration-300 cursor-pointer"
            >
              WEB
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-sm md:text-base lg:text-lg font-light tracking-[0.3em] opacity-70 mb-8 font-sans"
          >
            FreeLancing Agency
          </p>
        </div>

        {/* Enhanced Scroll indicator */}
        <div
          ref={scrollTextRef}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center"
        >
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm font-light tracking-[0.2em] opacity-60 font-sans">
              SCROLL
            </p>
            <p className="text-sm font-light tracking-[0.2em] opacity-60 font-sans">
              TO EXPLORE
            </p>
            <div className="w-px h-16 bg-gradient-to-b from-violet-500/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Rest of your sections remain exactly the same */}
      {/* Second Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12 relative">
        <div className="text-center z-10">
          <p className="text-lg md:text-xl lg:text-2xl font-light tracking-[0.2em] opacity-80 mb-8 font-sans">
            A SMOOTH SCROLL LIBRARY
          </p>
          <p className="text-base md:text-lg font-light tracking-[0.15em] opacity-60 mb-16 font-sans">
            FRESH OUT OF DARKROOM.ENGINEERING
          </p>
          <p className="text-sm md:text-base font-light tracking-[0.1em] opacity-50 mb-8 font-sans">
            WEBSITE DESIGNED BY STUDIO FREIGHT
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-8 py-3 border border-white/20 text-sm font-light tracking-[0.1em] hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm font-sans">
              DOCUMENTATION
            </button>
            <button className="px-8 py-3 bg-white text-black text-sm font-light tracking-[0.1em] hover:bg-white/90 transition-all duration-300 font-sans">
              BECOME A SPONSOR
            </button>
          </div>
        </div>
      </section>

      {/* Why Smooth Scroll Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide opacity-80 mb-16 font-sans">
            Why smooth scroll?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide font-sans">
                CREATE MORE IMMERSIVE INTERFACES
              </h3>
              <p className="text-base font-light opacity-80 leading-relaxed font-sans">
                Unlock the creative potential and impact of your web
                experiences. Smoothing the scroll pulls users into the flow of
                the experience that feels so substantial that they forget
                they're navigating a web page.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide font-sans">
                NORMALIZE ALL YOUR USER INPUTS
              </h3>
              <p className="text-base font-light opacity-80 leading-relaxed font-sans">
                Give all your users the same (dope) experience whether they're
                using trackpads, mouse wheels, or otherwise. With smooth scroll,
                you control how silky, heavy, or responsive the experience
                should be — no matter the input. Magic!
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide font-sans">
                MAKE YOUR ANIMATIONS FLAWLESS
              </h3>
              <p className="text-base font-light opacity-80 leading-relaxed font-sans">
                Synchronization with native scroll is not reliable. Those jumps
                and delays with scroll-linked animations are caused by
                multi-threading, where modern browsers run animations/effects
                asynchronously with the scroll. Smooth scroll fixes this.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rethinking Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide opacity-80 mb-8 font-sans">
              Rethinking smooth scroll
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 mb-12 font-sans">
              We have to give props to libraries like{" "}
              <span className="underline">Locomotive Scroll</span> and{" "}
              <span className="underline">GSAP ScrollSmoother</span>. They're
              well built and well documented – and we've used them a lot. But
              they still have issues that keep them from being bulletproof.
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
            <p className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wide opacity-80 mb-8 font-sans">
              SO WE BUILT
            </p>
            <h2 className="text-[6vw] md:text-[8vw] lg:text-[10vw] font-black leading-none tracking-tight mb-8 font-dark">
              WEB SCROLLING
            </h2>
          </div>
        </div>
      </section>

      {/* Enter Lenis Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <h3 className="text-[4vw] md:text-[6vw] lg:text-[8vw] font-black leading-none tracking-tight mb-4 font-dark">
              ENTER
            </h3>
            <h2 className="text-[8vw] md:text-[12vw] lg:text-[15vw] font-black leading-none tracking-tight mb-8 font-dark">
              LENIS
            </h2>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wide opacity-80 mb-12 font-sans">
              AS IT SHOULD BE
            </h3>
          </div>
        </div>
      </section>

      {/* Main Description Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={mainTextRef} className="mb-16">
            <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed opacity-90 font-sans">
              Lenis is an{" "}
              <span className="font-semibold">open-source library</span> built
              to standardize scroll experiences and sauce up websites with
              butter-smooth navigation, all while using the platform and keeping
              it accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[4vw] md:text-[6vw] lg:text-[8vw] font-black text-center mb-16 font-dark">
            Lenis brings
            <br />
            the heat
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard number="01" title="RUN SCROLL IN THE MAIN THREAD" />
            <FeatureCard number="02" title="LIGHTWEIGHT (UNDER 4KB)" />
            <FeatureCard number="03" title="MADE FOR 2025+" />
            <FeatureCard number="04" title="BRING YOUR OWN ANIMATION LIBRARY" />
            <FeatureCard
              number="05"
              title="CONTROL THE SCROLL EASING DURATION"
            />
            <FeatureCard number="06" title="USE ANY ELEMENT AS SCROLLER" />
            <FeatureCard
              number="07"
              title="ENJOY HORIZONTAL + VERTICAL SUPPORT"
            />
            <FeatureCard
              number="08"
              title='FEEL FREE TO USE "POSITION: STICKY" AGAIN'
            />
            <FeatureCard number="09" title="TOUCH SUPPORT" />
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[4vw] md:text-[6vw] lg:text-[8vw] font-black mb-16 font-dark">
            Lenis
            <br />
            in use
          </h2>

          <div className="space-y-8">
            <UsageItem name="Deso" company="Studio Freight" />
            <UsageItem name="Sculpting Harmony" company="Resn" />
            <UsageItem name="Superpower" company="" />
            <UsageItem name="Daylight Computer" company="Basement Studio" />
            <UsageItem name="Lifeworld by Olafur Eliasson" company="" />
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base md:text-lg font-light leading-relaxed opacity-90 mb-8 font-sans">
            Lenis is a 100% free and open-source project, built to enhance web
            experiences. 🚀
            <br />
            But maintaining and improving Lenis takes time and resources.
          </p>

          <p className="text-base md:text-lg font-light leading-relaxed opacity-90 mb-12 font-sans">
            If you use Lenis and want to support its development, consider
            becoming a sponsor! 💙
            <br />A huge thank you to everyone who helps keep Lenis alive! 🙌
          </p>

          <button className="px-12 py-4 bg-white text-black text-lg font-light tracking-[0.1em] hover:bg-white/90 transition-all duration-300 font-sans">
            BECOME A SPONSOR
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ number, title }) => {
  return (
    <div className="border border-white/10 p-6 hover:border-white/30 transition-all duration-300 group backdrop-blur-sm bg-white/5">
      <div className="text-sm font-light opacity-40 mb-4 group-hover:opacity-60 transition-opacity font-sans">
        {number}
      </div>
      <h3 className="text-sm font-medium tracking-wide leading-tight group-hover:opacity-90 transition-opacity font-sans">
        {title}
      </h3>
    </div>
  );
};

const ProblemCard = ({ number, title }) => {
  return (
    <div className="border border-white/10 p-6 hover:border-red-500/30 transition-all duration-300 group backdrop-blur-sm bg-white/5">
      <div className="text-sm font-light opacity-40 mb-4 group-hover:opacity-60 transition-opacity text-red-400 font-sans">
        {number}
      </div>
      <h3 className="text-sm font-medium tracking-wide leading-tight group-hover:opacity-90 transition-opacity font-sans">
        {title}
      </h3>
    </div>
  );
};

const UsageItem = ({ name, company }) => {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-4 hover:border-white/30 transition-all duration-300 group">
      <div className="flex items-center space-x-4">
        <span className="text-lg md:text-xl font-light group-hover:opacity-90 transition-opacity font-sans">
          {name}
        </span>
        {company && (
          <span className="text-sm opacity-60 group-hover:opacity-80 transition-opacity font-sans">
            {company}
          </span>
        )}
      </div>
      <div className="w-2 h-2 bg-white/20 rounded-full group-hover:bg-violet-400 transition-all duration-300"></div>
    </div>
  );
};

export default Hero;
