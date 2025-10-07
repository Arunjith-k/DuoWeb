import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

// --- SHADER CODE (GLSL) ---
// This vertex shader simply calculates the position of the vertex.
const vertexShaderSource = `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// This fragment shader sets a solid purple color for every fragment.
const fragmentShaderSource = `
    precision mediump float;

    void main() {
        // Set the final color to a solid purple
        gl_FragColor = vec4(0.5, 0.2, 0.8, 1.0); // Solid Purple
    }
`;


const MetallicShapes = () => {
    const mountRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current || !containerRef.current) return;
        const currentMount = mountRef.current;
        const currentContainer = containerRef.current;
        let animationFrameId;

        const init = async () => {
            // Dynamically import GSAP and ScrollTrigger
            const { gsap } = await import('https://esm.sh/gsap');
            const { ScrollTrigger } = await import('https://esm.sh/gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            // --- Basic Scene Setup ---
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
            camera.position.z = 18;

            // --- Renderer ---
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0x000000, 0);
            currentMount.appendChild(renderer.domElement);

            // --- Controls ---
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.minDistance = 5;
            controls.maxDistance = 30;

            // --- Custom Shader Material ---
            const shaderMaterial = new THREE.ShaderMaterial({
                vertexShader: vertexShaderSource,
                fragmentShader: fragmentShaderSource,
            });

            // --- Create Cubes ---
            const cubeGroup = new THREE.Group();
            scene.add(cubeGroup);
            const cubeCount = 300; // Increased particle count
            const cubeGeometry = new RoundedBoxGeometry(0.5, 0.5, 0.5, 4, 0.1);

            const points = [];
            for (let i = 0; i < cubeCount; i++) {
                const cube = new THREE.Mesh(cubeGeometry, shaderMaterial);

                // Store target positions for shapes
                cube.userData.spherePosition = new THREE.Vector3();
                cube.userData.cubePosition = new THREE.Vector3();

                points.push(cube);
            }

            // --- Calculate Shape Positions ---
            const sphereRadius = 6;
            const cubeSize = 8;

            // 1. Sphere positions (using Fibonacci lattice for even distribution)
            const phi = Math.PI * (3. - Math.sqrt(5.)); // golden angle in radians
            for (let i = 0; i < cubeCount; i++) {
                const y = 1 - (i / (cubeCount - 1)) * 2; // y goes from 1 to -1
                const radius = Math.sqrt(1 - y * y);
                const theta = phi * i;
                const x = Math.cos(theta) * radius;
                const z = Math.sin(theta) * radius;
                points[i].userData.spherePosition.set(x * sphereRadius, y * sphereRadius, z * sphereRadius);
            }

            // 2. Cube positions
            const pointsPerFace = Math.floor(cubeCount / 6);
            let pointIndex = 0;
            const halfCubeSize = cubeSize / 2;
            for (let face = 0; face < 6; face++) {
                for (let j = 0; j < pointsPerFace; j++) {
                    if (pointIndex >= cubeCount) break;
                    let x, y, z;
                    const u = (Math.random() - 0.5) * cubeSize;
                    const v = (Math.random() - 0.5) * cubeSize;
                    switch (face) {
                        case 0: x = u; y = v; z = halfCubeSize; break; // front
                        case 1: x = u; y = v; z = -halfCubeSize; break; // back
                        case 2: x = halfCubeSize; y = u; z = v; break; // right
                        case 3: x = -halfCubeSize; y = u; z = v; break; // left
                        case 4: x = u; y = halfCubeSize; z = v; break; // top
                        case 5: x = u; y = -halfCubeSize; z = v; break; // bottom
                    }
                    points[pointIndex].userData.cubePosition.set(x, y, z);
                    pointIndex++;
                }
            }
            // Distribute any remaining points
            while(pointIndex < cubeCount) {
                points[pointIndex].userData.cubePosition.set(
                    (Math.random() - 0.5) * cubeSize,
                    (Math.random() - 0.5) * cubeSize,
                    (Math.random() - 0.5) * cubeSize
                );
                pointIndex++;
            }


            // Set initial random positions and add to group
            points.forEach(p => {
                p.position.set(
                    (Math.random() - 0.5) * 25,
                    (Math.random() - 0.5) * 25,
                    (Math.random() - 0.5) * 25
                );
                cubeGroup.add(p);
            });


            // --- Scroll-based Animations ---
            const masterTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: currentContainer,
                    start: 'top top',
                    end: '+=3000', // Increased scroll distance for smoother transitions
                    scrub: 1.5,
                    pin: true,
                },
            });

            // Part 1: Exploded -> Sphere
            masterTimeline.addLabel("toSphere");
            points.forEach(p => {
                masterTimeline.to(p.position, {
                    x: p.userData.spherePosition.x,
                    y: p.userData.spherePosition.y,
                    z: p.userData.spherePosition.z,
                    duration: 1,
                    ease: 'power1.inOut'
                }, "toSphere");
            });

            // Part 2: Sphere -> Cube
            masterTimeline.addLabel("toCube", "+=0.5"); // Add a slight delay
            points.forEach(p => {
                masterTimeline.to(p.position, {
                    x: p.userData.cubePosition.x,
                    y: p.userData.cubePosition.y,
                    z: p.userData.cubePosition.z,
                    duration: 1,
                    ease: 'power1.inOut'
                }, "toCube");
            });

            // Part 3: Rotate the final shape
            masterTimeline.to(cubeGroup.rotation, {
                y: Math.PI * 2,
                duration: 2,
                ease: 'power1.inOut'
            }, "toCube");


            // --- Render Loop ---
            const animate = () => {
                controls.update();
                renderer.render(scene, camera);
                animationFrameId = requestAnimationFrame(animate);
            };
            animate();

            // --- Handle Window Resize ---
            const handleResize = () => {
                if (!currentMount) return;
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            };
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                cancelAnimationFrame(animationFrameId);
                ScrollTrigger.getAll().forEach(t => t.kill());
                controls.dispose();
                shaderMaterial.dispose();
                cubeGeometry.dispose();
                renderer.dispose();
                if (currentMount && renderer.domElement.parentNode === currentMount) {
                    currentMount.removeChild(renderer.domElement);
                }
            };
        };

        let cleanup;
        init().then(returnedCleanup => {
            cleanup = returnedCleanup;
        });

        return () => {
            if (cleanup) {
                cleanup();
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-screen h-screen overflow-hidden">
            <div ref={mountRef} className="w-full h-full" />
            <div className="absolute top-4 left-4 bg-black bg-opacity-40 text-white text-sm p-3 rounded-lg pointer-events-none">
                Scroll down to animate the particles. Drag to rotate.
            </div>
            <div style={{ height: '3000px' }}></div>
        </div>
    );
};

export default MetallicShapes;

