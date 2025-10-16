import React, { useEffect, useRef, useState } from 'react';

// --- Import images ---
import firstImg from '../assets/images/web-development.jpg';
import secondImg from '../assets/images/ui-ux.jpg';
import thirdImg from '../assets/images/custom-solutions.jpg';
import fourthImg from '../assets/images/app-design.jpg';

// --- Data ---
const servicesData = [
    {
        id: 1,
        category: '01',
        title: 'WEB DEVELOPMENT',
        imageUrl: firstImg,
        services: [],
        description: 'We build high-performance, responsive websites that are fast, secure, and look stunning on all devices.',
    },
    {
        id: 2,
        category: '02',
        title: 'UI/UX DESIGN',
        imageUrl: secondImg,
        services: [],
        description: 'Our user-centered approach creates intuitive and beautiful interfaces that are a pleasure to use.',
    },
    {
        id: 3,
        category: '03',
        title: 'CUSTOM SOLUTIONS',
        imageUrl: thirdImg,
        services: [],
        description: 'We build bespoke applications, tailored to your unique challenges and designed to streamline operations.',
    },
    {
        id: 4,
        category: '04',
        title: 'BRANDING AND GRAPHICS',
        imageUrl: fourthImg,
        services: [],
        description: 'We craft memorable logos and compelling visual identities that capture your brand\'s essence.',
    },
];

// --- Main Component ---
export default function Services() {
    const cardsContainerRef = useRef(null);
    const cardRefs = useRef([]);
    const [isGsapLoaded, setIsGsapLoaded] = useState(false);

    // Effect to dynamically load the GSAP script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.async = true;
        script.onload = () => setIsGsapLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Add card elements to the ref array
    const addToRefs = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };

    // Effect to set up animations, runs after GSAP is loaded
    useEffect(() => {
        if (!isGsapLoaded || cardRefs.current.length === 0) return;

        const cards = cardRefs.current;
        const gsap = window.gsap;
        const listeners = [];

        const initTimer = setTimeout(() => {
            if (!cards[0]) return;
            const normalWidth = cards[0].offsetWidth;
            const expandedWidth = normalWidth * 1.5;
            const initialImageScale = 0.6;

            cards.forEach((card, index) => {
                const image = card.querySelector('.card-image');
                const descriptionWrapper = card.querySelector('.card-description-wrapper');
                const descriptionText = card.querySelector('.card-description-text');
                const overlay = card.querySelector('.card-overlay');

                if (!image || !descriptionWrapper || !descriptionText || !overlay) {
                    console.warn("GSAP animation target not found in card:", card);
                    return;
                }

                gsap.set(image, { scale: initialImageScale });
                gsap.set(overlay, { backgroundColor: 'rgba(0,0,0,0.6)' });

                const handleMouseEnter = () => {
                    gsap.killTweensOf(descriptionWrapper);

                    // --- FIX 1: Removed the onComplete wrapper ---
                    gsap.to(card, {
                        width: expandedWidth,
                        duration: 0.6,
                        ease: 'power3.out',
                    });

                    // --- FIX 2: Animate text at the same time and faster ---
                    gsap.to(descriptionWrapper, {
                        height: descriptionText.offsetHeight + 16, // 16px = p-4
                        duration: 0.3, // <-- Faster duration
                        ease: 'power3.out',
                    });

                    gsap.to(image, { scale: 1, duration: 0.6, ease: 'power3.out' });
                    gsap.to(overlay, { backgroundColor: 'rgba(0,0,0,0.3)', duration: 0.6, ease: 'power3.out' });

                    cards.forEach((otherCard, otherIndex) => {
                        if (index !== otherIndex) {
                            gsap.to(otherCard, { opacity: 0.6, duration: 0.4, ease: 'power3.out' });
                        }
                    });
                };

                const handleMouseLeave = () => {
                    gsap.killTweensOf(descriptionWrapper);

                    // --- FIX 3: Made the "hide" animation faster to match ---
                    gsap.to(descriptionWrapper, { height: 0, duration: 0.3, ease: 'power3.out' });

                    gsap.to(card, { width: normalWidth, duration: 0.6, ease: 'power3.out' });
                    gsap.to(image, { scale: initialImageScale, duration: 0.6, ease: 'power3.out' });
                    gsap.to(overlay, { backgroundColor: 'rgba(0,0,0,0.6)', duration: 0.6, ease: 'power3.out' });

                    cards.forEach((otherCard) => {
                        gsap.to(otherCard, { opacity: 1, duration: 0.4, ease: 'power3.out' });
                    });
                };

                card.addEventListener('mouseenter', handleMouseEnter);
                card.addEventListener('mouseleave', handleMouseLeave);

                listeners.push({ card, handleMouseEnter, handleMouseLeave });
            });
        }, 100);

        return () => {
            clearTimeout(initTimer);
            listeners.forEach(({ card, handleMouseEnter, handleMouseLeave }) => {
                card.removeEventListener('mouseenter', handleMouseEnter);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [isGsapLoaded]);

    return (
        <div className="bg-black text-white min-h-screen w-full flex flex-col font-sans overflow-hidden py-8">
            <div
                ref={cardsContainerRef}
                className="flex items-center gap-8 w-full justify-center px-8"
            >
                {servicesData.map((item) => (
                    <div
                        ref={addToRefs}
                        key={item.id}
                        className="group relative flex-shrink-0 w-[22rem] h-[36rem] rounded-xl bg-[#1c1c1c] overflow-hidden cursor-pointer"
                    >
                        {/* Background Image */}
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="card-image absolute top-0 left-0 w-full h-full object-cover"
                        />
                        {/* Overlay */}
                        <div className="card-overlay absolute inset-0"></div>

                        {/* Content Block */}
                        <div className="relative z-10 h-full flex flex-col justify-between p-7">

                            {/* Top Content: title and category */}
                            <div className="w-full overflow-hidden">
                                <p className="text-gray-300 text-sm">{item.category}</p>
                                <h3 className="text-4xl font-semibold mt-1">{item.title}</h3>
                            </div>

                            {/* Bottom Content: description wrapper */}
                            <div className="card-description-wrapper h-0 overflow-hidden">
                                <p className="card-description-text text-gray-200 text-base leading-relaxed p-4 bg-black bg-opacity-20 rounded-lg">
                                    {item.description}
                                </p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}