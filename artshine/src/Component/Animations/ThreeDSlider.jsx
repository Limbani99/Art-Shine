import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const ThreeDSlider = ({ items }) => {
    const containerRef = useRef();
    const carouselRef = useRef();
    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(() => {
        const carousel = carouselRef.current;
        const cellCount = items.length;
        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            let { isMobile } = context.conditions;
            const cardWidth = isMobile ? 220 : 300;
            const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / cellCount));

            // Initial positioning
            items.forEach((_, i) => {
                const angle = (i / cellCount) * 360;
                gsap.set(carousel.children[i], {
                    rotationY: angle,
                    z: radius,
                    transformOrigin: `50% 50% ${-radius}px`,
                    width: cardWidth
                });
            });

            // DRAGGABLE Logic
            Draggable.create(carousel, {
                type: 'rotationY',
                inertia: true,
                onDrag: function () {
                    const rotation = this.rotationY % 360;
                    const index = Math.round(-rotation / (360 / cellCount));
                    setActiveIndex((index + cellCount) % cellCount);
                },
                onThrowUpdate: function () {
                    const rotation = this.rotationY % 360;
                    const index = Math.round(-rotation / (360 / cellCount));
                    setActiveIndex((index + cellCount) % cellCount);
                }
            });
        });

        // Mouse tilting only for desktop
        const onMouseMove = (e) => {
            if (window.innerWidth < 768) return;
            const activeCard = carousel.children[activeIndex];
            if (activeCard) {
                const { left, top, width, height } = activeCard.getBoundingClientRect();
                const x = (e.clientX - left - width / 2) / (width / 2);
                const y = (e.clientY - top - height / 2) / (height / 2);
                gsap.to(activeCard, {
                    rotationY: `+=${x * 10}`,
                    rotationX: -y * 10,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        };

        if (window.innerWidth >= 768) {
            window.addEventListener('mousemove', onMouseMove);
        }

        return () => {
            mm.revert();
            window.removeEventListener('mousemove', onMouseMove);
        };

    }, { scope: containerRef, dependencies: [activeIndex] });

    return (
        <div ref={containerRef} className="perspective-1200 w-full h-[450px] md:h-[600px] flex items-center justify-center overflow-hidden py-10 md:py-20">
            <div ref={carouselRef} className="relative w-[220px] md:w-[300px] h-[350px] md:h-[450px] preserve-3d">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-white shadow-2xl rounded-2xl overflow-hidden backface-hidden transition-opacity duration-500 ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-40'}`}
                        style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                    >
                        <img src={item.image} alt={item.title} className="w-full h-1/2 md:h-2/3 object-cover" />
                        <div className="p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-serif mb-2">{item.title}</h3>
                            <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ThreeDSlider;
