import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import ServicesGrid from "./ServicesGrid.jsx";
import WhyWorkWithUs from "./WhyWorkWithUs.jsx";
import MetallicShapes from "./MetallicShapes.jsx";
import WorkDetails from "./WorkDetails.jsx";
import Works from "./Works.jsx";
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
    const buttonRef = useRef(null); // 👈 added button ref

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
        // --- Lenis smooth scroll setup ---
        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);

        const update = (time) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        // --- Hero entrance animation ---
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
                buttonRef.current, // 👈 button animates in
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=0.4"
            )
            .fromTo(
                scrollTextRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.4"
            );

        // --- Font cycling animation ---
        const fontCycleTL = gsap.timeline({ repeat: -1 });
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
                .to({}, { duration: 1.2 });
        });

        // --- Animate sections on scroll ---
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

        // --- Cleanup ---
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
                            }}
                        >
              WEB
            </span>
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="text-sm md:text-base lg:text-lg tracking-[0.3em] opacity-70 mb-8 pt-10"
                    >
                        Hey, we’re Duo Web — a creative duo turning ideas into reality through
                        collaboration. We design, develop, and deliver digital experiences that
                        bring your vision to life.
                    </p>

                    <div className="flex flex-col items-center gap-2">
                        <button
                            ref={buttonRef} // 👈 button ref added
                            className="
                px-8 py-3
                bg-gray-800/80
                text-purple-400
                font-light tracking-[0.2em] uppercase
                border border-purple-400
                rounded-md
                backdrop-blur-sm
                transition-all duration-300 ease-in-out
                hover:bg-purple-500
                hover:text-white
                hover:font-semibold
                hover:shadow-[0_0_25px_theme(colors.purple.500)]
                hover:scale-105
                focus:outline-none
              "
                        >
                            See Our Works
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollTextRef}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center"
                >
                    <div className="flex flex-col items-center space-y-4">
                        <p className="text-sm font-dark tracking-[0.2em] opacity-60">SCROLL</p>
                        <p className="text-sm font-dark tracking-[0.2em] opacity-60">
                            TO EXPLORE
                        </p>
                        <div className="w-px h-16 bg-white/20"></div>
                    </div>
                </div>
            </section>
                <section>
                    <Works />
                </section>
            {/* Services Section */}
            <section className="min-h-screen w-full flex flex-col items-center px-6 md:px-12 pt-16">
                <h2 className="text-center text-[5vw] md:text-[8vw] lg:text-[10vw] font-dark leading-none tracking-tight mb-8">
                    SERVICES
                </h2>
                <WorkDetails />
            </section>

            <section>
                <WhyWorkWithUs />
            </section>
        </div>
    );
};

export default Hero;
