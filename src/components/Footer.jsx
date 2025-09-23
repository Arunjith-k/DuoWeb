// src/components/Footer.jsx

import React, { useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';

// Array of pixelated SVG particles.
const PIXEL_PARTICLES = [
    `<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h10v10H0z" fill="#FFF"/></svg>`,
    `<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M4 0h2v4h4v2h-4v4h-2v-4H0V4h4z" fill="#FFF"/></svg>`,
    `<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h10v2h-4v8h-2V2H0z" fill="#FFF"/></svg>`,
    `<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h2v8h8v2H0z" fill="#FFF"/></svg>`,
];

const SocialLink = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden border border-white/20 px-6 py-4 text-white transition-colors duration-300 ease-in-out hover:text-black"
    >
        <span className="absolute inset-0 z-0 origin-left scale-x-0 transform bg-white transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
        <div className="relative z-10 flex items-center justify-between">
            <span className="text-lg font-light">{children}</span>
            <FaArrowRight />
        </div>
    </a>
);

const Footer = () => {
    const particleContainerRef = useRef(null);

    useEffect(() => {
        const container = particleContainerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            const particle = document.createElement('span');

            particle.className = 'absolute pointer-events-none select-none animate-floatUp';

            const randomParticleHTML = PIXEL_PARTICLES[Math.floor(Math.random() * PIXEL_PARTICLES.length)];
            particle.innerHTML = randomParticleHTML;

            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            const size = Math.random() * 15 + 8;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            const animationDuration = Math.random() * 2 + 3;
            particle.style.animationDuration = `${animationDuration}s`;

            container.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, animationDuration * 1000);
        };

        container.addEventListener('mousemove', handleMouseMove);
        return () => container.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <footer className="relative h-screen w-full bg-black text-white flex flex-col justify-between p-8 overflow-hidden">
            <div ref={particleContainerRef} className="absolute inset-0 z-0"></div>

            <div className="relative z-10 flex flex-col h-full">
                <div></div>

                <div className="flex-grow flex flex-col justify-center">
                    <h2 className="text-6xl md:text-8xl font-black mb-12">
                        Let's build
                        <br />
                        something cool ✌️
                    </h2>
                    <div className="max-w-md">
                        <p className="mb-6 font-light">Or get in touch here</p>
                        <div className="flex flex-col gap-4">
                            <SocialLink href="#">Instagram</SocialLink>
                            <SocialLink href="#">LinkedIn</SocialLink>
                            <SocialLink href="#">Contact</SocialLink>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center text-sm font-light text-white/50">
                    <p>&copy; {new Date().getFullYear()} DUO WEB</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Imprint</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;