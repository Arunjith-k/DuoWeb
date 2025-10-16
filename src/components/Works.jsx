import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- IMAGES ---
import firstImage from '../assets/Images/zelion.png';
import secondImage from '../assets/Images/iris-deodrant.png';
import thirdImage from '../assets/Images/golden-spoon.png';
import fourthImage from '../assets/Images/fovo.png';
import fifthImage from '../assets/Images/fifth.jpeg';
import sixthImage from '../assets/Images/paris.jpeg';

gsap.registerPlugin(ScrollTrigger);

// --- UPDATED: Added a 'description' field to each object ---
const worksData = [
    {
        id: 1,
        title: 'Zelion',
        image: firstImage,
        year: '2026',
        indicator: '/ D S G N 1',
        side: 'right',
        description: 'elion Sportswear – A sleek, responsive website designed to showcase premium athletic apparel with a focus on modern design, product highlights, and smooth user experience'
    },
    {
        id: 2,
        title: 'Iris Deodrant',
        image: secondImage,
        year: '2026',
        indicator: '/ D S G N 2',
        side: 'left',
        description: 'Iris Deodorant – A clean, modern, and responsive website created for a deodorant brand, featuring product showcases, vibrant visuals, and smooth navigation to highlight freshness and quality'
    },
    {
        id: 3,
        title: 'Golden Spoon',
        image: thirdImage,
        year: '2026',
        indicator: '/ D S G N 3',
        side: 'right',
        description: 'The Golden Spoon website is a modern, responsive platform showcasing the restaurant\'s menu, ambience, and services. It features an elegant, user-friendly design optimized for browsing and making reservations.'
    },
    {
        id: 4,
        title: 'FOVO',
        image: fourthImage,
        year: '2026',
        indicator: '/ D S G N 4',
        side: 'left',
        description: 'Fovo is a website dedicated to showcasing an extensive collection of designer bags. The platform is organized into a wide variety of categories, allowing shoppers to easily browse and discover styles that match their preferences.'
    },
    //{ id: 5, title: 'Milan Fashion Week', image: fifthImage, year: '2026', indicator: '/ D S G N 5', side: 'left' },
    //{ id: 6, title: 'Paris Fashion Week', image: sixthImage, year: '2026', indicator: '/ D S G N 6', side: 'right' },
];

const Works = () => {
    const componentRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.work-section');
            sections.forEach((section) => {
                const side = section.dataset.side;
                const isRightAligned = side === 'right';

                const poster = section.querySelector('.poster');
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
                        .from(textContent, { xPercent: -50, autoAlpha: 0, ease: 'power2.out' }, 0.1)
                        .from(indicator, { autoAlpha: 0, y: 20 }, 0.2);
                } else {
                    tl.from(poster, { xPercent: -100, scale: 0.8, autoAlpha: 0, ease: 'power2.out' }, 0)
                        .from(textContent, { xPercent: 50, autoAlpha: 0, ease: 'power2.out' }, 0.1)
                        .from(indicator, { autoAlpha: 0, y: 20 }, 0.2);
                }
            });
        }, componentRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={componentRef} className="bg-black text-white w-full overflow-x-hidden font-sans">
            <div className="flex justify-center items-center pt-20 pb-10 md:pb-20">
                <h2 className="text-center text-[5vw] md:text-[8vw] lg:text-[10vw] font-dark leading-none tracking-tight">
                    WORKS
                </h2>
            </div>

            <main className="pb-20">
                {worksData.map((work) => (
                    <section
                        key={work.id}
                        data-side={work.side}
                        className={`
                            work-section 
                            relative min-h-screen w-full 
                            flex flex-col ${work.side === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'}
                            items-center justify-center md:justify-between 
                            gap-12 md:gap-16 
                            px-8 md:px-16 
                            overflow-hidden
                        `}
                    >
                        {/* 1. TEXT BLOCK */}
                        <div className="text-content w-full md:w-1/2 lg:w-4/12 max-w-lg relative">
                            <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase text-zinc-500/30 -z-10 absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                                {work.year}
                            </h2>
                            <p className="text-4xl md:text-5xl font-bold uppercase">
                                {work.title}
                            </p>

                            {/* --- UPDATED: Now renders the unique description --- */}
                            <p className="mt-4 text-base font-light max-w-md text-white">
                                {work.description}
                            </p>
                        </div>

                        {/* 2. IMAGE BLOCK */}
                        <div className="poster w-full md:w-1/2 lg:w-6/12 max-w-2xl">
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