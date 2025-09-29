import { useState, useRef } from "react";

// --- BENTO GRID HELPER COMPONENTS ---

const BentoTilt = ({ children, className = "" }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;
        const { left, top, width, height } =
            itemRef.current.getBoundingClientRect();
        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;
        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;
        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
            ref={itemRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle, transition: 'transform 0.1s ease-out' }}
        >
            {children}
        </div>
    );
};

const BentoCard = ({ src, title, description }) => {
    return (
        <div className="relative size-full overflow-hidden rounded-md border border-white/10">
            <video
                src={src}
                loop
                muted
                autoPlay
                playsInline
                className="absolute left-0 top-0 size-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="relative z-10 flex size-full flex-col justify-end p-5 text-blue-50 md:p-6">
                <h2 className="text-2xl font-bold md:text-4xl">{title}</h2>
                {description && (
                    <p className="mt-2 max-w-lg text-xs font-light text-white/80 md:text-base">{description}</p>
                )}
            </div>
        </div>
    );
};

// --- BENTO GRID SECTION COMPONENT ---

const ServicesGrid = () => (
    // The "section-animate" class can be used by GSAP if you import this into the Hero component
    <section className="section-animate w-full max-w-7xl mx-auto py-24">
        <div className="container mx-auto px-4 md:px-10">
            <h1 className="mb-12 text-center text-4xl font-bold tracking-tight md:text-6xl">
                What We Create, Together
            </h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-7">
                <BentoTilt className="md:col-span-2 h-96 md:h-[30rem]">
                    <BentoCard
                        src="videos/feature-1.mp4" // Replace with your video
                        title="Web Development"
                        description="Your concept, our code. Responsive and fast websites tailored to your goals."
                    />
                </BentoTilt>
                <BentoTilt className="h-96 md:h-[30rem]">
                    <BentoCard
                        src="videos/feature-2.mp4" // Replace with your video
                        title="UI/UX Design"
                        description="We listen to your users’ needs and craft engaging, user-first experiences."
                    />
                </BentoTilt>
                <BentoTilt className="h-96 md:h-[30rem]">
                    <BentoCard
                        src="videos/feature-3.mp4" // Replace with your video
                        title="Branding & Graphics"
                        description="From your story, we build visuals that speak for your brand."
                    />
                </BentoTilt>
                <BentoTilt className="md:col-span-2 h-96 md:h-[30rem]">
                    <BentoCard
                        src="videos/feature-4.mp4" // Replace with your video
                        title="Custom Solutions"
                        description="Unique ideas deserve unique solutions — we collaborate with you to build exactly what you need."
                    />
                </BentoTilt>
            </div>
        </div>
    </section>
);


export default ServicesGrid;

