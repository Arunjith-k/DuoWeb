import React, { useEffect, useRef, useState } from 'react';

import video1 from '../assets/Videos/web.mp4';
import video2 from '../assets/Videos/uides.mp4';
import video3 from '../assets/Videos/custm.mp4';
const servicesData = [
    {
        id: 1,
        category: '01',
        title: 'WEB DEVELOPMENT',
        videoUrl: video1,
        description: 'We build high-performance, responsive websites that are fast, secure, and look stunning on all devices.',
    },
    {
        id: 2,
        category: '02',
        title: 'UI/UX DESIGN',
        videoUrl: video2,
        description: 'Our user-centered approach creates intuitive and beautiful interfaces that are a pleasure to use.',
    },
    {
        id: 3,
        category: '03',
        title: 'CUSTOM SOLUTIONS',
        videoUrl: video3,
        description: 'We build bespoke applications, tailored to your unique challenges and designed to streamline operations.',
    },
];

// --- Main Component ---
export default function Services() {
    const cardsContainerRef = useRef(null);
    const cardRefs = useRef([]);
    const [isGsapLoaded, setIsGsapLoaded] = useState(false);

    // Dynamically load GSAP
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.async = true;
        script.onload = () => setIsGsapLoaded(true);
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    const addToRefs = (el) => {
        if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
    };

    // GSAP hover animations
    useEffect(() => {
        if (!isGsapLoaded || cardRefs.current.length === 0) return;
        const cards = cardRefs.current;
        const gsap = window.gsap;
        const listeners = [];

        const initTimer = setTimeout(() => {
            if (!cards[0]) return;
            const normalWidth = cards[0].offsetWidth;
            const expandedWidth = normalWidth * 1.5;
            const initialScale = 0.6;

            cards.forEach((card, index) => {
                const video = card.querySelector('.card-video');
                const descriptionWrapper = card.querySelector('.card-description-wrapper');
                const descriptionText = card.querySelector('.card-description-text');
                const overlay = card.querySelector('.card-overlay');

                if (!video || !descriptionWrapper || !descriptionText || !overlay) return;

                gsap.set(video, { scale: initialScale });
                gsap.set(overlay, { backgroundColor: 'rgba(0,0,0,0.6)' });

                const handleMouseEnter = () => {
                    gsap.killTweensOf(descriptionWrapper);
                    gsap.to(card, { width: expandedWidth, duration: 0.6, ease: 'power3.out' });
                    gsap.to(descriptionWrapper, { height: descriptionText.offsetHeight + 16, duration: 0.3, ease: 'power3.out' });
                    gsap.to(video, { scale: 1, duration: 0.6, ease: 'power3.out' });
                    gsap.to(overlay, { backgroundColor: 'rgba(0,0,0,0.3)', duration: 0.6 });
                    cards.forEach((otherCard, otherIndex) => {
                        if (index !== otherIndex) gsap.to(otherCard, { opacity: 0.6, duration: 0.4 });
                    });
                };

                const handleMouseLeave = () => {
                    gsap.killTweensOf(descriptionWrapper);
                    gsap.to(descriptionWrapper, { height: 0, duration: 0.3 });
                    gsap.to(card, { width: normalWidth, duration: 0.6 });
                    gsap.to(video, { scale: initialScale, duration: 0.6 });
                    gsap.to(overlay, { backgroundColor: 'rgba(0,0,0,0.6)', duration: 0.6 });
                    cards.forEach((otherCard) => gsap.to(otherCard, { opacity: 1, duration: 0.4 }));
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

            {/* --- Desktop View --- */}
            <div ref={cardsContainerRef} className="hidden md:flex items-center gap-8 w-full justify-center px-8">
                {servicesData.map((item) => (
                    <div
                        ref={addToRefs}
                        key={item.id}
                        className="group relative flex-shrink-0 w-[22rem] h-[36rem] rounded-xl bg-[#1c1c1c] overflow-hidden cursor-pointer"
                    >
                        {/* Video */}
                        <video
                            src={item.videoUrl}
                            className="card-video absolute top-0 left-0 w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                        />
                        {/* Overlay */}
                        <div className="card-overlay absolute inset-0"></div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-between p-7">
                            <div className="w-full overflow-hidden">
                                <p className="text-gray-300 text-sm">{item.category}</p>
                                <h3 className="text-4xl font-semibold mt-1">{item.title}</h3>
                            </div>
                            <div className="card-description-wrapper h-0 overflow-hidden">
                                <p className="card-description-text text-gray-200 text-base leading-relaxed p-4 bg-black bg-opacity-40 rounded-lg">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Mobile View --- */}
            <div className="md:hidden flex flex-col gap-8 w-full px-6">
                {servicesData.map((item) => (
                    <article key={item.id} className="relative w-full rounded-2xl overflow-hidden bg-[#1c1c1c] shadow-lg">
                        {/* Video Container */}
                        <div className="relative h-64 w-full">
                            <video
                                src={item.videoUrl}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            {/* Title Overlay */}
                            <div className="absolute bottom-0 left-0 p-5">
                                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                            </div>
                        </div>
                        <div className="p-5">
                            <p className="text-gray-300 text-base leading-relaxed">{item.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
