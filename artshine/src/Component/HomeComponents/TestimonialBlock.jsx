import React from 'react'
import { Star } from 'lucide-react'

function TestimonialBlock() {
  return (
    <section className="w-full bg-[#fdfaf6] px-6 md:px-16 py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-[#f0e6d8]/50 outline outline-1 outline-[#e8dccb] outline-offset-[12px] p-12 md:p-24 text-center">
          
          <div className="flex justify-center items-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#8b5a33] fill-current" />
            ))}
          </div>

          <h3 className="font-serif italic text-2xl md:text-3xl leading-relaxed text-[#3d2e1f] max-w-[800px] mx-auto mb-10">
            "The way my wedding bouquet was preserved surpassed all my expectations. It's not just a decoration; it's a piece of our history captured forever in crystal clarity."
          </h3>

          <div className="flex flex-col items-center">
             <span className="text-[11px] tracking-[0.2em] font-medium text-[#3d2e1f] uppercase mb-1">Eleanor Bennett</span>
             <span className="text-[#887a6d] font-light text-[10px] tracking-widest uppercase">Wedding Client • 2023</span>
          </div>

        </div>
      </div>
    </section>
  )
}

export default TestimonialBlock
