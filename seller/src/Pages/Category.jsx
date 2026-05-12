import React from 'react';
import { Plus, Pencil, LayoutGrid, Box, Star, TrendingUp, Eye, Download, Archive, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataProvider';



function Category() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const { categories, DeleteCategory, Allproducts, orders, TotalOrder } = useData()
    const handleDelete = (id) => {
        DeleteCategory(id)
    }
    const stats = [
        { label: 'TOTAL CATEGORIES', value: categories?.length, icon: LayoutGrid },
        { label: 'TOTAL PRODUCTS', value: Allproducts?.length, icon: Box },
        { label: 'BEST SELLER', value: TotalOrder?.reduce((acc, order) => acc + order.totalAmount, 0), icon: TrendingUp },
        { label: 'TOTAL ORDER', value: TotalOrder?.length, icon: Star },
    ];
    return (
        <div className="font-sans text-[#3B2C24] p-2 md:p-4  min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-2">
                <button onClick={() => navigate("/add-category")} className="flex items-center gap-2 bg-[#7B5837] hover:bg-[#6a4a2d] text-white text-[11px] font-bold tracking-[0.12em] uppercase px-6 py-3.5 rounded-lg transition-colors shadow-sm whitespace-nowrap self-start sm:self-auto">
                    <Plus size={16} />
                    Create New Category
                </button>
            </div>

            {/* Main Grid Layout */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
                {categories?.map((category) => (
                    <div key={category._id} className="bg-white rounded-2xl border border-[#EDE3D9] overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-all">
                        <div className="relative h-64 overflow-hidden bg-[#F5F0EA]">
                            <img
                                src={`${baseUrl}/uploads/${category?.image}`}
                                alt={category?.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-2xl font-serif font-bold text-[#2C1F14]">{category?.name}</h3>
                                <span className="bg-[#F5F0EA] text-[#A37B5C] text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded">
                                    {category?.categoryStatus}
                                </span>
                            </div>
                            <p className="text-xs text-[#6C5E53] leading-relaxed mb-6 flex-1">
                                {category?.description}
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F5F0EA]">
                                <div className="flex items-center gap-2 text-[#7B5837]">
                                    <Archive size={14} />
                                    <span className="text-[11px] font-bold tracking-wider">{category?.products} Products</span>
                                </div>
                                <button className="p-2 flex gap-4 text-[#BAA995]  transition-colors rounded-lg ">
                                    <Pencil className="cursor-pointer  hover:text-[#7B5837]" onClick={() => navigate(`/update-category/${category._id}`)} size={18} />
                                    <Trash2 className="cursor-pointer  hover:text-[#7B5837]" onClick={() => handleDelete(category._id)} size={14} />
                                </button>

                            </div>
                        </div>
                    </div>
                ))}

                {/* Add Collection card */}
                <div className="bg-transparent rounded-2xl border-2 border-dashed border-[#D6C9BC] flex flex-col items-center justify-center p-8 gap-4 cursor-pointer hover:border-[#A37B5C] hover:bg-[#FDF9F4] transition-all min-h-[300px]">
                    <div className="w-12 h-12 bg-[#F5F0EA] rounded-full flex items-center justify-center text-[#A37B5C]">
                        <Plus onClick={() => navigate("/add-category")} size={24} />
                    </div>
                    <p className="text-[11px] font-bold tracking-[0.18em] text-[#A37B5C] uppercase">ADD COLLECTION</p>
                </div>
            </div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-2 mt-10 md:grid-cols-4 gap-4 mb-12 px-2">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl border border-[#EDE3D9] p-5 shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#F5F0EA] rounded-lg flex items-center justify-center text-[#A37B5C] flex-shrink-0">
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold tracking-[0.14em] text-[#BAA995] uppercase mb-1">{stat.label}</p>
                            <p className="text-lg font-bold text-[#2C1F14]">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Category;