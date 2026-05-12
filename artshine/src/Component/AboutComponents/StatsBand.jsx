import React, { useRef } from 'react'
import { Sparkles } from 'lucide-react'
import { useAnimations } from '../../hooks/useAnimations'

function StatsBand() {
  const sectionRef = useRef()
  const { counterAnimation } = useAnimations(sectionRef)

  counterAnimation('.counter')

  return (
    <section ref={sectionRef} className="w-full bg-[#fdfaf6] px-6 md:px-16 pb-20 pt-10">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
        
        {/* Stat Box 1 */}
        <div className="w-full md:w-[35%] bg-[#fcf6ee] py-12 flex flex-col items-center justify-center border border-[#f0e6d8]">
            <div className="font-serif text-4xl lg:text-5xl text-[#a87a52] mb-3"><span className="counter">1200</span>+</div>
            <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#887a6d]">Happy Customers</div>
        </div>

        {/* Center Aesthetic Element */}
        <div className="flex flex-col items-center justify-center shrink-0">
           <div className="w-8 h-8 rounded-full bg-[#fdfaf6] flex items-center justify-center mb-3 text-[#a87a52]">
              <Sparkles className="w-5 h-5" strokeWidth={1.5} />
           </div>
           <span className="font-serif italic text-lg text-[#3d2e1f]">Artistry in Every Detail</span>
        </div>

        {/* Stat Box 2 */}
        <div className="w-full md:w-[35%] bg-[#fcf6ee] py-12 flex flex-col items-center justify-center border border-[#f0e6d8]">
            <div className="font-serif text-4xl lg:text-5xl text-[#a87a52] mb-3"><span className="counter">8</span>+</div>
            <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#887a6d]">Years of Experience</div>
        </div>

      </div>
    </section>
  )
}


export default StatsBand
