import React, { useRef } from 'react'
import { useAnimations } from '../../hooks/useAnimations'

function ServicePromise() {
  const sectionRef = useRef()
  const { wordReveal } = useAnimations(sectionRef)

  wordReveal('.word-reveal')

  return (
    <section ref={sectionRef} className="w-full bg-[#fdfaf6] px-6 md:px-16 py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto bg-[#e8dcce] p-10 md:p-16 lg:p-24 rounded-sm shadow-sm relative overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
           
           {/* Left Block - The Promise */}
           <div className="flex flex-col">
              <p className="font-serif italic text-2xl md:text-3xl text-[#c08f65] mb-4 md:mb-6 word-reveal">
                the artist's promise
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.15] text-[#1a1c21] font-bold mb-6 word-reveal">
                Every petal is treated with the reverence of a masterpiece.
              </h2>
              <p className="text-[#645c53] font-light text-[13px] md:text-[14.5px] leading-relaxed max-w-[400px]">
                Our process is slow by design. We don't just "make" products; we preserve timelines. Each commission undergoes a 4-6 week curing process to ensure the resin is bubble-free and the colors remain archival-grade for decades to come.
              </p>
           </div>
           
           {/* Right Block - Blockquote */}
           <div className="flex flex-col border-l border-[#c08f65]/30 pl-8 md:pl-12 py-4">
              <p className="font-serif italic text-[22px] md:text-[26px] leading-relaxed text-[#c08f65] word-reveal">
                "Art is not what you see, but what you make others see. We make them see the eternal beauty in a single flower."
              </p>
           </div>
           
        </div>

      </div>
    </section>
  )
}


export default ServicePromise
