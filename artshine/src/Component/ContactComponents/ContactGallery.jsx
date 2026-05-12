import React from 'react'

function ContactGallery() {
  return (
    <section className="w-full bg-[#fdfaf6] px-6 md:px-16 pt-12 pb-24 md:pb-32 flex justify-center">
      <div className="max-w-[1400px] w-full mx-auto">
        
        {/* Irregular 3-Column Image Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-4 md:gap-6 min-h-[400px] lg:min-h-[500px]">
           
           {/* Huge Left Sunflower Frame */}
           <div className="w-full h-[400px] md:h-full bg-[#1a1c21] rounded overflow-hidden group">
              <img 
                src="/images/gallery_sunflower.png" 
                alt="Orange sunflower preserving in dark resin coaster block" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-90"
              />
           </div>

           {/* Stacked Center Column */}
           <div className="flex flex-col gap-4 md:gap-6 w-full h-full">
               <div className="w-full flex-1 bg-white rounded overflow-hidden shadow-sm border border-[#f0e6d8] group">
                 <img src="/images/gallery_hex.png" alt="Gold and purple flower custom frame" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
               </div>
               <div className="w-full aspect-square md:aspect-auto md:flex-[1.2] bg-[#f4e9d8] rounded overflow-hidden group">
                 <img src="/images/about_leaves.png" alt="Lightly dried green tropical leaves" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out mix-blend-multiply opacity-80" />
               </div>
           </div>

           {/* Tall Slim Right Column */}
           <div className="w-full h-[400px] md:h-full bg-[#faeed8] rounded overflow-hidden group hidden sm:block border border-[#f0e6d8]">
               <img src="/images/varmala.png" alt="Bright yellow daisy inside a tiny resin piece" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
           </div>

        </div>

      </div>
    </section>
  )
}

export default ContactGallery
