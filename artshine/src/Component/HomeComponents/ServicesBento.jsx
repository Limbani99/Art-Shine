import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Frame, Gem, Palette } from 'lucide-react'
import { useAnimations } from '../../hooks/useAnimations'

function ServicesBento() {
  const sectionRef = useRef()
  const { wordReveal, imageClipReveal, magneticButton } = useAnimations(sectionRef)

  wordReveal('.word-reveal')
  imageClipReveal('.clip-inner')
  magneticButton('.magnetic')

  return (
    <section ref={sectionRef} className="w-full bg-[#fdfaf6] px-6 sm:px-10 md:px-16 py-16 sm:py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[10px] tracking-[0.2em] font-medium text-[#b0a395] uppercase mb-4">
             Our Offerings
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[#3d2e1f] word-reveal">
             Artisanal Services
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="flex flex-col gap-6 sm:gap-8">
          
          {/* Top Row: Two main services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Flower Preservation Card */}
            <div className="bg-white p-6 sm:p-10 shadow-sm border border-[#f0e6d8] flex flex-col justify-between group cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-serif text-2xl text-[#3d2e1f] mb-3 word-reveal">Flower Preservation</h3>
                  <p className="text-[#887a6d] font-light text-xs sm:text-sm leading-relaxed mb-6">
                    Turn your wedding bouquet or special arrangement into large blocks, pyramids, or spheres.
                  </p>
                  <Link to="/services" className="text-[10px] tracking-[0.15em] font-bold text-[#c08f65] uppercase flex items-center gap-2 group-hover:text-[#8b5a33] transition-colors min-h-[44px] magnetic">
                    EXPLORE 
                    <span className="w-6 h-[1px] bg-current inline-block transform group-hover:scale-x-150 origin-left transition-transform"></span>
                  </Link>
                </div>
                <div className="w-full sm:w-[180px] lg:w-[220px] aspect-square bg-[#fdfaf6] flex items-center justify-center p-4 clip-reveal clip-inner">
                  <img src="/images/service.png" alt="Flower Preservation" className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* Varmala Preservation Card */}
            <div className="bg-white p-6 sm:p-10 shadow-sm border border-[#f0e6d8] flex flex-col justify-between group cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-serif text-2xl text-[#3d2e1f] mb-3 word-reveal">Varmala Preservation</h3>
                  <p className="text-[#887a6d] font-light text-xs sm:text-sm leading-relaxed mb-6">
                     Specialized techniques for traditional wedding garlands and ceremonial flowers.
                  </p>
                  <Link to="/services" className="text-[10px] tracking-[0.15em] font-bold text-[#c08f65] uppercase flex items-center gap-2 group-hover:text-[#8b5a33] transition-colors min-h-[44px] magnetic">
                    EXPLORE 
                    <span className="w-6 h-[1px] bg-current inline-block transform group-hover:scale-x-150 origin-left transition-transform"></span>
                  </Link>
                </div>
                <div className="w-full sm:w-[180px] lg:w-[220px] aspect-[4/3] sm:aspect-square overflow-hidden bg-[#fdfaf6] flex items-center justify-center relative clip-reveal clip-inner">
                   <img src="/images/varmala.png" alt="Varmala Preservation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Three secondary services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 border border-[#f0e6d8] hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 rounded-full bg-[#fde7bb] text-[#8b5a33] flex items-center justify-center mb-6 overflow-hidden">
                <Frame className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-[#3d2e1f] mb-2">Resin Art Frames</h3>
              <p className="text-[#887a6d] font-light text-xs sm:text-sm leading-relaxed">
                Flat-pressed floral compositions set in custom-crafted wood frames.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 border border-[#f0e6d8] hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 rounded-full bg-[#f6efe7] text-[#8b5a33] flex items-center justify-center mb-6 overflow-hidden">
                 <Gem className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-[#3d2e1f] mb-2">Jewelry Casting</h3>
              <p className="text-[#887a6d] font-light text-xs sm:text-sm leading-relaxed">
                Tiny keepsake free-form rings, pendants, and bezels showcasing micro elements.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 border border-[#f0e6d8] hover:shadow-md transition-shadow group sm:last:col-span-2 lg:last:col-span-1">
              <div className="w-10 h-10 rounded-full bg-[#faeed8] text-[#8b5a33] flex items-center justify-center mb-6 overflow-hidden">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-[#3d2e1f] mb-2">Resin Paintings</h3>
              <p className="text-[#887a6d] font-light text-xs sm:text-sm leading-relaxed">
                Abstract fluid art and functional canvas pieces for luxury home decor.
              </p>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-4 sm:mt-6 bg-[#8b5a33] w-full p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 rounded-sm overflow-hidden relative">
            {/* Background Texture/Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 text-center lg:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2 word-reveal">Custom Gifts & Commissions</h3>
              <p className="text-[#fcebb6]/80 font-light text-xs sm:text-sm max-w-[500px]">
                Have a specific vision? We work closely with clients to create one-of-a-kind bespoke pieces for any occasion.
              </p>
            </div>
            
            <Link to="/contact" className="relative z-10 bg-white text-[#8b5a33] hover:bg-[#fdfaf6] transition-colors px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap min-h-[44px] flex items-center magnetic">
              Start Commission
            </Link>
          </div>

        </div>
      </div>

    </section>
  )
}

export default ServicesBento

