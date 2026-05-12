import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const AnimationWrapper = ({ children }) => {
    const scrollRef = useRef();
    const cursorRef = useRef();
    const trailRef = useRef();
    const progressRef = useRef();
    const location = useLocation();

    // Initialize Lenis Smooth Scroll
    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const lenis = new Lenis({
            duration: isMobile ? 1.0 : 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Connect Lenis to ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    // Scroll Progress Bar
    useGSAP(() => {
        gsap.to(progressRef.current, {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: document.documentElement,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3,
            },
        });
    }, { scope: scrollRef });

    // Custom Cursor logic - Disable on touch
    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            gsap.to(cursorRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.1,
            });
            gsap.to(trailRef.current, {
                x: clientX - 10,
                y: clientY - 10,
                duration: 0.3,
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);


    // Page Transition (Curtain Wipe) on route change
    useEffect(() => {
        const curtain = document.getElementById('page-curtain');
        if (curtain) {
            gsap.timeline()
                .fromTo(curtain, { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: 'power4.inOut', transformOrigin: 'top' })
                .to(curtain, { scaleY: 0, duration: 0.4, ease: 'power4.inOut', transformOrigin: 'bottom', delay: 0.1 });
        }
    }, [location.pathname]);

    // Global Floating Animation for Hero elements (only if they exist on current page)
    useGSAP(() => {
        const heroFloatEls = document.querySelectorAll('.hero-float');
        if (heroFloatEls.length === 0) return;
        gsap.to('.hero-float', {
            y: 20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            stagger: 0.2
        });
    }, { scope: scrollRef, dependencies: [location.pathname] });

    return (
        <div ref={scrollRef} className="relative w-full overflow-hidden">
            {/* Scroll Progress Bar */}
            <div className="scroll-progress">
                <div ref={progressRef} className="progress-bar" />
            </div>

            {/* Custom Cursor */}
            <div ref={cursorRef} className="custom-cursor hidden md:block" />
            <div ref={trailRef} className="cursor-trail hidden md:block" />

            {/* Page Transition Curtain */}
            <div id="page-curtain" className="fixed top-0 left-0 w-full h-full bg-brand z-[99999] scale-y-0 pointer-events-none" />

            {children}
        </div>
    );
};

export default AnimationWrapper;
