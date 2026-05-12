import React, { useRef } from 'react'
import { useAnimations } from '../../hooks/useAnimations'

function RelatedProducts() {
  const sectionRef = useRef()
  const { wordReveal, imageClipReveal } = useAnimations(sectionRef)

  wordReveal('.word-reveal')
  imageClipReveal('.clip-reveal')
  
  // DUMMY ARRAY for mapping related "Complete the Sanctuary" components securely
  const crossSells = [
    { id: 1, src: '/images/gallery_hex.png', alt: 'Resin hexagon custom art block', alignment: 'object-center' },
    { id: 2, src: '/images/about_artisan.png', alt: 'Artisan face view', alignment: 'object-top' },
    { id: 3, src: '/images/gallery_sunflower.png', alt: 'Sunflower safe network block', alignment: 'object-center' }
  ]

  return (
    <section ref={sectionRef} className="w-full bg-[#fdfaf6] px-6 md:px-16 pt-12 pb-24 md:pb-32 flex flex-col items-center justify-center">
      
      {/* Title */}
      <h2 className="font-serif italic text-3xl md:text-4xl text-[#3d2e1f] mb-12 sm:mb-16 tracking-tight text-center word-reveal">
        Complete the Sanctuary
      </h2>

      {/* 3-Column Square CSS Grid */}
      <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
         {crossSells.map((product) => (
           <div 
             key={product.id} 
             className="w-full aspect-[4/3] sm:aspect-square bg-[#1a1c21] rounded overflow-hidden shadow-sm border border-[#e8dccb] group cursor-pointer relative clip-reveal"
           >
             <img 
               src={product.src} 
               alt={product.alt} 
               className={`w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] mix-blend-lighten ${product.alignment}`} 
             />
             
             {/* Invisible Hover Overlay giving users a clue it's clickable */}
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-sans text-xs uppercase tracking-[0.2em] font-medium border-b border-white pb-1">
                   View Piece
                </span>
             </div>
           </div>
         ))}
      </div>

    </section>
  )
}


export default RelatedProducts
