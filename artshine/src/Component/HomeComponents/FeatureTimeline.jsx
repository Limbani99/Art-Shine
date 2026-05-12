import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        title: "Initial Consultation",
        description: "We discuss your vision, flower types, and preservation goals to ensure perfect results.",
        image: "/images/story.png",
        year: "STEP 01"
    },
    {
        title: "Drying Process",
        description: "Our proprietary 3-week drying method preserves color and delicate petal structures.",
        image: "/images/hero.png",
        year: "STEP 02"
    },
    {
        title: "Resin Casting",
        description: "Museum-grade resin is poured in layers to eliminate bubbles and ensure clarity.",
        image: "/images/varmala.png",
        year: "STEP 03"
    },
    {
        title: "Finishing & Polish",
        description: "Hand-sanding and polishing to a mirror-like finish for a premium feel.",
        image: "/images/service.png",
        year: "STEP 04"
    }
];

const FeatureTimeline = () => {
    const sectionRef = useRef();
    const triggerRef = useRef();

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Desktop horizontal scroll
            gsap.fromTo(sectionRef.current, 
                { x: 0 }, 
                { 
                    x: "-300vw", 
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        pin: true,
                        scrub: 1,
                        end: () => "+=" + sectionRef.current.offsetWidth,
                    }
                }
            );
        });

        mm.add("(max-width: 767px)", () => {
            // Mobile vertical reveal
            const slides = gsap.utils.toArray(".timeline-slide");
            slides.forEach((slide) => {
                gsap.from(slide, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    scrollTrigger: {
                        trigger: slide,
                        start: "top 80%",
                    }
                });
            });
        });

        return () => mm.revert();
    }, { scope: triggerRef });

    return (
        <div ref={triggerRef} className="overflow-hidden bg-[#1a1c21] text-white">
            <div ref={sectionRef} className="flex flex-col md:flex-row md:w-[400vw] relative items-center">
                
                {/* Intro Slide */}
                <div className="timeline-slide w-full md:w-[100vw] h-screen flex flex-col justify-center px-10 md:px-20">
                    <p className="text-[#d49b78] uppercase tracking-[0.3em] font-bold mb-4">Our Process</p>
                    <h2 className="font-serif text-5xl md:text-8xl leading-none mb-8">
                        The Journey of <br className="hidden md:block" /> Preservation
                    </h2>
                    <div className="w-20 h-[1px] bg-[#d49b78]" />
                </div>

                {/* Feature Slides */}
                {features.map((feature, idx) => (
                    <div key={idx} className="timeline-slide w-full md:w-[100vw] h-[70vh] md:h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 gap-8 md:gap-20 py-10 md:py-0">
                        <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] overflow-hidden rounded-2xl relative group">
                            <img 
                                src={feature.image} 
                                alt={feature.title} 
                                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
                            />
                            <div className="absolute top-4 left-4 md:top-8 md:left-8 text-6xl md:text-8xl font-serif text-white/10">{idx + 1}</div>
                        </div>
                        <div className="w-full md:w-1/2 max-w-xl text-center md:text-left">
                            <p className="text-[#d49b78] font-mono mb-2 md:mb-4">{feature.year}</p>
                            <h3 className="font-serif text-3xl md:text-5xl mb-4 md:mb-6">{feature.title}</h3>
                            <p className="text-gray-400 text-base md:text-xl font-light leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};


export default FeatureTimeline;
