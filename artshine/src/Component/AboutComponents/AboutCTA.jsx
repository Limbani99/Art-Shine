import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAnimations } from '../../hooks/useAnimations'

function AboutCTA() {
  const sectionRef = useRef()
  const { wordReveal, magneticButton } = useAnimations(sectionRef)

  wordReveal('.word-reveal')
  magneticButton('.magnetic')

  return (
    <section ref={sectionRef} className="w-full bg-[#fdfaf6] px-6 md:px-16 py-24 md:py-32 flex flex-col items-center justify-center text-center">
      <div className="max-w-[700px] mx-auto flex flex-col items-center">
        
        <h2 className="font-serif text-4xl md:text-5xl leading-tight text-[#3d2e1f] mb-6 font-bold word-reveal">
          Ready to preserve your story?
        </h2>
        
        <p className="font-light text-[15px] md:text-[16px] leading-relaxed text-[#665e55] mb-12">
           Whether it's a wedding bouquet, an anniversary gift, or a garden favorite, let us help you keep it forever.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
           <Link to="/contact" className="w-full sm:w-auto bg-[#a87a52] hover:bg-[#8e613b] transition-colors text-white px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-sm magnetic">
             Start A Commission
           </Link>
           <Link to="/gallery" className="w-full sm:w-auto bg-transparent border border-[#a87a52] hover:bg-[#a87a52] hover:text-white transition-colors text-[#a87a52] px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm magnetic">
             View Gallery
           </Link>
        </div>

      </div>
    </section>
  )
}


export default AboutCTA
