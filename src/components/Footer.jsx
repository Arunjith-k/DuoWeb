import React, { useEffect, useRef } from 'react';

const SocialLink = ({ href, children }) => {
    // This component uses Tailwind's group-hover for a pure CSS animation.
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block border border-white/20 px-6 py-4 text-white overflow-hidden"
        >
            {/* Background animates on hover */}
            <span
                className="absolute top-0 left-0 h-full w-full bg-white transition-transform duration-300 ease-in-out transform scale-x-0 origin-left group-hover:scale-x-100"
            ></span>

            {/* Content and icon change color on hover */}
            <div className="relative z-10 flex items-center justify-between transition-colors duration-300 group-hover:text-purple-900">
                <span className="text-lg font-light">{children}</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </div>
        </a>
    );
};

const Footer = () => {
    const headingRef = useRef(null);
    const maskRef = useRef(null);
    const footerRef = useRef(null);
    const textLines = ["Let's build", "something cool"];

    const instagram = import.meta.env.VITE_INSTAGRAM_URL;
const whatsapp = import.meta.env.VITE_WHATSAPP_URL;
const email = import.meta.env.VITE_EMAIL_URL;


    useEffect(() => {
        // GSAP scroll-triggered animation for the negative mask effect.
        const gsapCheck = setInterval(() => {
            if (window.gsap && window.ScrollTrigger && maskRef.current) {
                clearInterval(gsapCheck);

                // Create the animation with ScrollTrigger
                window.ScrollTrigger.create({
                    trigger: footerRef.current,
                    start: 'top 60%', // Start animation when footer is 60% in view
                    onEnter: () => {
                        window.gsap.to(maskRef.current, {
                            width: '100%',
                            duration: 1.5,
                            ease: 'power3.inOut'
                        });
                    },
                    once: true, // Only run the animation once
                });
            }
        }, 100);

        // Cleanup function for the interval
        return () => {
            clearInterval(gsapCheck);
        };
    }, []);

    return (
        <footer
            id='contact'
            ref={footerRef}
            className="relative h-screen w-full bg-purple-900 text-white flex flex-col justify-between p-8 overflow-hidden"
        >
            <div className="relative z-10 flex flex-col h-full">
                <div></div>
                <div className="flex-grow flex flex-col justify-center">
                    <h2
                        ref={headingRef}
                        className="relative text-6xl md:text-8xl font-black mb-12"
                    >
                        {/* Base text (white) */}
                        <div className="text-white">
                            <span className="block">{textLines[0]}</span>
                            <span className="block">{textLines[1]}</span>
                        </div>

                        {/* Masked layer for the wipe effect */}
                        <div ref={maskRef} className="absolute top-0 left-0 h-full w-0 bg-white overflow-hidden">
                            {/* Inverted color text inside the mask */}
                            <div className="text-purple-900 whitespace-nowrap">
                                <span className="block">{textLines[0]}</span>
                                <span className="block">{textLines[1]}</span>
                            </div>
                        </div>
                    </h2>
                    <div className="max-w-md">
                        <p className="mb-6 font-light text-white/80">Or get in touch here</p>
                        <div className="flex flex-col gap-4">
                            <SocialLink href={instagram}>Instagram</SocialLink>
                            <SocialLink href={whatsapp} target="_blank" >Whatsapp</SocialLink>
                            <SocialLink href={email}>Email</SocialLink>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm font-light text-white/60">
                    <p>&copy; {new Date().getFullYear()} DUO WEB</p>
                    <div className="hidden  gap-6">
                        <a href="#" className="hover:text-white transition-colors">Imprint</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
