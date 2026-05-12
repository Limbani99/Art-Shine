import React, { useRef } from 'react'
import { useAnimations } from '../../hooks/useAnimations'

function StorySection() {
  const sectionRef = useRef()
  const { wordReveal, counterAnimation, imageClipReveal } = useAnimations(sectionRef)

  wordReveal('.word-reveal')
  counterAnimation('.counter')
  imageClipReveal('.clip-inner')

  return (
    <section ref={sectionRef} className="w-full bg-[#f6efe7] px-6 sm:px-10 md:px-16 py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 sm:gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Overlapping Image area */}
        <div className="relative">
          <div className="relative z-10 w-full lg:w-[90%] bg-white p-2 sm:p-3 shadow-md clip-reveal clip-inner">
            <img 
              src="/images/story.png" 
              alt="Artisan crafting resin floral art" 
              className="w-full h-[320px] sm:h-[450px] lg:h-[550px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          {/* Decorative Box Overlapped */}
          <div className="absolute -bottom-6 sm:-bottom-10 right-0 sm:right-6 lg:left-[65%] z-20 bg-[#fdfaf6] p-6 sm:p-10 lg:p-12 shadow-xl border border-[#ece3d4] max-w-[240px] sm:max-w-[280px] hero-float">
             <h3 className="font-serif italic text-xl sm:text-2xl text-[#3d2e1f] mb-3 word-reveal">Our Story</h3>
             <p className="text-[#887a6d] font-light text-xs sm:text-sm leading-relaxed">
               "We preserve what only seconds to grow."
             </p>
          </div>
        </div>

        {/* Right Side: Text & Stats */}
        <div className="flex flex-col pt-10 sm:pt-16 lg:pt-0">
          <p className="text-[10px] tracking-[0.2em] font-medium text-[#b0a395] uppercase mb-4">
            Our Studio
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#3d2e1f] mb-6 word-reveal">
            Preserving Memories Through Artistic Precision
          </h2>
          <p className="font-light text-sm sm:text-[15px] lg:text-[16px] leading-relaxed text-[#665e55] mb-10 sm:mb-12">
            At Art Shine, we specialize in the delicate art of botanic preservation. Founded on the belief that wedding bouquets and memorial flowers deserve more than a fading existence, we use museum-grade resin and advanced drying techniques to transform your flora into heirloom-quality art.
          </p>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 border-t border-[#e8dccb] pt-8 sm:pt-10">
            <div>
               <div className="font-serif text-3xl sm:text-4xl text-[#c08f65] mb-2"><span className="counter">1200</span>+</div>
               <div className="text-[9px] uppercase tracking-[0.15em] font-medium text-[#887a6d]">Happy Customers</div>
            </div>
            <div>
               <div className="font-serif text-3xl sm:text-4xl text-[#c08f65] mb-2"><span className="counter">8</span>+</div>
               <div className="text-[9px] uppercase tracking-[0.15em] font-medium text-[#887a6d]">Years Experience</div>
            </div>
          </div>
        </div>

      </div>

    </section>
  )
}

export default StorySection

