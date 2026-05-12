import React, { useState, useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, ChevronDown, ChevronUp, ArrowRight, X } from 'lucide-react'
import axios from 'axios';
import { useData } from '../../context/DataProvider';
import toast from 'react-hot-toast';
import { useAnimations } from '../../hooks/useAnimations'

function ProductHero() {
   const baseUrl = import.meta.env.VITE_BACKEND_URL;
   const sectionRef = useRef()
   const { wordReveal, imageClipReveal, magneticButton } = useAnimations(sectionRef)

   wordReveal('.word-reveal')
   imageClipReveal('.clip-reveal')
   magneticButton('.magnetic')

   const { id } = useParams();
   const { user } = useData();
   const [singleProduct, setSingleProduct] = useState([])
   const [showConfirm, setShowConfirm] = useState(false)

   const singleProductFetch = async () => {
      try {
         const res = await axios.get(`${baseUrl}/api/product/get/${id}`)
         setSingleProduct(res.data.product)
         console.log(res.data.product)
      } catch (err) {
         console.log(err)
      }
   }
   useEffect(() => {
      singleProductFetch();
   }, [id])

   const handleOrderClick = () => {
      if (!user) {
         toast.error("Please login to order")
         return
      }
      setShowConfirm(true)
   }

   const orderNow = async () => {
      try {
         const userId = user._id;
         const products = [
            {
               productId: singleProduct._id,
               quantity: 1
            }
         ];
         const totalAmount = singleProduct.price;
         const res = await axios.post(`${baseUrl}/api/order/create`, {
            userId,
            products,
            totalAmount
         })
         console.log(res.data)
         toast.success("Order placed successfully")
         setShowConfirm(false)
      }
      catch (err) {
         console.log(err)
      }
   }
   return (
      <section ref={sectionRef} className="w-full bg-[#fdfaf6] px-6 sm:px-10 md:px-16 pt-12 sm:pt-16 md:pt-20 pb-16">
         <div className="max-w-[1300px] mx-auto w-full">

            {/* Breadcrumbs */}
            <div className="w-full flex items-center text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#b0a395] mb-8 md:mb-12 overflow-x-auto whitespace-nowrap scrollbar-hide">
               <Link to="/shop" className="hover:text-[#a87a52] transition-colors">Shop</Link>
               <span className="mx-3">&gt;</span>
               <span className="text-[#3d2e1f]">{singleProduct?.name || "Loading..."}</span>
            </div>

            {/* Massive 2-Column Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24 items-start">

               {/* LEFT COLUMN: Deep Image Gallery */}
               <div className="flex flex-col gap-4 w-full">

                  {/* Main Giant Square Feature */}
                  <div className="w-full aspect-square bg-[#f4e9d8] rounded overflow-hidden shadow-sm clip-reveal">
                     {singleProduct?.image?.[0] ? (
                        <img
                           src={`${baseUrl}/uploads/${singleProduct.image[0]}`}
                           alt={singleProduct?.name || "Product image"}
                           className="w-full h-full object-cover mix-blend-multiply hover:scale-105 transition-transform duration-[1.5s] ease-out"
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#f4e9d8] animate-pulse">
                        </div>
                     )}
                  </div>

                  {/* Thumbnails Row */}
                  <div className="grid grid-cols-4 gap-3 sm:gap-4">
                     {
                        singleProduct?.image?.map((img, index) => (
                           <div key={index} className="w-full aspect-square bg-[#1a1c21] rounded overflow-hidden cursor-pointer border border-[#e8dccb] opacity-60 hover:opacity-100 transition-opacity">
                              <img src={`${baseUrl}/uploads/${img}`} alt="Alt visual" className="w-full h-full object-cover mix-blend-lighten" />
                           </div>
                        ))
                     }
                  </div>
               </div>

               {/* RIGHT COLUMN: E-Commerce Data Configuration */}
               <div className="flex flex-col w-full py-2 sm:py-4 relative">

                  <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#a87a52] mb-3">
                     {singleProduct?.categoryId?.name || "Category"}
                  </p>

                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] sm:leading-[1.05] text-[#1a1c21] font-bold mb-4 tracking-tight word-reveal">
                     {singleProduct?.name}
                  </h1>

                  <div className="flex items-center gap-4 mb-6 sm:mb-8">
                     <span className="font-serif italic text-2xl sm:text-3xl text-[#3d2e1f]">₹{singleProduct?.price || "0.00"}</span>
                     <span className="text-[10px] uppercase font-bold text-[#b0a395] tracking-[0.1em] mt-1.5">Collection Piece</span>
                  </div>

                  <p className="text-[#645c53] font-sans text-sm sm:text-base leading-relaxed sm:leading-[1.8] max-w-[480px] mb-8 lg:mb-10">
                     {singleProduct?.description}
                  </p>

                  {/* Quality Badge Box */}
                  <div className="w-full bg-[#faeed8]/60 p-4 sm:p-5 rounded border border-[#e8dccb]/50 lg:flex items-center gap-4 mb-10 max-w-[480px]">
                     <CheckCircle2 className="text-[#a87a52] w-6 h-6 shrink-0 mb-3 lg:mb-0" />
                     <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-[#3d2e1f] uppercase tracking-wide">Museum-Grade Preservation</span>
                        <span className="text-[#887a6d] text-[11px] lg:text-xs">UV-Resistant crystal-clear resin won't yellow over time.</span>
                     </div>
                  </div>

                  {/* Conversion Tools */}
                  <div className="flex flex-col gap-4 max-w-[480px] w-full mb-12">
                     <button className="w-full bg-[#a87a52] hover:bg-[#8e613b] transition-colors text-white py-4 sm:py-5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-md flex justify-center items-center gap-2 min-h-[56px] magnetic" onClick={handleOrderClick}>
                        Request Custom Order <ArrowRight className="w-4 h-4 ml-1" />
                     </button>
                     <button className="w-full bg-transparent hover:bg-[#faeed8]/50 border border-[#e8dccb] transition-colors text-[#a87a52] py-4 sm:py-5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-sm flex justify-center items-center min-h-[56px] magnetic">
                        Custom Inquiry
                     </button>
                  </div>

               </div>
            </div>

         </div>

         {/* Order Confirmation Modal */}
         {showConfirm && (
            <div className="fixed inset-0 z-[100] flex items-center sm:items-center justify-center bg-black/50 backdrop-blur-sm px-4">
               <div className="bg-[#fdfaf6] p-6 sm:p-10 rounded shadow-2xl max-w-md w-full relative animate-in fade-in zoom-in-95 duration-200">
                  <button onClick={() => setShowConfirm(false)} className="absolute top-4 right-4 text-[#887a6d] hover:text-[#3d2e1f] transition-colors p-2">
                     <X className="w-6 h-6" />
                  </button>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1c21] font-bold mb-4">Confirm Order</h2>
                  <p className="text-[#645c53] font-sans text-sm sm:text-[15px] leading-relaxed mb-8">
                     Are you sure you want to request a custom order for <span className="font-bold text-[#3d2e1f]">{singleProduct?.name}</span> at <span className="font-bold text-[#3d2e1f]">₹{singleProduct?.price}</span>?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                     <button onClick={() => setShowConfirm(false)} className="w-full py-4 border border-[#e8dccb] text-[#a87a52] uppercase tracking-[0.2em] text-[10px] font-bold rounded-sm hover:bg-[#faeed8]/50 transition-colors min-h-[44px]">
                        Cancel
                     </button>
                     <button onClick={orderNow} className="w-full py-4 bg-[#a87a52] text-white uppercase tracking-[0.2em] text-[10px] font-bold rounded-sm hover:bg-[#8e613b] shadow-md transition-colors min-h-[44px]">
                        Confirm
                     </button>
                  </div>
               </div>
            </div>
         )}

      </section>
   )
}


export default ProductHero
