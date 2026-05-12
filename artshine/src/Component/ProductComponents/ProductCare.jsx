import React, { useRef } from 'react'
import { Sun, Droplet, Flame, Ban } from 'lucide-react'
import { useAnimations } from '../../hooks/useAnimations'

function ProductCare() {
   const sectionRef = useRef()
   const { wordReveal, imageClipReveal } = useAnimations(sectionRef)

   wordReveal('.word-reveal')
   imageClipReveal('.clip-reveal')

   return (
      <section ref={sectionRef} className="w-full bg-[#fdfaf6] px-6 md:px-16 py-12 lg:py-24 flex justify-center">
         <div className="max-w-[1240px] w-full mx-auto relative bg-[#e8dccb]/40 rounded-sm p-8 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-24 overflow-hidden border border-[#e8dccb]">

            {/* LEFT ARTISAN COLUMN: Overlapping Absolute Strategy */}
            <div className="w-full lg:w-5/12 relative mt-8 lg:mt-0">
               {/* Absolute hovering cursive */}
               <h3 className="absolute -top-10 -left-4 lg:-top-12 lg:-left-10 font-serif italic text-4xl lg:text-5xl text-[#a87a52] z-20 pointer-events-none drop-shadow-sm select-none -rotate-2 word-reveal">
                  Artisan's Note
               </h3>
               <div className="w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-[#1a1c21] rounded shadow-lg overflow-hidden relative z-10 border border-white/20 clip-reveal">
                  <img
                     src="/images/about_artisan.png"
                     alt="Artisan meticulously crafting preservation"
                     className="w-full h-full object-cover opacity-95 transition-transform duration-700 hover:scale-105 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
               </div>
            </div>

            {/* RIGHT TEXT/ICONS COLUMN */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center relative z-10">

               <h2 className="font-serif text-3xl md:text-4xl text-[#1a1c21] font-bold mb-4 tracking-tight leading-tight max-w-[400px] word-reveal">
                  Cherishing Your Preservation
               </h2>
               <p className="font-sans text-[13px] md:text-[14px] leading-[1.8] text-[#645c53] mb-12 max-w-[500px]">
                  To ensure your botanical pieces remain as vibrant as the day they were created, please follow these gentle care instructions. Like all handcrafted items, they appreciate being handled with a soft touch.
               </p>

               {/* 2x2 Care Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10">

                  <div className="flex flex-col gap-3">
                     <Sun className="w-5 h-5 text-[#a87a52]" />
                     <h4 className="text-[13px] font-bold text-[#1a1c21] uppercase tracking-wide">Avoid Direct Sunlight</h4>
                     <p className="text-[12px] text-[#887a6d] leading-relaxed max-w-[220px]">
                        While UV-resistant, prolonged exposure can slowly fade natural pigments.
                     </p>
                  </div>

                  <div className="flex flex-col gap-3">
                     <Droplet className="w-5 h-5 text-[#a87a52]" />
                     <h4 className="text-[13px] font-bold text-[#1a1c21] uppercase tracking-wide">Soft Cleaning</h4>
                     <p className="text-[12px] text-[#887a6d] leading-relaxed max-w-[220px]">
                        Wipe with a damp microfiber cloth. Avoid abrasive sponges or harsh chemicals.
                     </p>
                  </div>

                  <div className="flex flex-col gap-3">
                     <Flame className="w-5 h-5 text-[#a87a52]" />
                     <h4 className="text-[13px] font-bold text-[#1a1c21] uppercase tracking-wide">Heat Sensitivity</h4>
                     <p className="text-[12px] text-[#887a6d] leading-relaxed max-w-[220px]">
                        Recommended for cold or warm beverages. Not suitable for boiling pots.
                     </p>
                  </div>

                  <div className="flex flex-col gap-3">
                     <Ban className="w-5 h-5 text-[#a87a52]" />
                     <h4 className="text-[13px] font-bold text-[#1a1c21] uppercase tracking-wide">No Dishwasher</h4>
                     <p className="text-[12px] text-[#887a6d] leading-relaxed max-w-[220px]">
                        High heat and pressure will damage the clarity of the resin surface.
                     </p>
                  </div>

               </div>
            </div>

         </div>
      </section>
   )
}


export default ProductCare
