import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function NotFound() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#fdfaf6] to-[#f4e9d8]/50 flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden relative">
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Tilted Visual Arts Canvas */}
        <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] flex items-center justify-center mt-12 lg:mt-0">
          
          {/* Curved Soft Behind-Blob */}
          <div className="absolute inset-4 md:inset-8 bg-[#f8eedf]/80 rounded-[4rem] sm:rounded-[6rem] -z-10 shadow-sm border border-[#e8dccb]/40"></div>

          {/* Floating Cursive Note */}
          <h3 className="absolute -top-6 left-0 sm:-top-8 sm:left-4 font-serif italic text-3xl sm:text-4xl text-[#a87a52] z-30 transform -rotate-[12deg] drop-shadow-sm select-none">
            A fading memory...
          </h3>

          {/* Main Tilted Image Card */}
          <div className="w-[85%] sm:w-[75%] lg:w-[85%] aspect-[5/6] bg-[#1a1c21] rounded shadow-2xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-[1s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-20 group border border-[#ece3d4]/10">
             <img 
               src="/images/about_botanical.png" 
               alt="A lost blossom artifact" 
               className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1s]" 
             />
          </div>

        </div>

        {/* Right Column: Typography & Narrative */}
        <div className="flex flex-col relative z-20 pt-8 lg:pt-0">
          
          {/* Subtle Lead-in Text */}
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-[#a87a52] mb-6 relative z-10">
             Discovery Interrupted
          </p>

          {/* Massive 404 Watermark */}
          <div className="absolute -top-12 md:-top-20 left-0 text-[10rem] md:text-[14rem] lg:text-[16rem] leading-none font-serif text-[#e8dccb]/40 font-bold select-none pointer-events-none -z-10 tracking-tighter">
             404
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1a1c21] font-bold mb-6 tracking-tight drop-shadow-sm">
             The Lost Petal
          </h1>

          <p className="text-[#645c53] font-light text-[15px] sm:text-[16px] md:text-[17px] leading-[1.8] max-w-[480px] mb-12">
             Like a delicate blossom carried away by a sudden breeze, this page has drifted beyond our preservation. Some memories are meant to fade, while others are captured forever in resin.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto mb-16">
             <Link 
               to="/" 
               className="w-full sm:w-max bg-[#a87a52] hover:bg-[#8e613b] transition-colors text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-md flex items-center justify-center gap-3"
             >
               Return to Gallery <ArrowRight className="w-4 h-4" />
             </Link>
             <Link 
               to="/services" 
               className="w-full sm:w-max bg-transparent border border-[#a87a52]/40 hover:border-[#a87a52] hover:bg-[#f4e9d8] transition-colors text-[#a87a52] px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm text-center"
             >
               Explore Our Craft
             </Link>
          </div>

          {/* Footer Mini-Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-12 mt-auto border-t border-[#e8dccb] pt-8">
             <Link to="/gallery" className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#b0a395] hover:text-[#a87a52] transition-colors">Shop All</Link>
             <Link to="/contact" className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#b0a395] hover:text-[#a87a52] transition-colors">Contact Us</Link>
             <Link to="/about" className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#b0a395] hover:text-[#a87a52] transition-colors">Archives</Link>
          </div>

        </div>

      </div>
    </div>
  )
}

export default NotFound