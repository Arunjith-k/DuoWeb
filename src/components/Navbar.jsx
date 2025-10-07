/*
  Component Setup Note:
  This component uses GSAP and Framer Motion for animations.
  If you see errors about unresolved imports, please ensure you have installed the required packages by running this command in your terminal:
  npm install gsap @gsap/react framer-motion clsx tailwind-merge

  This component also imports `navLinks` from '../constants'. Make sure that file exists.
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navLinks } from '../constants';
import logo from '../assets/Images/DuoWeb.png';

// Utility function to merge Tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  // State for the Aceternity UI hover highlight
  const [activeIdx, setActiveIdx] = useState(null);

  // GSAP animation for the background blur and shrinking effect
  useGSAP(() => {
    // Original background blur animation
    gsap.to('nav', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top -10%',
        toggleActions: 'play none none reverse',
      },
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)',
      duration: 0.5,
      ease: 'power1.inOut',
    });

    // NEW: Animation to shrink the navbar width on scroll
    gsap.to('nav', {
      maxWidth: '56rem', // This is 896px, equivalent to max-w-5xl
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '+=500', // The animation completes over the first 500px of scroll
        scrub: 1, // Smoothly links the animation progress to the scrollbar
      }
    });
  });

  return (
    <header className="w-full py-4 fixed top-0 left-0 z-50">
      {/* The navbar now starts wider (max-w-7xl) and will be animated by GSAP */}
      <nav className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 py-3 rounded-full">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} width={32} height={32} alt="DuoWeb logo" />
          <p className="text-white font-dark font-bold text-xl">DuoWeb</p>
        </Link>

        {/* Desktop Navigation Links with Aceternity UI hover effect */}
        <ul
          onMouseLeave={() => setActiveIdx(null)} // Reset when mouse leaves the nav list
          className="hidden md:flex items-center gap-4 p-1 rounded-full"
        >
          {navLinks.map((link, idx) => {
            const isActive = activeIdx === idx;
            return (
              <motion.li
                key={link.id}
                onMouseEnter={() => setActiveIdx(idx)}
                className="relative px-3 py-1.5"
              >
                {/* The animated background highlight from Aceternity UI */}
                {isActive && (
                  <motion.span
                    layoutId="navbar-highlight"
                    className="absolute inset-0 bg-neutral-800/60 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                {/* The link text */}
                <Link
                  to={`/${link.id}`}
                  className="relative z-10 text-sm font-dark text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {link.title}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
