import React, { useLayoutEffect, useRef } from 'react';
// Using a stable CDN for imports
import { gsap } from 'https://esm.sh/gsap';
import { ScrollTrigger } from 'https://esm.sh/gsap/ScrollTrigger';
import Lenis from 'https://esm.sh/@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
    {
        title: "Collaborative Partnership",
        description: "We don't just build; we build with you. Your voice is integral at every stage, ensuring the final product is truly yours.",
    },
    {
        title: "Efficiency & Reliability",
        description: "Your time is valuable. We deliver high-quality solutions on schedule, with transparent communication and no surprises.",
    },
    {
        title: "Modern & Creative",
        description: "We craft designs that are not only visually stunning but also intuitive and engineered to connect with your audience on a deeper level.",
    },
    {
        title: "Complex Problems, Simple Solutions",
        description: "As a problem-solving duo, we excel at deconstructing complex challenges into clean, elegant, and effective digital solutions.",
    },
];

const WhyWorkWithUs = () => {
    const componentRef = useRef(null);
    const itemsRef = useRef([]);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    useLayoutEffect(() => {
        // --- 1. LENIS & GSAP SETUP ---
        const lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
        // --- End of Setup ---

        const ctx = gsap.context(() => {
            // Animation for the benefit items scrolling into view
            itemsRef.current.forEach((item) => {
                gsap.fromTo(item,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            });

            // --- SCROLLING LOGIC: NO PINNING ---
            // This animation makes the left column scroll up along with the right column.
            const mm = gsap.matchMedia();
            mm.add("(min-width: 768px)", () => {
                // We calculate the distance the right column will scroll past the left one.
                const scrollDistance = rightColRef.current.offsetHeight - leftColRef.current.offsetHeight;

                // Animate the 'y' property of the left column.
                gsap.to(leftColRef.current, {
                    y: -scrollDistance, // Move it up by the calculated distance
                    ease: "none",      // A linear ease for a direct 1-to-1 scroll feeling
                    scrollTrigger: {
                        trigger: rightColRef.current, // The right column is the trigger
                        start: "top top",         // Start when the top of the right col hits the top of the viewport
                        end: "bottom bottom",     // End when the bottom of the right col hits the bottom of the viewport
                        scrub: true,              // This links the animation progress directly to the scrollbar position
                    }
                });
            });

        }, componentRef);

        // --- 3. CLEANUP FUNCTION ---
        return () => {
            ctx.revert();
            lenis.destroy();
        };
    }, []);

    return (
        // The parent section needs enough vertical space for the scrolling effect to be visible.
        <section ref={componentRef} className="bg-black text-white py-24 md:py-32 font-dark" style={{ minHeight: '120vh' }}>
            <div className="max-w-6xl mx-auto pt-20 px-6 md:px-12">
                <div className="md:grid md:grid-cols-3 md:gap-16">
                    {/* Left column that will now scroll with the right */}
                    <div ref={leftColRef} className="md:col-span-1 py-8 flex justify-center items-center">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide opacity-90 mb-8 leading-tight">
                            Why Work<br/>
                            With<br/> Duo <span style={{ color: '#9914ba' }}>Web</span>

                        </h2>
                    </div>
                    {/* Right column that scrolls naturally */}
                    <div ref={rightColRef} className="md:col-span-2 mt-16 md:mt-0">
                        <div className="flex flex-col gap-12 md:gap-24">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    ref={(el) => (itemsRef.current[index] = el)}
                                    className="benefit-item" // Opacity is handled by GSAP
                                >
                                    <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white/90">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-lg font-light leading-relaxed text-white/60">
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyWorkWithUs;