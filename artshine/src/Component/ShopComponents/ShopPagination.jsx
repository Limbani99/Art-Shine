import React from 'react'

function ShopPagination({ currentPage, totalPages, onPageChange }) {
  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="w-full bg-[#fdfaf6] px-6 md:px-16 pt-16 pb-32 flex flex-col items-center justify-center border-t border-transparent">
        
        <p className="text-[10px] tracking-[0.2em] font-medium text-[#c08f65] uppercase mb-8">
          Page {currentPage} of {totalPages}
        </p>

        <div className="flex items-center gap-3">
           {/* Previous Button */}
           <button 
             onClick={() => onPageChange(currentPage - 1)}
             disabled={currentPage === 1}
             className={`w-10 h-10 rounded shadow-sm border border-[#e8dccb] flex items-center justify-center text-[#c08f65] transition-all bg-white font-medium ${
               currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#a87a52] hover:border-[#a87a52] hover:text-white'
             }`}
           >
             &lt;
           </button>
           
           {/* Page Numbers */}
           {pageNumbers.map(number => (
             <button 
               key={number}
               onClick={() => onPageChange(number)}
               className={`w-10 h-10 rounded shadow-md font-medium flex items-center justify-center transition-all ${
                 currentPage === number 
                  ? 'bg-[#a87a52] text-white' 
                  : 'bg-white text-[#c08f65] border border-[#e8dccb] hover:border-[#a87a52]'
               }`}
             >
               {number}
             </button>
           ))}
           
           {/* Next Button */}
           <button 
             onClick={() => onPageChange(currentPage + 1)}
             disabled={currentPage === totalPages}
             className={`w-10 h-10 rounded shadow-sm border border-[#e8dccb] flex items-center justify-center text-[#c08f65] transition-all bg-white font-medium ${
               currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#a87a52] hover:border-[#a87a52] hover:text-white'
             }`}
           >
             &gt;
           </button>
        </div>

    </section>
  )
}

export default ShopPagination
