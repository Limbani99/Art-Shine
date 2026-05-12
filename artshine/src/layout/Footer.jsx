import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAnimations } from '../hooks/useAnimations'

function Footer() {
  const footerRef = useRef()
  const { magneticButton } = useAnimations(footerRef)

  magneticButton('.magnetic')

  return (
    <footer ref={footerRef} className="w-full bg-[#fdfaf6] border-t border-[#f0e6d8] px-6 md:px-16 py-10 mt-20">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
        
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1 cursor-default magnetic">
            <span className="text-[#d97757] text-sm leading-none">✦</span>
            <span className="font-serif italic text-[17px] text-[#3d2e1f] leading-none mb-0.5">Art Shine Preservation Studio</span>
          </div>
          <p className="text-[#b0a395] text-[11px] font-light">Crafting memories into masterpieces.</p>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-[10px] tracking-[0.15em] text-[#887a6d] uppercase font-medium w-full md:w-auto mt-2 md:mt-0">
          <Link to="#" className="hover:text-[#3d2e1f] transition-colors magnetic">Shipping</Link>
          <Link to="/services" className="hover:text-[#3d2e1f] transition-colors flex items-center gap-2 group magnetic">
            Workshop <span className="text-[#e2bca1] group-hover:text-[#d97757] transition-colors text-[8px]">■</span>
          </Link>
          <Link to="#" className="hover:text-[#3d2e1f] transition-colors magnetic">Privacy Policy</Link>
        </div>

        {/* Right Section */}
        <div className="text-[#b0a395] text-[9px] md:text-[10px] tracking-widest uppercase font-light text-center md:text-right w-full md:w-auto mt-2 md:mt-0">
          © {new Date().getFullYear()} Art Shine Preservation Studio
        </div>

      </div>
    </footer>
  )
}

export default Footer