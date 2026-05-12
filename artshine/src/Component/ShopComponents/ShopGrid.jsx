import React, { useState, useEffect } from 'react'
import { Package, Heart, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataProvider'
import { motion, AnimatePresence } from 'framer-motion'
import ExplodingCard from '../Animations/ExplodingCard'

const SkeletonCard = () => (
  <div className="flex flex-col w-full bg-white p-3 rounded-sm animate-pulse border border-[#f0e6d8]">
    <div className="w-full aspect-[4/5] bg-[#f4e9d8] rounded-sm mb-4" />
    <div className="flex flex-col gap-3">
      <div className="h-2 bg-[#fdfaf6] w-1/3 rounded" />
      <div className="h-6 bg-[#fdfaf6] w-full rounded" />
      <div className="h-3 bg-[#fdfaf6] w-1/4 rounded mb-2" />
      <div className="h-8 bg-[#fdfaf6] w-full rounded mt-1" />
    </div>
  </div>
)

function ShopGrid({ products }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const { allProduct } = useData()
  const displayProducts = products || allProduct;
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (displayProducts?.length > 0) {
      const timer = setTimeout(() => setLoading(false), 800)
      return () => clearTimeout(timer)
    }
  }, [displayProducts])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section className="w-full bg-[#fdfaf6] px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
      <div className="max-w-[1500px] mx-auto">

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <SkeletonCard key={i} />)}
            </motion.div>
          ) : (
            <motion.div
              key="product-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10"
            >
              {displayProducts.map((item) => (
                <ExplodingCard 
                  key={item._id}
                  infoContent={
                    <div className="flex flex-col items-center">
                      <Sparkles size={32} className="text-[#a87a52] mb-4" />
                      <h3 className="font-serif text-2xl mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-6">{item.description}</p>
                      <Link to={`/product/${item._id}`} className="bg-[#a87a52] text-white px-8 py-3 rounded-full hover:bg-[#8b5a33] transition-colors">
                        View Product
                      </Link>
                    </div>
                  }
                >
                  <motion.div
                    variants={cardVariants}
                    className="flex flex-col group cursor-pointer w-full bg-white p-3 rounded-sm hover:shadow-[0_20px_50px_rgba(168,122,82,0.1)] border border-[#f0e6d9] borderTransparent hover:border-[#f0e6d8] transition-all duration-700 relative overflow-hidden"
                  >
                    {/* Glassmorphism Badge Overlay - Smaller */}
                    <div className="absolute top-6 left-6 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="bg-white/30 backdrop-blur-md border border-white/40 px-2 py-1 rounded-full flex items-center gap-1.5">
                        <Sparkles size={10} className="text-[#a87a52]" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-[#a87a52]">Premium Piece</span>
                      </div>
                    </div>

                    {/* Wishlist Icon - Smaller */}
                    <button className="absolute top-6 right-6 z-20 w-9 h-9 rounded-full bg-white/40 backdrop-blur-sm border border-white/30 flex items-center justify-center text-[#3B2C24]/40 hover:text-[#e11d48] hover:bg-white transition-all duration-300 transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 shadow-sm">
                      <Heart size={16} fill="currentColor" className="fill-transparent hover:fill-[#e11d48]" />
                    </button>

                    {/* Image Container */}
                    <div className="w-full aspect-[4/5] bg-[#fdfaf6] overflow-hidden mb-4 rounded-sm relative uppercase">
                      <img
                        src={`${baseUrl}/uploads/${item.image[0]}`}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.8s] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                      />
                      {/* Glassmorphism Overlay on Hover - More Compact */}
                      <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0">
                        <div className="w-full bg-white/25 backdrop-blur-md border border-white/30 py-2.5 px-4 rounded-sm text-center">
                          <p className="text-[8px] font-bold text-white uppercase tracking-[0.2em] drop-shadow-md">Handcrafted Precision</p>
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col flex-1 px-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-4 h-[1px] bg-[#a87a52]/40 group-hover:w-8 transition-all duration-700"></span>
                        <p className="text-[#a87a52] text-[9px] uppercase font-black tracking-[0.2em]">
                          {item.categoryId.name}
                        </p>
                      </div>

                      <h3 className="font-serif text-lg text-[#2c1f14] font-bold mb-2 tracking-tight leading-tight group-hover:text-[#a87a52] transition-colors duration-500 min-h-[2.5rem] flex items-center">
                        {item.name}
                      </h3>

                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-serif italic text-lg text-[#3d2e1f]">₹{item.price}</span>
                        <span className="text-[9px] text-[#b0a395] uppercase tracking-widest font-bold opacity-60">Handmade</span>
                      </div>

                      <p className="text-[#6c5e53] text-[13px] leading-relaxed mb-6 font-light opacity-80 h-[3rem] overflow-hidden">
                        {item.description.substring(0, 85)}...
                      </p>

                      {/* Compact View Button */}
                      <div className="mt-auto pt-3 border-t border-[#f4e9d8]/40">
                        <div className="flex items-center justify-between group/btn">
                          <Link to={`/product/${item._id}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B2C24]/60 group-hover/btn:text-[#a87a52] transition-all duration-500 py-2">
                            View details
                          </Link>
                          <div className="w-10 h-10 rounded-full border border-[#EDE3D9] flex items-center justify-center transition-all duration-700 group-hover/btn:border-transparent group-hover/btn:bg-[#a87a52] group-hover/btn:text-white group-hover/btn:shadow-[0_8px_16px_rgba(168,122,82,0.25)]">
                            <ArrowRight size={16} className="transform group-hover/btn:translate-x-0.5 transition-transform duration-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                </ExplodingCard>
              ))}

            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </section>
  )
}

export default ShopGrid
