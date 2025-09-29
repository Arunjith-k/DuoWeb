import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import servicesGrid from "./ServicesGrid.jsx";
import ServicesGrid from "./ServicesGrid.jsx";
// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const scrollTextRef = useRef(null);
    const webTextRef = useRef(null);

    const fontConfigs = [
        { class: "font-broken", scale: 1.0 },
        { class: "font-living", scale: 1.0 },
        { class: "font-manu", scale: 1.0 },
        { class: "font-omerta", scale: 1.3 },
        { class: "font-raven", scale: 1.0 },
        { class: "font-stroke", scale: 1.2 },
        { class: "font-wells", scale: 1.0 },
        { class: "font-yugi", scale: 1.4 },
        { class: "font-dark", scale: 1.1 },
    ];

    const fontClasses = fontConfigs.map((config) => config.class);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
        });

        // Sync Lenis with GSAP's ticker for optimal performance
        const update = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);
        lenis.on("scroll", ScrollTrigger.update);

        // --- GSAP Initial Animations ---
        const tl = gsap.timeline({ delay: 0.5 });
        tl.fromTo(
            titleRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        )
            .fromTo(
                subtitleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=0.6"
            )
            .fromTo(
                scrollTextRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.4"
            );

        // --- GSAP Font Cycling Animation ---
        const fontCycleTL = gsap.timeline({
            repeat: -1,
        });

        fontConfigs.forEach((config) => {
            fontCycleTL
                .add(() => {
                    if (!webTextRef.current) return;
                    fontClasses.forEach((font) =>
                        webTextRef.current.classList.remove(font)
                    );
                    webTextRef.current.classList.add(config.class);
                    gsap.set(webTextRef.current, {
                        scale: config.scale,
                        transformOrigin: "center center",
                    });
                })
                .to({}, { duration: 1.2 }); // Wait for 1.2 seconds
        });

        // --- GSAP Scroll-Triggered Animations ---
        gsap.utils.toArray(".section-animate").forEach((section) => {
            gsap.fromTo(
                section,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                }
            );
        });

        // --- Cleanup Function ---
        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
            fontCycleTL.kill();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [fontConfigs, fontClasses]);

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-black text-white font-sans overflow-hidden"
        >
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                </div>

                <div className="text-center z-10">
                    <h1
                        ref={titleRef}
                        className="text-[8vw] md:text-[12vw] lg:text-[15vw] leading-none tracking-tight mb-4 font-dark flex justify-center items-center"
                    >
                        <span>DUO</span>
                        <span
                            ref={webTextRef}
                            className="text-violet-600 font-dark cursor-pointer inline-block text-center"
                            style={{
                                width: "2.7em",
                                display: "inline-block",
                                paddingTop: "0.05em",
                                verticalAlign: "middle",
                            }} // Adjust this value to fit your widest font
                        >
              WEB
            </span>
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="text-sm md:text-base lg:text-lg font-light tracking-[0.3em] opacity-70 mb-8"
                    >
                        FreeLancing Agency
                    </p>
                </div>

                <div
                    ref={scrollTextRef}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center"
                >
                    <div className="flex flex-col items-center space-y-4">
                        <p className="text-sm font-light tracking-[0.2em] opacity-60">
                            SCROLL
                        </p>
                        <p className="text-sm font-light tracking-[0.2em] opacity-60">
                            TO EXPLORE
                        </p>
                        <div className="w-px h-16 bg-white/20"></div>
                    </div>
                </div>
            </section>

            {/* --- DUO PHILOSOPHY SECTION (MODIFIED) --- */}
            <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12 relative">
                <div className="w-full max-w-6xl text-left z-10">
                    <p className="text-lg md:text-xl lg:text-2xl font-light tracking-[0.2em] opacity-80 mb-8">
                        THE DUO PHILOSOPHY
                    </p>
                    <p className="text-base md:text-lg font-light tracking-[0.15em] opacity-60 mb-16">
                        The ‘Duo’ in Duo_Web isn’t just our team — it’s the bond we form with you. We believe collaboration is the heart of creativity. When you bring your goals, and we bring our skills, we become a duo that makes ideas real. Together, we design, develop, and deliver.
                    </p>
                    <p className="text-sm md:text-base font-light tracking-[0.1em] opacity-50 mb-8">
                        WEBSITE DESIGNED BY OUR TEAM.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-start">
                        <button className="px-8 py-3 border border-white/20 text-sm font-light tracking-[0.1em] hover:bg-white hover:text-black transition-all duration-300">
                            DOCUMENTATION
                        </button>
                        <button className="px-8 py-3 bg-white text-black text-sm font-light tracking-[0.1em] hover:bg-white/90 transition-all duration-300">
                            BECOME A SPONSOR
                        </button>
                    </div>
                </div>
            </section>

            {/*  <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide opacity-80 mb-16">
                        What We Create, Together
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                        <div className="text-left">
                            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">
                                CREATE MORE IMMERSIVE INTERFACES
                            </h3>
                            <p className="text-base font-light opacity-80 leading-relaxed">
                                Unlock the creative potential and impact of your web
                                experiences. Smoothing the scroll pulls users into the flow of
                                the experience that feels so substantial that they forget
                                they're navigating a web page.
                            </p>
                        </div>

                        <div className="text-left">
                            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">
                                NORMALIZE ALL YOUR USER INPUTS
                            </h3>
                            <p className="text-base font-light opacity-80 leading-relaxed">
                                Give all your users the same (dope) experience whether they're
                                using trackpads, mouse wheels, or otherwise. With smooth scroll,
                                you control how silky, heavy, or responsive the experience
                                should be — no matter the input. Magic!
                            </p>
                        </div>

                        <div className="text-left">
                            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">
                                MAKE YOUR ANIMATIONS FLAWLESS
                            </h3>
                            <p className="text-base font-light opacity-80 leading-relaxed">
                                Synchronization with native scroll is not reliable. Those jumps
                                and delays with scroll-linked animations are caused by
                                multi-threading, where modern browsers run animations/effects
                                asynchronously with the scroll. Smooth scroll fixes this.
                            </p>
                        </div>
                    </div>
                </div>
            </section> */}
            <section>
                <ServicesGrid />

            </section>

            <section className="section-animate min-h-screen flex flex-col justify-center items-center px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide opacity-80 mb-8">
                            Rethinking smooth scroll
                        </h2>
                        <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 mb-12">
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
        </div>
    );
};

// Re-adding the ProblemCard component so the code is complete
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

export default Hero;