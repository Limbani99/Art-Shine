import React, { useRef } from 'react'
import { useAnimations } from '../../hooks/useAnimations'

function ContactForm() {
  const sectionRef = useRef()
  const { wordReveal, magneticButton } = useAnimations(sectionRef)

  wordReveal('.word-reveal')
  magneticButton('.magnetic')

  return (
    <div ref={sectionRef} className="w-full bg-white shadow-xl shadow-[#ece3d4]/60 rounded-sm p-10 md:p-14 lg:p-16 relative overflow-hidden flex flex-col h-full border border-[#fdfaf6]">
      
      <p className="text-[10px] tracking-[0.2em] font-bold text-[#c08f65] uppercase mb-4">
        Let's Create Together
      </p>
      
      <h2 className="font-serif text-3xl md:text-4xl text-[#1a1c21] font-bold mb-10 word-reveal">
        Start Your Commission
      </h2>

      <form className="flex flex-col gap-8 flex-1" onClick={(e) => e.preventDefault()}>
        
        {/* Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="flex flex-col gap-2 relative">
             <label className="text-[10px] uppercase tracking-[0.1em] font-medium text-[#c08f65]">Full Name</label>
             <input type="text" placeholder="Evelyn Thorne" className="w-full bg-transparent border-b border-[#e8dccb] py-3 text-sm font-sans tracking-wide text-[#3d2e1f] placeholder-[#b0a395] focus:outline-none focus:border-[#c08f65] transition-colors" />
           </div>
           <div className="flex flex-col gap-2 relative">
             <label className="text-[10px] uppercase tracking-[0.1em] font-medium text-[#c08f65]">Phone Number</label>
             <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-transparent border-b border-[#e8dccb] py-3 text-sm font-sans tracking-wide text-[#3d2e1f] placeholder-[#b0a395] focus:outline-none focus:border-[#c08f65] transition-colors" />
           </div>
        </div>

        {/* Dropdown */}
        <div className="flex flex-col gap-2 relative w-full">
           <label className="text-[10px] uppercase tracking-[0.1em] font-medium text-[#c08f65]">Service Type</label>
           <div className="relative w-full">
             <select className="w-full appearance-none bg-transparent border-b border-[#e8dccb] py-3 text-sm font-sans tracking-wide text-[#3d2e1f] focus:outline-none focus:border-[#c08f65] transition-colors cursor-pointer">
               <option>Warmala Preservation</option>
               <option>Bridal Bouquet Frame</option>
               <option>Resin Jewellery Block</option>
               <option>Custom Dimension Piece</option>
             </select>
             {/* Custom Chevron since appearance-none drops it */}
             <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#a87a52]">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
             </div>
           </div>
        </div>

        {/* Textbox */}
        <div className="flex flex-col gap-2 relative flex-1">
           <label className="text-[10px] uppercase tracking-[0.1em] font-medium text-[#c08f65]">Your Message</label>
           <textarea placeholder="Tell us about your flowers and the story behind them..." className="w-full bg-transparent border-b border-[#e8dccb] py-3 text-sm font-sans tracking-wide text-[#3d2e1f] placeholder-[#b0a395] focus:outline-none focus:border-[#c08f65] transition-colors resize-none h-32 flex-1" />
        </div>

        {/* Submit */}
        <div className="pt-4">
           <button className="bg-[#a87a52] hover:bg-[#8e613b] transition-colors text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-md w-max magnetic">
             Request Booking
           </button>
        </div>

      </form>
    </div>
  )
}


export default ContactForm
