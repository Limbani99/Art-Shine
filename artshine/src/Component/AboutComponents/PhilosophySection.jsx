import React, { useRef } from 'react'
import { useAnimations } from '../../hooks/useAnimations'

function PhilosophySection() {
  const sectionRef = useRef()
  const { wordReveal, imageClipReveal } = useAnimations(sectionRef)

  wordReveal('.word-reveal')
  imageClipReveal('.clip-reveal')

  return (
    <section ref={sectionRef} className="w-full bg-[#fdfaf6] px-6 md:px-16 py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        
        {/* Left Column: Title and Staggered Images */}
        <div className="flex flex-col relative h-full">
          <p className="text-[10px] tracking-[0.2em] font-medium text-[#c08f65] uppercase mb-4">
             Origins & Philosophy
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-[#1a1c21] mb-12 lg:mb-20 word-reveal">
            The Delicate Art<br/>
            of <span className="italic text-[#8c6b54]">Botanical<br/>Preservation</span>
          </h2>

          <div className="relative w-full aspect-square mt-8 md:mt-24 lg:mt-32">
             {/* Portrait Aspect Botanical Photo */}
             <div className="absolute top-0 left-0 w-[55%] md:w-[45%] h-[120%] z-10 p-2 bg-white shadow-xl shadow-[#ece3d4]/60 transform -translate-y-16 clip-reveal">
                 <img src="/images/about_botanical.png" alt="Dried rustic botanical flowers" className="w-full h-full object-cover" />
             </div>

             {/* Square Resin Photo Offset */}
             <div className="absolute bottom-0 right-0 w-[60%] aspect-square z-20 p-2 bg-white shadow-xl shadow-[#ece3d4]/50 transform translate-y-12 md:translate-y-8 clip-reveal">
                 <img src="/images/about_swirl.png" alt="Swirling golden amber liquid resin" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>

        {/* Right Column: Narrative Text */}
        <div className="flex flex-col gap-10 mt-16 md:mt-24 lg:mt-0 pt-8 lg:pl-12">
          
          <div className="flex flex-col gap-3 border-b border-[#f0e6d8] pb-10">
             <h3 className="font-serif text-[22px] text-[#3d2e1f] font-bold word-reveal">A Seed of an Idea</h3>
             <p className="text-[#887a6d] font-light text-[14px] leading-relaxed">
               Art Shine began in a small glass-walled studio overlooking a wildflower meadow. Our founder, Diana, was inspired by the heartbreak of watching a bridal bouquet wither away just days after the ceremony. She wondered: "How can we hold onto the life within these petals forever?"
             </p>
          </div>

          <div className="flex flex-col gap-3 mb-6">
             <h3 className="font-serif text-[22px] text-[#3d2e1f] font-bold word-reveal">The Alchemical Process</h3>
             <p className="text-[#887a6d] font-light text-[14px] leading-[1.8]">
               Through years of experimentation with archival resins and moisture-wicking techniques, we developed a proprietary preservation method. It's not just about drying; it's about maintaining the structural integrity and vibrant pigment of each specimen. We treat every petal as a masterwork of natural engineering.
             </p>
             <p className="text-[#887a6d] font-light text-[14px] leading-[1.8] mt-2">
               Our studio uses museum-grade materials that prevent yellowing over time, ensuring your preserved mementos stay as clear as the day they were cast. This meticulous craft requires patience—some pieces take up to six weeks to cure and polish to a high-gloss finish.
             </p>
          </div>

          <blockquote className="border-l-4 border-[#c08f65] pl-8 py-2 mb-10 bg-gradient-to-r from-[#fdfaf6] to-transparent">
             <p className="font-serif italic text-xl md:text-2xl text-[#3d2e1f] leading-snug mb-4 word-reveal">
               "We don't just sell art; we sell the ability to keep a moment of spring in your home all year long. Every bubble and vein in the petal tells a story of a day that was too beautiful to lose."
             </p>
             <footer className="text-[10px] tracking-[0.2em] font-medium text-[#c08f65] uppercase">
               — Diana Hastings, Founder
             </footer>
          </blockquote>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#f0e6d8]">
             <h3 className="font-serif text-[22px] text-[#3d2e1f] font-bold word-reveal">Sustainability & Care</h3>
             <p className="text-[#887a6d] font-light text-[14px] leading-[1.8]">
               We believe in conscious creation. Our studio sources flora from local sustainable gardens and ethical florists. We minimize waste by using leftover resin for our "Miniature Bloom" collections, ensuring that every drop of material and every petal finds its place in a home.
             </p>
          </div>

        </div>

      </div>
    </section>
  )
}


export default PhilosophySection
