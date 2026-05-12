import React, { useRef } from 'react'
import { useAnimations } from '../../hooks/useAnimations'

function PromiseBox() {
  const sectionRef = useRef()
  const { wordReveal, imageClipReveal } = useAnimations(sectionRef)

  wordReveal('.word-reveal')
  imageClipReveal('.clip-reveal')

  return (
    <section ref={sectionRef} className="w-full bg-[#faeed8]/30 px-6 md:px-16 py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto relative mt-8">
        
        {/* Floating Tab */}
        <div className="absolute -top-5 md:-top-6 left-8 md:left-16 bg-[#8c6b54] text-white px-6 md:px-8 py-3 md:py-4 text-[11px] md:text-xs uppercase font-bold tracking-[0.2em] rounded-sm shadow-xl z-20 shadow-[#8c6b54]/30">
           The Artist's Promise
        </div>

        {/* White Shadow Box container */}
        <div className="w-full bg-white shadow-2xl shadow-[#ece3d4]/70 rounded-md overflow-hidden relative z-10 p-10 md:p-16 lg:p-24">
           
           <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">
             
             {/* Left Image Square */}
             <div className="w-full aspect-square bg-[#fdfaf6] p-2 rounded-sm shadow-inner overflow-hidden border border-[#faf6f0] clip-reveal">
                <img 
                  src="/images/about_leaves.png" 
                  alt="Lush green tropical leaves layout" 
                  className="w-full h-full object-cover rounded-sm hover:scale-105 transition-transform duration-[2s]" 
                />
             </div>

             {/* Right Content */}
             <div className="flex flex-col">
                <h3 className="font-serif text-3xl md:text-4xl text-[#3d2e1f] font-bold mb-6 word-reveal">Heirloom Quality</h3>
                <p className="text-[#887a6d] font-light text-[14px] leading-[1.8] mb-10">
                  Our preservation frames and resin blocks are designed to last generations. We provide a lifetime clarity guarantee on all our custom commissions. This is more than home decor; it is an heirloom that carries the legacy of your most cherished celebrations.
                </p>

                <ul className="flex flex-col gap-4">
                   <li className="flex items-center gap-4 group">
                      <div className="w-5 h-5 rounded-full bg-[#fdfaf6] flex items-center justify-center shrink-0 border border-[#e8dccb] group-hover:border-[#c08f65] transition-colors">
                         <div className="w-2 h-2 rounded-full bg-[#c08f65]"></div>
                      </div>
                      <span className="text-[12px] uppercase tracking-wide font-medium text-[#64748b]">UV-Resistant Archival Resins</span>
                   </li>
                   <li className="flex items-center gap-4 group">
                      <div className="w-5 h-5 rounded-full bg-[#fdfaf6] flex items-center justify-center shrink-0 border border-[#e8dccb] group-hover:border-[#c08f65] transition-colors">
                         <div className="w-2 h-2 rounded-full bg-[#c08f65]"></div>
                      </div>
                      <span className="text-[12px] uppercase tracking-wide font-medium text-[#64748b]">Ethically Sourced Flora</span>
                   </li>
                   <li className="flex items-center gap-4 group">
                      <div className="w-5 h-5 rounded-full bg-[#fdfaf6] flex items-center justify-center shrink-0 border border-[#e8dccb] group-hover:border-[#c08f65] transition-colors">
                         <div className="w-2 h-2 rounded-full bg-[#c08f65]"></div>
                      </div>
                      <span className="text-[12px] uppercase tracking-wide font-medium text-[#64748b]">Hand-Polished Mirror Finish</span>
                   </li>
                </ul>
             </div>

           </div>
        </div>

      </div>
    </section>
  )
}


export default PromiseBox
