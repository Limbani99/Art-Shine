import React from 'react'
import ProductHero from '../../Component/ProductComponents/ProductHero'
import ProductCare from '../../Component/ProductComponents/ProductCare'
import RelatedProducts from '../../Component/ProductComponents/RelatedProducts'

function ProductDetails() {
  return (
    <div className="w-full overflow-hidden bg-[#fdfaf6]">
      <ProductHero />
      <ProductCare />
      <RelatedProducts />
    </div>
  )
}

export default ProductDetails
