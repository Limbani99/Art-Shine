import React, { useState } from 'react';
import { Plus, Pencil, Trash2, ImagePlus } from 'lucide-react';
import { useData } from '../context/DataProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Products() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const { Allproducts, DeleteProduct, Getproduct } = useData()
    const navigate = useNavigate();

    const handleDelete = (id) => {
        DeleteProduct(id)
    }

    const handlePublish = async (id) => {
        try {
            await axios.put(`${baseUrl}/api/product/update/${id}`, {
                isAvailable: true
            });
            await Getproduct();
            toast.success("Product published successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to publish product");
        }
    }

    return (
        <div className="font-sans text-[#3B2C24]">

            {/* Page heading + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
                <button className="flex items-center gap-2 bg-[#7B5837] hover:bg-[#6a4a2d] text-white text-[11px] font-bold tracking-[0.12em] uppercase px-5 py-3 rounded-lg transition-colors shadow-sm whitespace-nowrap self-start sm:self-auto">
                    <Plus size={15} onClick={() => navigate("/add-product")} />
                    Add New Product
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                <div className="bg-white rounded-xl border border-[#EDE3D9] px-4 sm:px-6 py-4 shadow-sm">
                    <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase mb-2">
                        Total Products
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#2C1F14]">{Allproducts.length}</p>
                </div>
                <div className="bg-white rounded-xl border border-[#EDE3D9] px-4 sm:px-6 py-4 shadow-sm">
                    <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase mb-2">
                        Published Products
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#D9534F]">{Allproducts.filter((product) => product.isAvailable === true).length}</p>
                </div>
                <div className="bg-white rounded-xl border border-[#EDE3D9] px-4 sm:px-6 py-4 shadow-sm">
                    <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase mb-2">
                        Not Published Products
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-[#2C1F14]">{Allproducts.filter((product) => product.isAvailable === false).length}</p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
                {Allproducts.map((product) => {
                    const isDraft = product.isAvailable === false;
                    return (
                        <div
                            key={product?._id}
                            className={`bg-white rounded-2xl border shadow-sm flex flex-col overflow-hidden transition-all hover:shadow-md ${isDraft ? 'border-dashed border-[#C9AE94]' : 'border-[#EDE3D9]'
                                }`}
                        >
                            {/* Image */}
                            <div className="relative h-44 sm:h-52 bg-[#F5F0EA] overflow-hidden">
                                <img
                                    src={`${baseUrl}/uploads/${product?.image[0]}`}
                                    alt={product?.name}
                                    className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${isDraft ? 'grayscale opacity-70' : ''}`}
                                />

                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-1">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h3 className={`font-bold text-sm leading-tight ${isDraft ? 'text-[#9B8C80]' : 'text-[#2C1F14]'}`}>
                                        {product?.name}
                                    </h3>
                                    <p className={`text-[11px] mb-3 ${isDraft ? 'text-[#BAA995] italic' : 'text-[#9B8C80]'}`}>
                                        {product?.description}
                                    </p>

                                    <span className={`font-bold text-sm whitespace-nowrap ${isDraft ? 'text-[#9B8C80]' : 'text-[#A37B5C]'}`}>
                                        {product?.price}
                                    </span>

                                </div>
                                <p className={`text-[11px] mb-3 ${isDraft ? 'text-[#BAA995] italic' : 'text-[#9B8C80]'}`}>
                                    {product?.categoryId?.name}
                                </p>


                                {/* Status row */}
                                <div className="flex items-center justify-between mt-auto">
                                    {/* <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${sc.dot}`} />
                                        <span className="text-[10px] font-semibold text-[#6C5E53]">
                                            {isDraft ? 'Not Published' : `${sc.label}: ${product.stock} units`}
                                        </span>
                                    </div> */}
                                    {console.log(isDraft)}
                                    {isDraft ? (
                                        <button onClick={() => handlePublish(product._id)} className="bg-[#7B5837] hover:bg-[#6a4a2d] text-white text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-lg transition-colors">
                                            Publish
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <button className="w-7 h-7 flex items-center justify-center text-[#9B8C80] hover:text-[#7B5837] transition-colors">
                                                <Pencil size={14} onClick={() => navigate(`/update-product/${product._id}`)} />
                                            </button>
                                            <button className="w-7 h-7 flex items-center justify-center text-[#9B8C80] hover:text-[#D9534F] transition-colors">
                                                <Trash2 size={14} onClick={() => handleDelete(product._id)} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Upload / New Artisan Creation card */}
                <div className="bg-white rounded-2xl border-2 border-dashed border-[#D6C9BC] shadow-sm flex flex-col items-center justify-center p-8 gap-3 cursor-pointer hover:border-[#A37B5C] hover:bg-[#FDFAF7] transition-all min-h-[260px]">
                    <div className="w-12 h-12 bg-[#F5F0EA] rounded-xl flex items-center justify-center">
                        <ImagePlus size={22} className="text-[#A37B5C]" onClick={() => navigate("/add-product")} />
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-sm text-[#2C1F14] mb-1">New Artisan Creation</p>
                        <p className="text-[11px] text-[#9B8C80] leading-relaxed">
                            Upload your latest preservation masterpiece to the gallery.
                        </p>
                    </div>
                </div>
            </div>

            {/* Inventory Details Table */}
            <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C1F14] mb-5">
                    Inventory Details
                </h2>

                <div className="bg-white rounded-2xl border border-[#EDE3D9] overflow-hidden shadow-sm">
                    {/* Table header */}
                    <div className="hidden sm:grid grid-cols-5 px-6 py-3 bg-[#FDFAF7] border-b border-[#EDE3D9]">
                        {['Product', 'Category', 'Base Price', 'Status', 'Actions'].map(h => (
                            <p key={h} className="text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase">
                                {h}
                            </p>
                        ))}
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-[#EDE3D9]">
                        {Allproducts.map((product) => (
                            <div
                                key={product?._id}
                                className="flex flex-col sm:grid sm:grid-cols-5 items-start sm:items-center px-4 sm:px-6 py-4 gap-2 sm:gap-0 hover:bg-[#FDFAF7] transition-colors"
                            >
                                {/* Product */}
                                <div className="flex items-center gap-3 col-span-1">
                                    <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#EDE3D9] flex-shrink-0">
                                        <img
                                            src={`${baseUrl}/uploads/${product?.image[0]}`}
                                            alt={product?.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-[#2C1F14] leading-tight">
                                        {product?.name}
                                    </span>
                                </div>

                                {/* Category */}
                                <p className="text-sm text-[#6C5E53] sm:col-span-1">
                                    <span className="sm:hidden text-[10px] font-bold text-[#BAA995] uppercase mr-1">Category: </span>
                                    {product?.categoryId?.name}
                                </p>

                                {/* Price */}
                                <p className="text-sm font-semibold text-[#2C1F14] sm:col-span-1">
                                    <span className="sm:hidden text-[10px] font-bold text-[#BAA995] uppercase mr-1">Price: </span>
                                    {product?.price}
                                </p>

                                {/* Available */}
                                <p className={`text-sm font-bold sm:col-span-1 ${product?.isAvailable ? 'text-[#D9534F]' : 'text-[#2C1F14]'}`}>
                                    <span className="sm:hidden text-[10px] font-bold text-[#BAA995] uppercase mr-1">Available: </span>
                                    {product?.isAvailable ? "Available" : "Not Available"}
                                </p>

                                {/* Actions */}
                                <div className="flex items-center gap-3 sm:col-span-1">
                                    <button className="text-xs font-bold text-[#7B5837] hover:text-[#5a3f25] transition-colors" onClick={() => navigate(`/update-product/${product._id}`)}>
                                        Edit
                                    </button>
                                    <button className="text-xs font-bold text-[#D9534F] hover:text-[#b52b27] transition-colors" onClick={() => handleDelete(product._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;