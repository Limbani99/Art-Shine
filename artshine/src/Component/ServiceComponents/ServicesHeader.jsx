import React, { useRef } from 'react'
import { useAnimations } from '../../hooks/useAnimations'

function ServicesHeader() {
  const sectionRef = useRef()
  const { wordReveal } = useAnimations(sectionRef)

  wordReveal('.word-reveal')

  return (
    <section ref={sectionRef} className="w-full bg-[#fdfaf6] px-6 md:px-16 pt-24 md:pt-32 pb-12 flex flex-col items-center justify-center text-center">
      <div className="max-w-[700px] mx-auto flex flex-col items-center">
        
        <p className="text-[9px] md:text-[10px] tracking-[0.25em] font-medium text-[#c08f65] uppercase mb-4 md:mb-6">
          The Art of Eternal Blooms
        </p>
        
        <h1 className="font-serif text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] tracking-tight text-[#1a1c21] mb-6 font-bold word-reveal">
          Our Preservation Services
        </h1>
        
        <p className="font-serif italic text-xl md:text-2xl text-[#c08f65] mb-6 tracking-wide word-reveal">
          Captured in a moment, kept for a lifetime.
        </p>
        
        <p className="text-[#887a6d] font-light text-[14px] md:text-[15px] leading-relaxed max-w-[580px]">
          We specialize in transforming fleeting natural beauty into permanent heirlooms. Through meticulous resin casting and pressed floral techniques, we ensure your most cherished memories remain as vibrant as the day they were lived.
        </p>

      </div>
    </section>
  )
}


export default ServicesHeader
