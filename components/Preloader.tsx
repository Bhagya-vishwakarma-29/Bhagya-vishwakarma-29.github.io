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

            tl.to('.name-text span', {
                y: 0,
                stagger: 0.05,
                duration: 0.2,
            });

            // First fade out the text
            tl.to('.name-text span', { 
                autoAlpha: 0,
                y: '-100%',
                duration: 0.3,
                stagger: 0.05
            }, '+=1');
            
            // Then animate the strips
            tl.to('.preloader-item', {
                y: '100%',
                duration: 0.5,
                stagger: 0.1,
            }, '+=0.1')
            .to(
                preloaderRef.current,
                {
                    autoAlpha: 0,
                    display: 'none',
                },
                '<0.5',
            );
        },
        { scope: preloaderRef },
    );

    return (
        <>
            <div className="fixed inset-0 flex z-50" ref={preloaderRef} style={{ pointerEvents: 'all' }}>
                <div className="preloader-item h-full w-[10%] bg-black"></div>
                <div className="preloader-item h-full w-[10%] bg-black"></div>
                <div className="preloader-item h-full w-[10%] bg-black"></div>
                <div className="preloader-item h-full w-[10%] bg-black"></div>
                <div className="preloader-item h-full w-[10%] bg-black"></div>
                <div className="preloader-item h-full w-[10%] bg-black"></div>
                <div className="preloader-item h-full w-[10%] bg-black"></div>
                <div className="preloader-item h-full w-[10%] bg-black"></div>
                <div className="preloader-item h-full w-[10%] bg-black"></div>
                <div className="preloader-item h-full w-[10%] bg-black"></div>

                <p className="name-text  flex text-[20vw] lg:text-[200px] font-anton text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none overflow-hidden z-[60]">
                    <span className="inline-block translate-y-full">B</span>
                    <span className="inline-block translate-y-full">H</span>
                    <span className="inline-block translate-y-full">A</span>
                    <span className="inline-block translate-y-full">G</span>
                    <span className="inline-block translate-y-full">Y</span>
                    <span className="inline-block translate-y-full">A</span>
                </p>
            </div>
        </>
    );
};
export default Preloader;
