import React from 'react'

function GalleryHeader() {
  return (
    <section className="w-full bg-[#fdfaf6] px-6 md:px-16 pt-24 md:pt-32 pb-16 flex flex-col items-center justify-center text-center">
      <div className="max-w-[800px] mx-auto flex flex-col items-center">
        
        <p className="text-[10px] tracking-[0.2em] font-medium text-[#c08f65] uppercase mb-4">
          The Curated Preservation
        </p>
        
        <h1 className="font-serif italic text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-tight text-[#1a1c21] mb-8">
          A Living Archive of Nature
        </h1>
        
        <p className="text-[#887a6d] font-light text-[15px] md:text-[16px] leading-relaxed max-w-[550px]">
          A curated collection of bespoke resin art, floral preservation, and heirloom memories. Each piece is a meticulously crafted snapshot of botanical beauty.
        </p>

      </div>
    </section>
  )
}

export default GalleryHeader
