import React from 'react'

function ArtistNotes() {
  return (
    <section className="w-full bg-[#fdfaf6] px-6 md:px-16 py-20 md:py-32">
      <div className="max-w-[1000px] mx-auto relative pt-8 md:pt-12">
        
        {/* Floating Notes Title */}
        <h3 className="absolute top-0 left-4 md:left-12 lg:-left-12 font-serif italic text-3xl md:text-4xl text-[#c08f65] tracking-tight transform -rotate-2 z-20">
          Notes from the artist...
        </h3>

        {/* Shadow Drop Box */}
        <div className="bg-[#e8dcce] p-12 md:p-24 shadow-sm w-full md:w-[90%] mx-auto z-10 relative">
          <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl leading-relaxed text-[#3d2e1f] mb-8">
            "Each petal we preserve tells a story of a moment that meant everything. Our craft is simply ensuring that story never fades."
          </p>
          <div className="w-16 h-[1px] bg-[#c08f65]/50"></div>
        </div>

      </div>
    </section>
  )
}

export default ArtistNotes
