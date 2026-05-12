import React, { useRef } from 'react'
import { useAnimations } from '../../hooks/useAnimations'

function ServicesGrid() {
  const sectionRef = useRef()
  const { wordReveal, imageClipReveal } = useAnimations(sectionRef)

  wordReveal('.word-reveal')
  imageClipReveal('.clip-reveal')

  // DUMMY DATABASE ARRAY: Replace this directly with your Database/API fetch later!
  const servicesDB = [
    { 
      id: 1, 
      src: '/images/varmala.png', 
      title: 'Warmala Preservation',
      desc: 'Honor your traditional wedding garlands with a bespoke resin block. We dry each petal carefully to maintain its shape and color before encasing it in crystal-clear museum-grade resin.' 
    },
    { 
      id: 2, 
      src: '/images/gallery_rose.png', 
      title: 'Flower Preservation',
      desc: 'Whether it is a bridal bouquet, an anniversary gift, or memorial flowers, we use professional silica-drying techniques to preserve the original 3D form of your blooms.' 
    },
    { 
      id: 3, 
      src: '/images/gallery_hydrangea.png', 
      title: 'Resin Art Frames',
      desc: 'Flat-pressed floral compositions arranged into elegant wall art. These pieces act as a botanical window, capturing the delicate translucency of petals in a thin resin layer.' 
    },
    { 
      id: 4, 
      src: '/images/gallery_lily.png', 
      title: 'Ring/Jewellery Casting',
      desc: 'Wear your memories. We cast tiny petals, gold leaf, and meaningful keepsakes into pendants, rings, and ring holders that sparkle with artisanal charm.' 
    },
    { 
      id: 5, 
      src: '/images/about_swirl.png', 
      title: 'Resin Paintings',
      desc: 'Experimental fluid art that captures the essence of nature through pigment and flow. These functional or decorative canvases bring a luxury tactile experience to any space.' 
    },
    { 
      id: 6, 
      src: '/images/about_artisan.png', 
      title: 'Custom Gifts & Commissions',
      desc: 'Have a specific vision? From resin clocks to personalized trays, we collaborate with you to create one-of-a-kind functional art pieces that tell your unique story.' 
    },
  ]

  return (
    <section ref={sectionRef} className="w-full bg-[#fdfaf6] px-6 md:px-16 py-12 md:py-20 lg:pb-32">
      <div className="max-w-[1300px] mx-auto">
        
        {/* CSS Component Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-y-16 md:gap-x-12">
          {servicesDB.map((service) => (
            <div key={service.id} className="flex flex-col group cursor-pointer">
               
               {/* 4:5 Aspect Ratio Image Card for that elegant tall portrait look */}
               <div className="w-full aspect-[4/5] bg-[#e8dcce] overflow-hidden mb-6 rounded-sm shadow-sm relative border border-[#e8dcce]/40 clip-reveal">
                  <img 
                    src={service.src} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" 
                  />
                  {/* Subtle darkening gradient to make text stand out if we ever want to place text inside */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
               </div>
               
               {/* Descriptive Content Below the Image */}
               <h3 className="font-serif text-2xl text-[#3d2e1f] font-bold mb-3 tracking-tight group-hover:text-[#a87a52] transition-colors duration-300 word-reveal">
                 {service.title}
               </h3>
               <p className="text-[#887a6d] font-light text-[13px] md:text-[14px] leading-relaxed line-clamp-4">
                 {service.desc}
               </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}


export default ServicesGrid
