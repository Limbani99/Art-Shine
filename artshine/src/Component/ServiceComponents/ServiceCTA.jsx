import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAnimations } from '../../hooks/useAnimations'

function ServiceCTA() {
  const sectionRef = useRef()
  const { wordReveal, magneticButton } = useAnimations(sectionRef)

  wordReveal('.word-reveal')
  magneticButton('.magnetic')

  return (
    <section ref={sectionRef} className="w-full bg-[#fdfaf6] px-6 md:px-16 py-12 md:py-20 lg:pb-32 flex flex-col items-center">
      <div className="max-w-[1100px] w-full mx-auto bg-[#faeed8]/70 py-20 px-8 flex flex-col items-center justify-center text-center rounded-sm">
        
        <h2 className="font-serif text-4xl md:text-5xl leading-tight text-[#1a1c21] mb-5 font-bold tracking-tight word-reveal">
          Have a Unique Vision?
        </h2>
        
        <p className="font-light text-[14px] md:text-[15px] leading-relaxed text-[#887a6d] mb-10 max-w-[500px]">
           If you have a special request that doesn't fit our standard categories, we would love to hear from you. Let's create something together.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
           <Link to="/contact" className="w-full sm:w-auto bg-[#a87a52] hover:bg-[#8e613b] transition-colors text-white px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-sm min-w-[220px] magnetic">
             Start a Commission
           </Link>
           <Link to="/about" className="w-full sm:w-auto bg-transparent border border-[#a87a52] hover:bg-[#a87a52] hover:text-white transition-colors text-[#a87a52] px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm min-w-[220px] magnetic">
             View Care Guide
           </Link>
        </div>

      </div>
    </section>
  )
}


export default ServiceCTA
