import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useAnimations = (scopeRef) => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Word-by-word reveal
    const wordReveal = (selector = '.word-reveal') => {
        useGSAP(() => {
            const elements = gsap.utils.toArray(selector);
            elements.forEach((el) => {
                const text = el.innerText;
                el.innerHTML = text.split(' ').map(word => 
                    `<span class="mask-word"><span class="reveal-word">${word}</span></span>`
                ).join(' ');

                gsap.to(el.querySelectorAll('.reveal-word'), {
                    y: 0,
                    duration: 1,
                    stagger: 0.05,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                    }
                });
            });
        }, { scope: scopeRef });
    };

    // Image Clip Revel
    const imageClipReveal = (selector = '.clip-reveal') => {
        useGSAP(() => {
            const elements = gsap.utils.toArray(selector);
            elements.forEach((el) => {
                gsap.to(el, {
                    clipPath: 'inset(0 0% 0 0)',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        end: 'bottom 20%',
                        scrub: true,
                    }
                });
            });
        }, { scope: scopeRef });
    };

    // Parallax Effect - Optimized for performance
    const parallaxEffect = (selector = '[data-speed]') => {
        useGSAP(() => {
            if (isTouch) return;
            const elements = gsap.utils.toArray(selector);
            elements.forEach((el) => {
                const speed = parseFloat(el.getAttribute('data-speed')) || 0.5;
                gsap.to(el, {
                    y: (i, target) => -ScrollTrigger.maxScroll(window) * (speed - 1),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                });
            });
        }, { scope: scopeRef });
    };

    // Counter Animation
    const counterAnimation = (selector = '.counter') => {
        useGSAP(() => {
            const elements = gsap.utils.toArray(selector);
            elements.forEach((el) => {
                const target = parseInt(el.innerText) || 0;
                el.innerText = '0';
                gsap.to(el, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                    }
                });
            });
        }, { scope: scopeRef });
    };

    // Magnetic Button Effect - Disabled on touch
    const magneticButton = (selector = '.magnetic') => {
        useGSAP(() => {
            if (isTouch) return;
            const elements = gsap.utils.toArray(selector);
            elements.forEach((el) => {
                const onMouseMove = (e) => {
                    const { left, top, width, height } = el.getBoundingClientRect();
                    const x = e.clientX - left - width / 2;
                    const y = e.clientY - top - height / 2;
                    gsap.to(el, {
                        x: x * 0.3,
                        y: y * 0.3,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                };
                const onMouseLeave = () => {
                    gsap.to(el, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.3)'
                    });
                };

                el.addEventListener('mousemove', onMouseMove);
                el.addEventListener('mouseleave', onMouseLeave);

                return () => {
                    el.removeEventListener('mousemove', onMouseMove);
                    el.removeEventListener('mouseleave', onMouseLeave);
                };
            });
        }, { scope: scopeRef });
    };

    return { wordReveal, imageClipReveal, parallaxEffect, counterAnimation, magneticButton };
};

