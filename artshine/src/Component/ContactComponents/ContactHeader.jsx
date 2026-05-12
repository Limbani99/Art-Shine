import React, { useRef } from 'react'
import { useAnimations } from '../../hooks/useAnimations'

function ContactHeader() {
  const sectionRef = useRef()
  const { wordReveal, imageClipReveal } = useAnimations(sectionRef)

  wordReveal('.word-reveal')
  imageClipReveal('.clip-reveal')

  return (
    <section ref={sectionRef} className="relative w-full bg-[#fdfaf6] px-6 md:px-16 pt-28 md:pt-40 pb-16 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Decorative Floral Background Fade */}
      <div className="absolute right-0 top-0 w-[400px] h-full pointer-events-none opacity-40 translate-x-1/3 -translate-y-12 clip-reveal">
        <img src="/images/about_botanical.png" alt="Decorative botanical bloom" className="w-full h-full object-cover mix-blend-multiply" />
      </div>

      <div className="max-w-[700px] mx-auto flex flex-col items-center relative z-10">
        
        <h2 className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-[#c08f65] mb-4 word-reveal">
          Handcrafted Memories
        </h2>
        
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#1a1c21] mb-8 font-bold word-reveal">
          Book Your Preservation
        </h1>
        
        <p className="text-[#645c53] font-medium text-[15px] md:text-[16px] leading-[1.8] max-w-[500px]">
          <span className="text-[#3d2e1f] font-bold">Transform your most precious blooms into timeless resin masterpieces.</span><br/>
          Each petal is meticulously dried and encased to capture a moment forever.
        </p>

      </div>
    </section>
  )
}


export default ContactHeader
