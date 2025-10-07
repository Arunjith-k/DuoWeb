import React, { useState, useRef, useEffect } from 'react';

// --- Data for the work panels ---
const workData = [
    {
        number: '01',
        title: 'WEB DEVELOPMENT',
        content: {
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            subheading: ['E-COMMERCE PLATFORM', 'REACT & NODE.JS'],
            description: 'A complete overhaul of a legacy e-commerce system, resulting in a 40% increase in conversion rates and improved user engagement through a modern, responsive interface.',
        },
    },
    {
        number: '02',
        title: 'UI/UX DESIGN',
        content: {
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2864&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            list: ['/MOBILE APP DESIGN', '/USER RESEARCH', '/PROTOTYPING', '/USABILITY TESTING'],
            description: 'Designed and prototyped a new mobile banking application focused on intuitive navigation and simplified financial management for millennial users.',
        },
    },
    {
        number: '03',
        title: 'CUSTOM SOLUTIONS',
        content: {
            image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2942&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            subheading: ['BRANDING & IDENTITY', 'MARKETING COLLATERAL'],
            description: 'Developed a new brand identity for a tech startup, including logo, color palette, and a complete set of marketing materials that established a strong market presence.',
        },
    },
    {
        number: '04',
        title: 'BRANDING AND GRAPHICS',
        content: {
            image: 'https://images.unsplash.com/photo-1494498902093-270838520610?q=80&w=2940&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            list: ['/DATA VISUALIZATION', '/ANALYTICS DASHBOARD', '/D3.JS', '/PYTHON'],
            description: 'Created a powerful data visualization dashboard to help a logistics company track shipments and optimize routes in real-time, reducing fuel costs by 15%.',
        },
    },
];

// --- WorkPanel Component ---
const WorkPanel = ({ panelData, isActive, onMouseEnter, gsapReady, activeIndex }) => {
    const contentRef = useRef(null);
    const tl = useRef(null);
    const isCollapsed = !isActive && activeIndex !== null;

    // Effect for the main content reveal
    useEffect(() => {
        if (!gsapReady || !window.gsap) return;

        const q = window.gsap.utils.selector(contentRef);
        const contentElements = [
            q(".panel-image"), q(".panel-subheading"), q(".panel-list"), q(".panel-description")
        ].flat().filter(Boolean);

        window.gsap.set(contentRef.current, { autoAlpha: 0 });
        window.gsap.set(contentElements, { y: 30, opacity: 0 });

        const ctx = window.gsap.context(() => {
            tl.current = window.gsap.timeline({ paused: true })
                .to(contentRef.current, { autoAlpha: 1, duration: 0.1 })
                .to(contentElements, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 });
        }, contentRef);

        return () => ctx.revert();
    }, [gsapReady]);

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
            <div className={`flex ${isCollapsed ? 'flex-col items-start' : 'justify-between items-start'} text-stone-300 font-mono transition-all duration-300`}>
                <span className="text-sm mb-1">{panelData.number}</span>
                <h2 className={`text-xl ${isCollapsed ? 'leading-tight' : 'writing-mode-vertical-rl transform -translate-x-2'}`}>{panelData.title}</h2>
            </div>

            <div ref={contentRef} className="absolute inset-0 top-auto bottom-8 left-8 right-8 h-[60%]">
                {panelData.content.image && (
                    <div className="panel-image w-full h-1/2 mb-6 overflow-hidden rounded-lg">
                        <img src={panelData.content.image} alt={panelData.title} className="w-full h-full object-cover" />
                    </div>
                )}
                {panelData.content.subheading && (
                    <div className="panel-subheading mb-4">
                        {panelData.content.subheading.map((line, i) => (
                            <h3 key={i} className="text-stone-100 font-sans text-2xl font-semibold leading-tight">{line}</h3>
                        ))}
                    </div>
                )}
                {panelData.content.list && (
                    <ul className="panel-list font-mono text-stone-300 text-sm space-y-2 mb-4">
                        {panelData.content.list.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                )}
                {panelData.content.description && (
                    <p className="panel-description font-sans text-stone-400 text-sm leading-relaxed">
                        {panelData.content.description}
                    </p>
                )}
            </div>
        </div>
    );
};


// --- Main WorkDetails Component ---
export default function WorkDetails() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [gsapReady, setGsapReady] = useState(false);
    const panelsContainerRef = useRef(null);

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
        }
    }, []);

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
    }

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
                        activeIndex={activeIndex}
                    />
                ))}
            </div>
        </div>
    );
}

