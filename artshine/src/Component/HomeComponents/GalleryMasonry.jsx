import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const galleryItems = [
  { id: 1, src: '/images/gallery_rose.png', title: 'Gold Rose', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 2, src: '/images/service.png', title: 'Wedding Block', gridClass: 'md:col-span-2 md:row-span-1' },
  { id: 3, src: '/images/gallery_hex.png', title: 'Hex Coasters', gridClass: 'md:col-span-1 md:row-span-1' },
  { id: 4, src: '/images/gallery_lily.png', title: 'Lily Sphere', gridClass: 'md:col-span-1 md:row-span-1' },
  { id: 5, src: '/images/hero.png', title: 'Resin Tray', gridClass: 'md:col-span-2 md:row-span-2' },
  { id: 6, src: '/images/gallery_hydrangea.png', title: 'Hydrangea Box', gridClass: 'md:col-span-2 md:row-span-1' },
  { id: 7, src: '/images/gallery_sunflower.png', title: 'Sunflower Sphere', gridClass: 'md:col-span-2 md:row-span-1' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { ease: "easeOut", duration: 0.7 }
  }
}

function GalleryMasonry() {
  return (
    <section className="w-full bg-[#fdfaf6] px-6 sm:px-10 md:px-16 py-16 sm:py-24 md:py-32 border-t border-[#f0e6d8]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12 sm:gap-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div className="flex flex-col items-start">
            <p className="text-[10px] tracking-[0.2em] font-medium text-[#c08f65] uppercase mb-4">
              Our Portfolio
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-tight text-[#3d2e1f]">
              A Visual Preservation of Time
            </h2>
          </div>
          <Link to="/gallery" className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-[#c08f65] hover:text-[#8b5a33] transition-colors shrink-0 md:pb-3 min-h-[44px]">
            EXPLORE FULL GALLERY 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* CSS Bento Grid */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] sm:auto-rows-[300px] gap-4 sm:gap-6 grid-flow-dense"
        >
          {galleryItems.map((item) => (
            <motion.div 
              key={item.id} 
              variants={itemVariants}
              className={`relative group overflow-hidden bg-[#e8dcce] shadow-sm rounded-sm ${item.gridClass}`}
            >
               <img 
                 src={item.src} 
                 alt={item.title} 
                 className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" 
               />
               
               {/* Premium Gradient Overlay - Always partially visible on touch devices or toggled? 
                  For now we'll keep the hover but ensure it's tap-friendly */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 lg:group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
                   <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-[600ms] ease-out w-full flex justify-between items-end">
                       <div className="flex flex-col">
                         <span className="text-white font-serif tracking-widest text-lg sm:text-xl block">{item.title}</span>
                         <span className="text-[#e8dcce] font-sans text-[9px] tracking-[0.2em] uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 block">
                            View details
                         </span>
                       </div>
                       
                       <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                          <ArrowRight className="w-4 h-4 text-white" />
                       </div>
                   </div>
               </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

    </section>
  )
}

export default GalleryMasonry
