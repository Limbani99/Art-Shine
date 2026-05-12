import React, { useEffect, useState } from 'react';
import { Upload, Plus, Minus, ChevronRight, ImageIcon, Edit3 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../context/DataProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

function UpdateProduct() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const { categories, Getproduct, user, } = useData();
    // UI Local State
    const [isLive, setIsLive] = useState(true);
    const [isAvailable, setIsAvailable] = useState(true);
    const [preview, setPreview] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        discountPercent: "",
        categoryId: "",
        image: [], // changed to match AddProduct
        sellerId: user?._id || "",
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/product/get/${id}`);
                const prod = res.data.product;
                setFormData({
                    name: prod.name,
                    description: prod.description,
                    price: prod.price,
                    discountPrice: prod.discountPrice,
                    discountPercent: prod.discountPersent,
                    categoryId: prod.categoryId,
                    image: [], // To keep files separate from existing URLs if needed
                    sellerId: prod.sellerId
                });
                setIsAvailable(prod.isAvailable);
                if (prod.image && prod.image.length > 0) {
                    setPreview(prod.image.map(img => `${baseUrl}/uploads/` + img));
                }
            } catch (err) {
                console.log(err);
                toast.error("Failed to load product details");
            }
        };
        if (id) fetchProduct();
    }, [id]);

    const handlechange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            const newFiles = Array.from(files);
            setFormData(prev => ({
                ...prev,
                image: [...prev.image, ...newFiles].slice(0, 4) // Limit to 4 images
            }));

            // Generate previews
            newFiles.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(prev => [...prev, reader.result].slice(0, 4));
                };
                reader.readAsDataURL(file);
            });
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("name", formData.name)
            data.append("description", formData.description)
            data.append("price", formData.price)
            data.append("discountPrice", formData.discountPrice)
            data.append("discountPercent", formData.discountPercent)
            data.append("categoryId", formData.categoryId)
            data.append("sellerId", formData.sellerId)
            data.append("isAvailable", isAvailable)
            data.append("isLive", isLive)

            if (formData.image && formData.image.length > 0) {
                formData.image.forEach((img) => {
                    data.append("image", img); // Matches multer upload.array('image')
                });
            }
            const res = await axios.put(`${baseUrl}/api/product/update/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            await Getproduct();
            toast.success("Product updated successfully")
            navigate("/products")
        } catch (error) {
            console.log(error)
            toast.error("Failed to update product")
        }
    };

    return (
        <form onSubmit={handleSubmit} className="font-sans text-[#3B2C24]">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase mb-1 flex-wrap">
                        <span>WORKSPACE</span><ChevronRight size={10} /><span>INVENTORY</span><ChevronRight size={10} />
                        <span className="text-[#A37B5C]">UPDATE PRODUCT</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#2C1F14]">Update Product: <span className="italic text-[#A37B5C]">Midnight Peony Block</span></h1>
                    <p className="text-xs italic text-[#BAA995] mt-1">Modify details for your one-of-a-kind preserved flower sculpture.</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <button type="button" className="flex-1 sm:flex-none bg-white text-[#7B5837] border border-[#EDE3D9] text-[11px] font-bold tracking-[0.15em] uppercase px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl transition-all hover:shadow-sm text-center">Cancel Changes</button>
                    <button type="submit" className="flex-1 sm:flex-none bg-[#7B5837] text-white text-[11px] font-bold tracking-[0.15em] uppercase px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl transition-all shadow-sm shadow-[#7B5837]/20 hover:bg-[#6a4a2d] text-center">Update Product</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pb-10 sm:pb-12">
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white rounded-2xl border border-[#EDE3D9] p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8"><div className="w-1.5 h-1.5 rounded-full bg-[#A37B5C]"></div><h3 className="text-lg font-serif font-bold text-[#2C1F14]">General Information</h3></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-[#BAA995] uppercase block">Product Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handlechange} placeholder='e.g., Midnight Peony Block' className="w-full bg-[#fdfaf6] border border-[#EDE3D9] rounded-xl px-5 py-3.5 text-sm font-medium text-[#2C1F14] focus:outline-none focus:border-[#A37B5C] transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-[#BAA995] uppercase block">Category</label>
                                <div className="relative">
                                    <select name="categoryId" value={formData.categoryId} onChange={handlechange} className="w-full bg-[#fdfaf6] border border-[#EDE3D9] rounded-lg px-4 py-3 text-sm focus:outline-none font-medium text-[#3B2C24]">
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[#BAA995] pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-8 space-y-2">
                            <label className="text-[10px] font-black tracking-widest text-[#BAA995] uppercase block">Seller ID (READ-ONLY)</label>
                            <input type="text" readOnly value={user?._id || ""} className="w-full bg-[#F5F0EA] border border-[#EDE3D9] rounded-xl px-5 py-3.5 text-xs font-bold text-[#BAA995] tracking-widest cursor-not-allowed" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black tracking-widest text-[#BAA995] uppercase block">Description</label>
                            <textarea type="text" value={formData.description} onChange={handlechange} name="description" rows="8" className="w-full bg-[#fdfaf6] border border-[#EDE3D9] rounded-xl px-6 py-5 text-sm text-[#6C5E53] leading-relaxed focus:outline-none focus:border-[#A37B5C] transition-colors resize-none font-light" defaultValue="This striking Midnight Peony piece..."></textarea>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#EDE3D9] p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#3D79B5]"></div><h3 className="text-lg font-serif font-bold text-[#2C1F14]">Gallery & Media</h3></div>
                            <button type="button" className="text-[10px] font-black tracking-[0.2em] text-[#3D79B5] uppercase hover:text-[#2C1F14] transition-colors">REORDER PHOTOS</button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            {preview.length > 0 ? preview.map((src, i) => (
                                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-[#EDE3D9] group shadow-sm transition-all">
                                    <img src={src} alt="Product" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                            )) : [1, 2, 3].map((i) => (
                                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-[#EDE3D9] group shadow-sm transition-all">
                                    <div className="w-full h-full bg-[#F5F0EA] flex items-center justify-center text-[#DCCCBA]">No Image</div>
                                </div>
                            ))}
                        </div>
                        <label className="bg-[#fdfaf6] rounded-2xl border-2 border-dashed border-[#DCCCBA] p-10 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-[#A37B5C] transition-all">
                            <Upload size={24} className="text-[#A37B5C] mb-3 group-hover:scale-110 transition-transform" />
                            <p className="text-sm font-bold text-[#2C1F14] mb-1">Upload replacement images</p>
                            <p className="text-[10px] font-bold text-[#BAA995] tracking-widest opacity-70 mb-6">High-resolution JPG or PNG (Max 10MB)</p>
                            <input type="file" name="image" onChange={handlechange} className="hidden" multiple />
                            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.querySelector('input[name="image"]').click() }} className="px-6 py-2.5 bg-white border border-[#DCCCBA] rounded-lg text-[10px] font-bold text-[#A37B5C] uppercase tracking-widest hover:bg-[#A37B5C] hover:text-white transition-all shadow-sm">BROWSE FILES</button>
                        </label>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white rounded-2xl border border-[#EDE3D9] p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8 text-[#A37B5C]"><div className="w-1.5 h-1.5 rounded-full bg-[#A37B5C]"></div><h3 className="text-lg font-serif font-bold text-[#2C1F14]">Pricing & Inventory</h3></div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-[#BAA995] uppercase block">BASE PRICE ($)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BAA995] font-serif text-lg">$</span>
                                    <input type="number" name="price" value={formData.price} onChange={handlechange} placeholder="0.00" className="w-full bg-[#fdfaf6] border border-[#EDE3D9] rounded-xl pl-8 pr-5 py-4 text-xl font-bold text-[#2C1F14] focus:outline-none focus:border-[#A37B5C] transition-colors" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-widest text-[#BAA995] uppercase block">DISCOUNT (%)</label>
                                    <div className="relative"><input type="number" name="discountPercent" value={formData.discountPercent} onChange={handlechange} placeholder="0" className="w-full bg-[#fdfaf6] border border-[#EDE3D9] rounded-xl px-5 py-3.5 text-base font-bold text-[#2C1F14] focus:outline-none" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BAA995] text-xs">%</span></div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-widest text-[#BAA995] uppercase block">DISCOUNT PRICE ($)</label>
                                    <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BAA995] text-xs">$</span><input type="number" name="discountPrice" value={formData.discountPrice} onChange={handlechange} placeholder="0.00" className="w-full bg-[#fdfaf6] border border-[#EDE3D9] rounded-xl pl-8 pr-5 py-3.5 text-base font-bold text-[#A37B5C] focus:outline-none" /></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-[#BAA995] uppercase block">Available Stock</label>
                                <div className="bg-[#FDF9F4] border border-[#EDE3D9] rounded-xl p-1 flex items-center justify-between">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase block">
                                            Availability
                                        </label>
                                        <button
                                            type="button"
                                            name="isAvailable"
                                            value={isAvailable}
                                            onClick={() => setIsAvailable(!isAvailable)}
                                            className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all
                                            ${isAvailable
                                                    ? "bg-[#916A46] text-white shadow-md shadow-[#916A46]/20"
                                                    : "border border-[#DCCCBA] text-[#BAA995] hover:bg-white"
                                                }`}
                                        >
                                            {isAvailable ? "✓ In Stock" : "✕ Out of Stock"}
                                        </button>
                                    </div>
                                    <p className="text-[9px] italic text-[#BAA995] mt-3 uppercase tracking-widest font-black opacity-60">Ready to ship within 3-5 days.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#F2EBE3]/50 rounded-[32px] border border-[#EDE3D9] p-6 sm:p-10 relative overflow-hidden backdrop-blur-sm">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none font-serif italic text-4xl">"Forever bloom"</div>
                            <p className="font-serif italic text-2xl text-[#BAA995] opacity-60">Artist's Note</p>
                            <p className="text-sm font-serif font-bold text-[#2C1F14] leading-relaxed italic mt-6 mb-10 opacity-90">"This specific peony was sourced from our spring harvest... ensure the photos capture the subtle violet undertones."</p>
                            <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#A37B5C] hover:scale-105 transition-all cursor-pointer"><Edit3 size={16} /></div><span className="w-12 h-[1px] bg-[#DCCCBA]"></span></div>
                        </div>

                        <div className="bg-white rounded-2xl border-l-[6px] border-[#A37B5C] border border-[#EDE3D9] p-6 shadow-sm overflow-hidden relative">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5"><p className="text-[10px] font-black tracking-widest text-[#BAA995] uppercase">VISIBILITY STATUS</p><p className="text-xs font-bold text-[#2C1F14]">{isLive ? 'Live on storefront' : 'Hidden from shop'}</p></div>
                                <button type="button" onClick={() => setIsLive(!isLive)} className={`w-12 h-6 rounded-full transition-all relative ${isLive ? 'bg-[#3D9B5A]' : 'bg-[#D6C9BC]'}`}><div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute top-1 transition-all ${isLive ? 'left-7' : 'left-1'}`}></div></button>
                                <input type="hidden" name="isLive" value={isLive} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center pb-12 opacity-40"><p className="text-[8px] font-black tracking-[0.4em] text-[#BAA995] uppercase">ARTISAN GLOW © 2024 • EXCELLENCE IN PRESERVATION</p></div>
            </div>
        </form>
    );
}

export default UpdateProduct;
