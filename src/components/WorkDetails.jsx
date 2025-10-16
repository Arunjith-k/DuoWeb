import React, { useState, useRef, useEffect } from 'react';

// --- Import your images ---
// Make sure your images are in 'src/assets/images/'
import firstImg from '../assets/images/web-development.jpg';
import secondImg from '../assets/images/ui-ux.jpg';
import thirdImg from '../assets/images/custom-solutions.jpg';
import fourthImg from '../assets/images/app-design.jpg';

// --- Data for the work panels ---
const workData = [
    {
        number: '01',
        title: 'WEB DEVELOPMENT',
        image: firstImg,
        content: {
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
    },
    {
        number: '02',
        title: 'UI/UX DESIGN',
        image: secondImg,
        content: {
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
    },
    {
        number: '03',
        title: 'CUSTOM SOLUTIONS',
        image: thirdImg,
        content: {
            description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        },
    },
    {
        number: '04',
        title: 'BRANDING AND GRAPHICS',
        image: fourthImg,
        content: {
            description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
        },
    },
];

// --- WorkPanel Component ---
const WorkPanel = ({ panelData, isActive, onMouseEnter, gsapReady, activeIndex }) => {
    const contentRef = useRef(null);
    const tl = useRef(null);
    const isCollapsed = !isActive && activeIndex !== null; // To control heading layout

    // Effect for the hover content animation (smaller image and description)
    useEffect(() => {
        if (!gsapReady || !window.gsap) return;

        const q = window.gsap.utils.selector(contentRef);
        const contentElements = [
            q(".panel-hover-image"), // Changed class for clarity
            q(".panel-description")
        ].flat().filter(Boolean);

        // Set initial state for the hidden content
        window.gsap.set(contentRef.current, { autoAlpha: 0 });
        window.gsap.set(contentElements, { y: 30, opacity: 0 });

        const ctx = window.gsap.context(() => {
            tl.current = window.gsap.timeline({ paused: true })
                .to(contentRef.current, { autoAlpha: 1, duration: 0.1 })
                .to(contentElements, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 });
        }, contentRef);

        return () => ctx.revert();
    }, [gsapReady]);

    // Play or reverse the animation based on the active state
    useEffect(() => {
        if (tl.current) {
            if (isActive) tl.current.play();
            else tl.current.reverse();
        }
    }, [isActive, gsapReady]);

    return (
        <div
            className="panel relative flex-1 h-full bg-black border-r border-purple-500 flex flex-col justify-between p-8 cursor-pointer overflow-hidden last:border-r-0"
            onMouseEnter={onMouseEnter}
        >
            {/* Full Background Image (Preview) */}
            <div className="absolute inset-0 z-0">
                <img
                    src={panelData.image}
                    alt={`${panelData.title} background`}
                    className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-20' : 'opacity-100'}`}
                />
            </div>

            {/* Always-Visible Number and Title with original styling */}
            <div className={`relative z-10 flex ${isCollapsed ? 'flex-col items-start' : 'justify-between items-start'} text-stone-300 font-mono transition-all duration-300`}>
                <span className="text-sm mb-1">{panelData.number}</span>
                <h2 className={`text-xl ${isCollapsed ? 'leading-tight' : 'writing-mode-vertical-rl transform -translate-x-2'}`}>{panelData.title}</h2>
            </div>

            {/* Hover Content (smaller image and description) */}
            {/* This content is positioned to be centered in the available space */}
            <div ref={contentRef} className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center p-8">
                <div className="panel-hover-image w-full h-[45%] mb-6 overflow-hidden rounded-lg shadow-2xl">
                    <img src={panelData.image} alt={panelData.title} className="w-full h-full object-cover" />
                </div>
                <p className="panel-description font-sans text-stone-300 text-sm leading-relaxed text-center">
                    {panelData.content.description}
                </p>
            </div>
        </div>
    );
};

// --- Main WorkDetails Component ---
export default function WorkDetails() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [gsapReady, setGsapReady] = useState(false);
    const panelsContainerRef = useRef(null);

    // GSAP script loader
    useEffect(() => {
        if (window.gsap) {
            setGsapReady(true);
            return;
        }
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        script.async = true;
        script.onload = () => setGsapReady(true);
        document.body.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    // GSAP animation for expanding/collapsing panels
    useEffect(() => {
        if (!gsapReady || !window.gsap || !panelsContainerRef.current) return;

        const panels = Array.from(panelsContainerRef.current.children);
        if (panels.length === 0) return;

        const expandedGrow = 6;
        const collapsedGrow = 1;

        if (activeIndex !== null) {
            window.gsap.to(panels[activeIndex], {
                flexGrow: expandedGrow,
                duration: 0.8,
                ease: 'power3.inOut'
            });

            const inactivePanels = panels.filter((_, i) => i !== activeIndex);
            window.gsap.to(inactivePanels, {
                flexGrow: collapsedGrow,
                duration: 0.8,
                ease: 'power3.inOut'
            });
        } else {
            // Reset to default state
            window.gsap.to(panels, {
                flexGrow: 1,
                duration: 0.8,
                ease: 'power3.inOut'
            });
        }
    }, [activeIndex, gsapReady]);

    const handleMouseEnter = (index) => {
        setActiveIndex(index);
    };

    const handleMouseLeave = () => {
        setActiveIndex(null);
    };

    return (
        <div className="w-full font-sans text-white">
            <div
                ref={panelsContainerRef}
                className="w-full h-[75vh] flex flex-row border-y border-purple-500 overflow-hidden bg-black"
                onMouseLeave={handleMouseLeave}
            >
                {workData.map((panel, index) => (
                    <WorkPanel
                        key={panel.number}
                        panelData={panel}
                        isActive={activeIndex === index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        gsapReady={gsapReady}
                        activeIndex={activeIndex} // Pass activeIndex to WorkPanel for heading logic
                    />
                ))}
            </div>
        </div>
    );
}