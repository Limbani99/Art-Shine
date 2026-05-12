import React from 'react'
import { ArrowUpRight } from 'lucide-react'

function JournalFeed() {

  // DUMMY DATABASE ARRAY: Replace this with your Instagram Feed API or Database.
  // The layout will effortlessly adapt to 4, 8, or 12 items thanks to CSS Grid.
  const journalImagesFromDB = [
    { id: 1, src: '/images/gallery_rose.png', alt: 'Gold Rose Setup Display' },
    { id: 2, src: '/images/gallery_lily.png', alt: 'Behind the Scenes Artisan Work' },
    { id: 3, src: '/images/gallery_sunflower.png', alt: 'Beautiful Sphere Resin Display' },
    { id: 4, src: '/images/about_swirl.png', alt: 'Macro shot of golden amber liquid resin' },
  ]

  return (
    <section className="w-full bg-[#fcf8f2] px-6 md:px-16 py-24 border-t border-[#f0e6d8] flex flex-col items-center">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col items-center">
        
        {/* Instagram Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <p className="text-[10px] tracking-[0.2em] font-medium text-[#c08f65] uppercase mb-4">
            Follow Our Craft
          </p>
          <h2 className="font-serif italic text-4xl leading-tight text-[#1a1c21] mb-4">
            From Our Journal
          </h2>
          <a href="#" className="flex items-center gap-1 text-[13px] tracking-widest font-medium text-[#887a6d] hover:text-[#3d2e1f] transition-colors">
            @ArtShine_Gallery <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
          </a>
        </div>

        {/* Highly Responsive Instagram Feed */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-12">
          {journalImagesFromDB.map((post) => (
            <div 
              key={post.id} 
              className="w-full aspect-square bg-[#1a1c21] overflow-hidden group cursor-pointer relative"
            >
               <img 
                 src={post.src} 
                 alt={post.alt} 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
               />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-sans text-xs uppercase tracking-[0.2em] font-medium">
                     View Post
                  </span>
               </div>
            </div>
          ))}
        </div>

        <a 
          href="#" 
          className="bg-[#a87a52] hover:bg-[#8e613b] transition-colors text-white px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-md"
        >
          Follow on Instagram
        </a>

      </div>
    </section>
  )
}

export default JournalFeed
