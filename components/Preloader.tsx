'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const Preloader: React.FC = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                defaults: {
                    ease: 'power1.inOut',
                },
            });

            // Initial fade in of the terminal frame
            tl.from('.terminal-frame', {
                scale: 0.8,
                opacity: 0,
                duration: 0.3
            });

            // Animate the terminal text
            tl.from('.terminal-text', {
                opacity: 0,
                y: 20,
                duration: 0.2,
                stagger: 0.05
            });

            // Animate the loading dots
            tl.to('.loading-dot', {
                opacity: 1,
                duration: 0.01,
                stagger: 0.1,
                repeat: 1
            });

            // Type welcome message
            tl.to('.welcome-text', {
                text: 'Welcome to my portfolio',
                duration: 0.2,
                ease: 'none'
            });

            // Animate the terminal frame out
            tl.to('.terminal-frame', {
                scale: 0.8,
                opacity: 0,
                duration: 0.2
            }, '+=0.3');

            // Final fade out
            tl.to(
                preloaderRef.current,
                {
                    autoAlpha: 0,
                    display: 'none',
                },
                '<0.1',
            );
        },
        { scope: preloaderRef },
    );

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black" ref={preloaderRef}>
            <div className="terminal-frame relative w-[80%] max-w-2xl h-64 bg-gray-900 border border-cyan-500 rounded-lg p-6 overflow-hidden">
                <div className="absolute top-3 left-3 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                
                <div className="mt-8 font-mono text-cyan-400">
                    <div className="terminal-text">Welcome to My Portfolio</div>
                    <div className="terminal-text">Loading components...</div>
                    <div className="terminal-text">Starting up terminal</div>
                    <div className="flex items-center gap-1 mt-2">
                        <span className="text-cyan-400">Loading</span>
                        <span className="loading-dot opacity-0">.</span>
                        <span className="loading-dot opacity-0">.</span>
                        <span className="loading-dot opacity-0">.</span>
                    </div>
                    <div className="mt-4 text-xl welcome-text text-cyan-400"></div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
