import React from 'react'

function ShopHeader() {
  return (
    <section className="w-full bg-[#fdfaf6] px-6 md:px-16 pt-24 md:pt-36 pb-12 flex flex-col justify-center">
      <div className="max-w-[1300px] w-full mx-auto flex flex-col items-start">
        
        <p className="text-[10px] md:text-[11px] tracking-[0.2em] font-medium text-[#c08f65] uppercase mb-6 drop-shadow-sm">
          Spring Collection 2024
        </p>
        
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#1a1c21] mb-6">
          Nature's fleeting <span className="font-serif italic font-light">whispers</span>,<br/>
          captured in crystal.
        </h1>
        
        <p className="font-serif italic text-2xl md:text-3xl text-[#b0a395] tracking-wide ml-2 md:ml-12">
          Every petal tells a story of preservation.
        </p>

      </div>
    </section>
  )
}

export default ShopHeader
