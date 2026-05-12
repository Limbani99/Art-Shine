import React from 'react'

function GalleryGrid() {
  
  // DUMMY DATABASE ARRAY: Replace this with your actual Database data fetching logic!
  // Whenever you add new items to your backend, they will automatically wrap and stack in the layout cleanly.
  const galleryImagesFromDB = [
    { id: 1, src: '/images/gallery_hydrangea.png', alt: 'Clear resin block with ferns and flowers' },
    { id: 2, src: '/images/hero.png', alt: 'Blue and gold stylized resin art frame' },
    { id: 3, src: '/images/gallery_hex.png', alt: 'Teardrop shape custom jewelry pieces' },
    { id: 4, src: '/images/service.png', alt: 'Round floral resin preservation frame' },
    { id: 5, src: '/images/about_botanical.png', alt: 'Preserved white wedding bouquet' },
    { id: 6, src: '/images/varmala.png', alt: 'Pressed vibrant flowers preserved in wooden frame' },
  ]

  return (
    <section className="w-full bg-[#fdfaf6] px-6 md:px-16 py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Responsive Database-Ready Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {galleryImagesFromDB.map((item) => (
            <div 
              key={item.id} 
              className="w-full aspect-square bg-[#fcf6ee] rounded shadow-sm overflow-hidden group border border-[#f0e6d8]"
            >
               <img 
                 src={item.src} 
                 alt={item.alt} 
                 className="w-full h-full object-cover mix-blend-multiply hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" 
               />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default GalleryGrid
