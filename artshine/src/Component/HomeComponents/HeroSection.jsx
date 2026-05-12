import React, { useState, useRef } from 'react'
import { Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAnimations } from '../../hooks/useAnimations'

const slides = [
  {
    image: '/images/hero.png',
    title: 'Flower preservation'
  },
  {
    image: '/images/varmala.png',
    title: 'Varmala preservation'
  },
  {
    image: '/images/gallery_hex.png',
    title: 'Custom keepsakes'
  }
]

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef = useRef()
  const { wordReveal, parallaxEffect, magneticButton } = useAnimations(sectionRef)

  wordReveal('.word-reveal')
  parallaxEffect('[data-speed]')
  magneticButton('.magnetic')

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section ref={sectionRef} className="relative w-full flex flex-col lg:flex-row items-stretch overflow-hidden">
      {/* --- Right Panel --- */}
      <div className="w-full lg:w-1/2 bg-[#e8dcce] px-6 sm:px-8 md:px-12 py-16 sm:py-24 lg:py-24 flex flex-col justify-center relative overflow-hidden hero-float">

        {/* Carousel Container */}
        <div className="flex items-center justify-between w-full max-w-[320px] sm:max-w-[450px] xl:max-w-[500px] mx-auto gap-4 lg:gap-6">

          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="w-12 h-12 shrink-0 rounded-[14px] bg-[#d3c2ae] hover:bg-[#c4b39e] transition-colors flex items-center justify-center shadow-sm border border-[#cebba4]/50 text-[#605040] min-w-[48px] min-h-[48px] magnetic"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          </button>

          {/* Image Display */}
          <div className="flex flex-col items-center flex-1 transition-all duration-500 ease-in-out">
            <div className="w-full aspect-square bg-[#c5a68c] rounded shadow-md mb-6 overflow-hidden relative flex items-center justify-center p-0.5 border border-[#af9177]">
              {/* Display image with nice fade animation */}
              <img
                key={currentSlide}
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover rounded-sm"
                data-speed="0.8"
                style={{ animation: 'fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards' }}
              />
            </div>

            <p className="font-serif italic text-xl sm:text-[1.4rem] text-[#8c6b54] text-center tracking-wide">
              {slides[currentSlide].title}
            </p>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="w-12 h-12 shrink-0 rounded-[14px] bg-[#d3c2ae] hover:bg-[#c4b39e] transition-colors flex items-center justify-center shadow-sm border border-[#cebba4]/50 text-[#605040] min-w-[48px] min-h-[48px] magnetic"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          </button>

        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-8 sm:bottom-10 left-0 right-0 flex justify-center items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="group relative p-2"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${currentSlide === idx 
                  ? 'w-8 bg-[#ac815c]' 
                  : 'w-1.5 bg-[#d0bca6] group-hover:bg-[#c1a990] sm:group-hover:w-3'
                }`}
              />
              <div className="absolute inset-0 w-full h-full min-w-[44px] min-h-[44px]"></div>
            </button>
          ))}
        </div>

      </div>
      {/* --- Left Panel --- */}
      <div className="w-full lg:w-1/2 bg-[#fcf6f0] px-6 sm:px-10 lg:px-12 xl:px-[10%] py-16 sm:py-24 lg:py-24 flex flex-col justify-center z-0">

        <p className="font-serif italic text-lg sm:text-xl lg:text-2xl text-[#d49b78] mb-4">
          Welcome to Art Shine Studio
        </p>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4.8rem] leading-[1.15] lg:leading-[1.1] tracking-tight text-[#1a1c21] mb-6 word-reveal">
          Resin Art & Flower Preservation Artist
        </h1>

        <p className="text-[#64748b] font-medium text-sm sm:text-base lg:text-[18px] leading-relaxed max-w-[480px] mb-10">
          Preserving your precious memories — wedding garlands, flowers & mementos — through handcrafted resin art that lasts forever.
        </p>

        <div className="flex flex-col items-start gap-3 sm:gap-4 w-full">
          <a href="tel:+918844896500" className="flex items-center gap-4 bg-[#c89a74] hover:bg-[#b58762] transition-colors text-white px-6 py-4 rounded shadow-sm w-full lg:w-max min-h-[56px] magnetic">
            <Phone className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            <span className="font-sans font-medium text-sm sm:text-[15px] tracking-wide">+91 88448 96500</span>
          </a>

          <a href="mailto:artshine.official@gmail.com" className="flex items-center gap-4 bg-[#c89a74] hover:bg-[#b58762] transition-colors text-white px-6 py-4 rounded shadow-sm w-full lg:w-max min-h-[56px] magnetic">
            <Mail className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            <span className="font-sans font-medium text-sm sm:text-[15px] tracking-wide break-all">artshine.official@gmail.com</span>
          </a>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />

    </section>
  )
}

export default HeroSection
