import React, { useRef } from 'react'
import { useAnimations } from '../../hooks/useAnimations'

function AboutHero() {
  const sectionRef = useRef()
  const { wordReveal, imageClipReveal, magneticButton } = useAnimations(sectionRef)

  wordReveal('.word-reveal')
  imageClipReveal('.clip-reveal')
  magneticButton('.magnetic')

  return (
    <section ref={sectionRef} className="w-full px-6 md:px-16 py-16 md:py-24 bg-[#fdfaf6]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
        
        {/* Left Text Content */}
        <div className="flex flex-col mt-12 md:mt-0">
          <p className="text-[10px] tracking-[0.2em] font-medium text-[#c08f65] uppercase mb-4">
            The Artisan Behind the Glass
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#1a1c21] mb-8 word-reveal">
            Preserving<br/>
            the<br/>
            <span className="italic">Ephemeral</span>
          </h1>
          <p className="text-[#64748b] font-medium text-[15px] md:text-[16px] leading-relaxed max-w-[420px] mb-10">
            Meet Diana Hastings, a botanical preservationist dedicated to capturing the fleeting beauty of nature's most delicate moments through resin and fine craftsmanship.
          </p>
          
          <button className="bg-[#a87a52] hover:bg-[#8e613b] transition-colors text-white px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold w-max shadow-sm rounded-sm magnetic">
            Read Our Narrative
          </button>
        </div>

        {/* Right Image Content */}
        <div className="relative">
           {/* Artisan Image */}
           <div className="w-full relative bg-white p-2 shadow-2xl shadow-[#e8dccb]/40 z-10 clip-reveal">
             <img 
               src="/images/about_artisan.png" 
               alt="Artisan working carefully at workbench" 
               className="w-full h-auto max-h-[700px] object-cover"
             />
           </div>

           {/* Overlapping Info Box */}
           <div className="absolute -bottom-8 md:-bottom-12 md:-left-16 z-20 bg-white p-8 md:p-10 shadow-xl border border-[#ece3d4] max-w-[320px]">
             <h3 className="font-serif text-[22px] text-[#8c6b54] mb-3 leading-snug word-reveal">Hand-pressed<br/>with love</h3>
             <p className="text-[#887a6d] font-light text-[11px] leading-relaxed tracking-wide">
               Every piece is carefully selected from local gardens and treated with archival-grade resins.
             </p>
           </div>
        </div>

      </div>
    </section>
  )
}


export default AboutHero
