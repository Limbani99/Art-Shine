import React from 'react'
import { MapPin, Clock } from 'lucide-react'

function ContactCTA() {
  return (
    <section className="w-full bg-[#fdfaf6] px-6 sm:px-10 md:px-16 py-16 sm:py-24 md:py-32 border-t border-[#f0e6d8]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
        
        {/* Left Side: Contact Info */}
        <div className="flex flex-col justify-center">
          <p className="text-[10px] tracking-[0.2em] font-medium text-[#b0a395] uppercase mb-4">
             Connect
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[#3d2e1f] mb-6">
            Let's Create Together
          </h2>
          <p className="font-light text-sm sm:text-[15px] lg:text-[16px] leading-relaxed text-[#665e55] mb-8 sm:mb-12 max-w-[500px]">
            Whether you're planning a wedding or want to preserve a special memory, we're here to guide you through the process.
          </p>

          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-[#faeed8] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#8b5a33]" />
               </div>
               <div>
                 <h4 className="text-[#3d2e1f] font-bold text-[10px] tracking-wider uppercase mb-1">Our Studio</h4>
                 <p className="text-[#887a6d] font-light text-sm sm:text-base">123 Artisan Way, Creative District<br/>Preservation City, PC 54321</p>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-[#faeed8] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#8b5a33]" />
               </div>
               <div>
                 <h4 className="text-[#3d2e1f] font-bold text-[10px] tracking-wider uppercase mb-1">Opening Hours</h4>
                 <p className="text-[#887a6d] font-light text-sm sm:text-base">Mon - Fri: 10:00 AM - 6:00 PM<br/>Studio by appointment only</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-[#fcf7ef] p-6 sm:p-10 lg:p-12 shadow-sm border border-[#f0e6d8] mt-8 lg:mt-0">
          <form className="flex flex-col gap-5 sm:gap-6" onSubmit={(e) => e.preventDefault()}>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
               <div className="flex flex-col gap-2">
                 <label htmlFor="name" className="text-[10px] tracking-[0.1em] text-[#887a6d] uppercase font-bold">Full Name</label>
                 <input type="text" id="name" className="w-full bg-white border-b border-[#e8dccb] px-4 py-3 text-sm focus:outline-none focus:border-[#8b5a33] text-[#3d2e1f] transition-colors min-h-[44px]" placeholder="Your name" />
               </div>
               <div className="flex flex-col gap-2">
                 <label htmlFor="phone" className="text-[10px] tracking-[0.1em] text-[#887a6d] uppercase font-bold">Phone Number</label>
                 <input type="tel" id="phone" className="w-full bg-white border-b border-[#e8dccb] px-4 py-3 text-sm focus:outline-none focus:border-[#8b5a33] text-[#3d2e1f] transition-colors min-h-[44px]" placeholder="Your phone" />
               </div>
             </div>

             <div className="flex flex-col gap-2">
               <label htmlFor="interest" className="text-[10px] tracking-[0.1em] text-[#887a6d] uppercase font-bold">Service Interest</label>
               <select id="interest" className="w-full bg-white border-b border-[#e8dccb] px-4 py-3 text-sm focus:outline-none focus:border-[#8b5a33] text-[#887a6d] transition-colors appearance-none cursor-pointer min-h-[44px]">
                 <option value="wedding">Wedding Bouquet Preservation</option>
                 <option value="varmala">Varmala Preservation</option>
                 <option value="frames">Resin Art Frames</option>
                 <option value="jewelry">Jewelry Casting</option>
               </select>
             </div>

             <div className="flex flex-col gap-2">
               <label htmlFor="message" className="text-[10px] tracking-[0.1em] text-[#887a6d] uppercase font-bold">Your Message</label>
               <textarea id="message" rows="4" className="w-full bg-white border-b border-[#e8dccb] px-4 py-3 text-sm focus:outline-none focus:border-[#8b5a33] text-[#3d2e1f] transition-colors resize-none" placeholder="Tell us about your vision..."></textarea>
             </div>

             <button type="submit" className="mt-4 bg-[#8b5a33] hover:bg-[#7a4e2c] text-white w-full py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-[#8b5a33]/30 min-h-[44px]">
               Send Message
             </button>

          </form>
        </div>

      </div>

    </section>
  )
}

export default ContactCTA
