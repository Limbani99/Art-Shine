import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ExplodingCard = ({ children, infoContent }) => {
    const cardRef = useRef();
    const [isExploded, setIsExploded] = useState(false);
    const fragmentsRef = useRef([]);

    useGSAP(() => {
        const isMobile = window.innerWidth < 768;
        if (isExploded) {
            // Explode Effect
            fragmentsRef.current.forEach((frag, i) => {
                const angle = Math.random() * Math.PI * 2;
                const dist = isMobile ? (150 + Math.random() * 100) : (300 + Math.random() * 200);
                gsap.to(frag, {
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    rotation: Math.random() * 720,
                    opacity: 0,
                    scale: 0.5,
                    duration: 0.8,
                    ease: 'power4.out',
                });
            });

            // Reveal Info Panel
            gsap.fromTo('.info-panel', 
                { scale: 0.5, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.6, delay: 0.3, ease: 'back.out(1.7)' }
            );
            
            // Particle Burst
            createParticles(isMobile);
        } else {
            // Reassemble
            fragmentsRef.current.forEach((frag, i) => {
                gsap.to(frag, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power4.inOut',
                });
            });
            gsap.to('.info-panel', { scale: 0.5, opacity: 0, duration: 0.4 });
        }
    }, { scope: cardRef, dependencies: [isExploded] });

    const createParticles = (isMobile) => {
        const container = cardRef.current;
        const count = isMobile ? 10 : 20;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-brand rounded-full pointer-events-none z-50';
            p.style.top = '50%';
            p.style.left = '50%';
            container.appendChild(p);
            
            const angle = Math.random() * Math.PI * 2;
            const dist = isMobile ? (50 + Math.random() * 50) : (100 + Math.random() * 100);
            gsap.to(p, {
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                opacity: 0,
                duration: 0.6,
                onComplete: () => p.remove()
            });
        }
    };


    const handleToggle = () => setIsExploded(!isExploded);

    return (
        <div ref={cardRef} className="relative w-full h-full group cursor-pointer" onClick={handleToggle}>
            {/* Fragments (Simulated by splitting content or just duplicating) */}
            <div className={`relative w-full h-full transition-opacity duration-300 ${isExploded ? 'opacity-0' : 'opacity-100'}`}>
                {children}
            </div>

            {/* Explosion Overlay (Revealed when exploded) */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${isExploded ? 'block' : 'hidden'}`}>
                {[...Array(8)].map((_, i) => (
                    <div 
                        key={i} 
                        ref={el => fragmentsRef.current[i] = el}
                        className="absolute w-1/2 h-1/2 bg-gray-200 border border-white opacity-0"
                        style={{ 
                            clipPath: `polygon(${Math.random()*100}% ${Math.random()*100}%, ${Math.random()*100}% ${Math.random()*100}%, ${Math.random()*100}% ${Math.random()*100}%)`,
                            top: i < 4 ? '0' : '50%',
                            left: i % 2 === 0 ? '0' : '50%'
                        }}
                    >
                        {/* Cloned look of the card */}
                        <div className="w-[200%] h-[200%] absolute" style={{ top: i < 4 ? '0' : '-100%', left: i % 2 === 0 ? '0' : '-100%' }}>
                            {children}
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Panel Reveal */}
            <div className="info-panel absolute inset-0 bg-white/95 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center text-center opacity-0 scale-0 z-20">
                <button className="absolute top-4 right-4 text-2xl" onClick={(e) => { e.stopPropagation(); handleToggle(); }}>×</button>
                {infoContent}
            </div>
        </div>
    );
};

export default ExplodingCard;
