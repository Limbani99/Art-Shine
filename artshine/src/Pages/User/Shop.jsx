import React, { useState, useEffect, useRef } from 'react'
import { useData } from '../../context/DataProvider'
import ShopHeader from '../../Component/ShopComponents/ShopHeader'
import ShopGrid from '../../Component/ShopComponents/ShopGrid'
import ShopPagination from '../../Component/ShopComponents/ShopPagination'

function Shop() {
    const { allProduct } = useData();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const gridRef = useRef(null);

    // Calculate pagination values
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProduct ? allProduct.slice(indexOfFirstProduct, indexOfLastProduct) : [];
    const totalPages = allProduct ? Math.ceil(allProduct.length / productsPerPage) : 0;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Smooth scroll to top of the grid section for better UX
        if (gridRef.current) {
            gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full overflow-hidden bg-[#fdfaf6]">
            <ShopHeader />
            <div ref={gridRef}>
                <ShopGrid products={currentProducts} />
            </div>
            {totalPages > 1 && (
                <ShopPagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                />
            )}
        </div>
    )
}

export default Shop
