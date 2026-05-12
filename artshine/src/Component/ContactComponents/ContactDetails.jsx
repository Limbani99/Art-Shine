import React, { useRef } from 'react'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import { useAnimations } from '../../hooks/useAnimations'

function ContactDetails() {
   const sectionRef = useRef()
   const { wordReveal, magneticButton } = useAnimations(sectionRef)

   wordReveal('.word-reveal')
   magneticButton('.magnetic')

   return (
      <div ref={sectionRef} className="w-full flex flex-col gap-16 md:gap-24 h-full">

         {/* Testimonial Feature Box */}
         <div className="w-full bg-[#faeed8]/70 p-10 md:p-12 relative rounded-sm">
            <h3 className="absolute -top-7 md:-top-8 left-4 font-serif italic text-5xl md:text-6xl text-[#e8dccb]/80 pointer-events-none select-none">
               Beauty
            </h3>
            <h4 className="font-serif text-2xl md:text-3xl text-[#3d2e1f] font-bold mb-6 mt-4 relative z-10 word-reveal">
               The Artisan Touch
            </h4>
            <p className="font-light text-[14px] leading-relaxed text-[#645c53] mb-8 relative z-10 italic">
               "The way Art Shine preserved my wedding bouquet was magical. It feels like the morning of my wedding is frozen in crystal forever."
            </p>

            <div className="flex items-center gap-4 relative z-10">
               <div className="w-10 h-10 rounded-full bg-[#e8dccb] overflow-hidden border border-white">
                  <img src="/images/about_artisan.png" alt="Client Review" className="w-full h-full object-cover scale-150 object-top" />
               </div>
               <div className="flex flex-col">
                  <span className="font-serif text-[13px] text-[#1a1c21] font-bold tracking-tight leading-tight">Sarah Jenkins</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#b0a395] leading-none mt-1">Verified Client</span>
               </div>
            </div>
         </div>

         {/* Connection Links */}
         <div className="flex flex-col pl-2">
            <p className="text-[10px] tracking-[0.2em] font-bold text-[#a87a52] uppercase mb-8">
               Other Ways to Connect
            </p>

            <div className="flex flex-col gap-8">
               <a href="mailto:hello@artshine.studio" className="flex items-start gap-5 group magnetic">
                  <div className="w-10 h-10 rounded bg-[#f4e9d8] flex items-center justify-center shrink-0 border border-[#f0e6d8] text-[#a87a52] group-hover:bg-[#a87a52] group-hover:text-white transition-colors duration-300">
                     <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col pt-0.5">
                     <span className="text-[10px] uppercase tracking-[0.1em] font-medium text-[#b0a395] mb-1">Email Us</span>
                     <span className="text-[#3d2e1f] font-sans text-sm block group-hover:text-[#a87a52] transition-colors">hello@artshine.studio</span>
                  </div>
               </a>

               <a href="tel:+1234567890" className="flex items-start gap-5 group magnetic">
                  <div className="w-10 h-10 rounded bg-[#f4e9d8] flex items-center justify-center shrink-0 border border-[#f0e6d8] text-[#a87a52] group-hover:bg-[#a87a52] group-hover:text-white transition-colors duration-300">
                     <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col pt-0.5">
                     <span className="text-[10px] uppercase tracking-[0.1em] font-medium text-[#b0a395] mb-1">Phone</span>
                     <span className="text-[#3d2e1f] font-sans text-sm block group-hover:text-[#a87a52] transition-colors">+1 (234) 567-890</span>
                  </div>
               </a>

               <div className="flex items-start gap-5 group cursor-pointer magnetic">
                  <div className="w-10 h-10 rounded bg-[#f4e9d8] flex items-center justify-center shrink-0 border border-[#f0e6d8] text-[#a87a52] group-hover:bg-[#a87a52] group-hover:text-white transition-colors duration-300">
                     <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col pt-0.5">
                     <span className="text-[10px] uppercase tracking-[0.1em] font-medium text-[#b0a395] mb-1">WhatsApp</span>
                     <span className="text-[#3d2e1f] font-sans text-sm block group-hover:text-[#a87a52] transition-colors">Send a message</span>
                  </div>
               </div>
            </div>

            {/* Social Links Minimum Space */}
            <p className="text-[9px] tracking-[0.2em] font-medium text-[#c08f65] uppercase mt-12 mb-4">
               Follow The Journey
            </p>
            <div className="flex items-center gap-3">
               <a href="#" className="w-8 h-8 rounded bg-[#f4e9d8] flex items-center justify-center text-[#a87a52] hover:bg-[#a87a52] hover:text-white transition-colors magnetic">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
               </a>
               <a href="#" className="w-8 h-8 rounded bg-[#f4e9d8] flex items-center justify-center text-[#a87a52] hover:bg-[#a87a52] hover:text-white transition-colors magnetic">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
               </a>
            </div>

         </div>

      </div>
   )
}


export default ContactDetails
