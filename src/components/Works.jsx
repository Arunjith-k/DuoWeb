import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- IMAGES ---
// Make sure you have these images in your assets folder
import firstImage from '../assets/Images/first.jpeg';
import secondImage from '../assets/Images/second.jpeg';
import thirdImage from '../assets/Images/third.jpeg';
import fourthImage from '../assets/Images/fourth.jpeg';
import fifthImage from '../assets/Images/fifth.jpeg';
import sixthImage from '../assets/Images/paris.jpeg';

gsap.registerPlugin(ScrollTrigger);

const worksData = [
    { id: 1, title: 'London Fashion Week', image: firstImage, year: '2026', indicator: '/ D S G N 1', side: 'left' },
    { id: 2, title: 'Madrid Fashion Week', image: secondImage, year: '2026', indicator: '/ D S G N 2', side: 'right' },
    { id: 3, title: 'Tokyo Fashion Week', image: thirdImage, year: '2026', indicator: '/ D S G N 3', side: 'left' },
    { id: 4, title: 'Kyiv Fashion Week', image: fourthImage, year: '2026', indicator: '/ D S G N 4', side: 'right' },
    //{ id: 5, title: 'Milan Fashion Week', image: fifthImage, year: '2026', indicator: '/ D S G N 5', side: 'left' },
    //{ id: 6, title: 'Paris Fashion Week', image: sixthImage, year: '2026', indicator: '/ D S G N 6', side: 'right' },
];

const Works = () => {
    const componentRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.work-section');
            sections.forEach((section, index) => {
                const isRightAligned = section.classList.contains('right-aligned');
                const poster = section.querySelector('.poster');
                // Select the entire text-content block to animate
                const textContent = section.querySelector('.text-content');
                const indicator = section.querySelector('.indicator');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        end: 'bottom 60%',
                        scrub: 1.5,
                    },
                });

                if (isRightAligned) {
                    tl.from(poster, { xPercent: 100, scale: 0.8, autoAlpha: 0, ease: 'power2.out' }, 0)
                        // Animate the text-content block
                        .from(textContent, { xPercent: -50, autoAlpha: 0, ease: 'power2.out' }, 0.1)
                        .from(indicator, { autoAlpha: 0, y: 20 }, 0.2);
                } else {
                    tl.from(poster, { xPercent: -100, scale: 0.8, autoAlpha: 0, ease: 'power2.out' }, 0)
                        // Animate the text-content block
                        .from(textContent, { xPercent: 50, autoAlpha: 0, ease: 'power2.out' }, 0.1)
                        .from(indicator, { autoAlpha: 0, y: 20 }, 0.2);
                }
            });
        }, componentRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={componentRef} className="bg-black text-white w-full overflow-x-hidden font-sans pt-20">
            <div className="flex -mb-30 justify-center items-center ">
                <h2 className='text-center text-[5vw] md:text-[8vw] lg:text-[10vw] font-dark leading-none tracking-tight'>WORKS</h2>
            </div>
            <main className="pb-20 -pt-50">
                {worksData.map((work) => (
                    <section
                        key={work.id}
                        className={`work-section relative h-screen w-full flex items-center justify-center overflow-hidden px-8 md:px-16 ${
                            work.side === 'right' ? 'right-aligned' : ''
                        }`}
                    >
                        <div className={`w-full flex items-center ${work.side === 'right' ? 'justify-start' : 'justify-end'}`}>
                            <div className="w-1/2 relative flex items-center">
                                {/* This div now wraps all text and is used for the animation */}
                                <div className="text-content">
                                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase text-zinc-500/30 -z-10 absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                                        {work.year}
                                    </h2>
                                    <p className="text-4xl md:text-5xl font-bold uppercase">
                                        {work.title}
                                    </p>
                                    {/* --- NEW DESCRIPTION ADDED HERE --- */}
                                    <p className="mt-4 text-base font-light max-w-md text-white">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`poster w-1/2 max-w-lg absolute top-1/2 -translate-y-1/2 ${
                                work.side === 'left' ? 'left-[15%]' : 'right-[15%]'
                            }`}
                        >
                            <img
                                src={work.image}
                                alt={work.title}
                                className="w-full h-auto object-contain rounded-lg shadow-2xl shadow-black/50"
                            />
                            <div className="indicator text-center mt-4 text-xl font-mono opacity-80">
                                {work.indicator}
                            </div>
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
};

export default Works;