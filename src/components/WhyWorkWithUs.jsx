import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // RESTORED: The original, more dynamic animation logic
            itemsRef.current.forEach((item) => {
                const benefitTitle = item.querySelector('h3');
                const benefitDesc = item.querySelector('p');

                ScrollTrigger.create({
                    trigger: item,
                    start: 'top center',
                    end: 'bottom center',

                    onEnter: () => {
                        gsap.to(item, { opacity: 1, duration: 0.3 });
                        gsap.to([benefitTitle, benefitDesc], { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 });
                    },

                    onLeave: () => {
                        gsap.to(item, { opacity: 0.2, duration: 0.3 });
                        gsap.to([benefitTitle, benefitDesc], { x: '1rem', opacity: 0, duration: 0.4 });
                    },

                    onEnterBack: () => {
                        gsap.to(item, { opacity: 1, duration: 0.3 });
                        gsap.to([benefitTitle, benefitDesc], { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 });
                    },

                    onLeaveBack: () => {
                        gsap.to(item, { opacity: 0.2, duration: 0.3 });
                        gsap.to([benefitTitle, benefitDesc], { x: '1rem', opacity: 0, duration: 0.4 });
                    },
                });
            });

            ScrollTrigger.refresh();

        }, componentRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={componentRef} className="bg-black text-white py-24 md:py-32 font-dark">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="md:grid md:grid-cols-3 md:gap-16">
                    <div className="md:col-span-1 md:sticky md:top-0 md:h-screen flex flex-col justify-center">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide opacity-90 mb-8 leading-tight">
                            WHY WORK<br />
                            WITH WEB DUO<br />
                            ???
                        </h2>
                    </div>
                    <div className="md:col-span-2 mt-16 md:mt-0">
                        <div className="flex flex-col gap-16 md:gap-24">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    ref={(el) => (itemsRef.current[index] = el)}
                                    // RESTORED: Initial state for the animation
                                    className="benefit-item py-8 opacity-20"
                                >
                                    <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white/90 transform translate-x-4 opacity-0">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-lg font-light leading-relaxed text-white/60 transform translate-x-4 opacity-0">
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

