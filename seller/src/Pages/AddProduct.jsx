import React, { useState } from 'react';
import { Bold, Italic, List, Link as LinkIcon, Upload, Image as ImageIcon, Plus } from 'lucide-react';
import { useData } from '../context/DataProvider';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function AddProduct() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const { categories, user } = useData();
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({
        name: "",
        description: "",
        price: "",
        isAvailable: true,
        discountPrice: "",
        discountPersent: "",
        categoryId: "",
        image: [],
        sellerId: user?._id || "",
    })
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            const newFiles = Array.from(files);
            setformdata(prev => ({
                ...prev,
                image: [...prev.image, ...newFiles].slice(0, 4) // Limit to 4 images
            }));
        } else {
            setformdata(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const removeImage = (index) => {
        setformdata(prev => ({
            ...prev,
            image: prev.image.filter((_, i) => i !== index)
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?._id) {
            toast.error("User session not found. Please log in again.");
            return;
        }

        if (formdata.image.length === 0) {
            toast.error("At least one product image is required.");
            return;
        }

        try {
            const data = new FormData();
            data.append("name", formdata.name);
            data.append("description", formdata.description);
            data.append("price", Number(formdata.price));
            data.append("isAvailable", formdata.isAvailable);
            data.append("discountPrice", Number(formdata.discountPrice || 0));
            data.append("discountPersent", Number(formdata.discountPersent || 0));
            data.append("categoryId", formdata.categoryId);
            data.append("sellerId", user._id);

            formdata.image.forEach((file) => {
                data.append("image", file);
            });

            const res = await axios.post(`${baseUrl}/api/product/add`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success(res.data.message || "Product published successfully!");
            navigate("/products");
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error(error.response?.data?.message || "Failed to publish product.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="font-sans text-[#3B2C24]">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
                <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#A37B5C] uppercase mb-2">CATALOG MANAGEMENT</p>
                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-bold text-[#2C1F14] mb-2 sm:mb-3">Create New Masterpiece</h1>
                    <p className="text-sm italic text-[#BAA995] font-serif">Preserving moments, one detail at a time.</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <button type="button" className="flex-1 sm:flex-none px-5 sm:px-6 py-2.5 sm:py-3 border border-[#DCCCBA] text-[#A37B5C] rounded-xl text-[10px] font-black tracking-widest uppercase hover:bg-white transition-all">Save as Draft</button>
                    <button type="submit" className="flex-1 sm:flex-none px-8 sm:px-10 py-2.5 sm:py-3 bg-[#916A46] text-white rounded-xl text-[10px] font-black tracking-widest uppercase hover:bg-[#815B3A] transition-all shadow-md shadow-[#916A46]/20">Publish Product</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pb-10 sm:pb-12">
                {/* Left Column - Forms */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="bg-white rounded-2xl border border-[#EDE3D9] p-8 shadow-sm">
                        <h3 className="text-lg font-serif font-bold text-[#2C1F14] mb-6">Essential Information</h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase block">Product Name</label>
                                <input type="text" name="name" value={formdata.name} onChange={handleChange} placeholder="e.g., Everlasting Peony Resin Sphere" className="w-full bg-[#fdfaf6] border border-[#EDE3D9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#A37B5C] transition-colors font-medium placeholder:text-[#BAA995]/50" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase block">Category</label>
                                    <select name="categoryId" value={formdata.categoryId} onChange={handleChange} className="w-full bg-[#fdfaf6] border border-[#EDE3D9] rounded-lg px-4 py-3 text-sm focus:outline-none font-medium text-[#3B2C24]">
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase block">Seller ID</label>
                                    <input type="text" name="sellerId" value={user?._id} onChange={handleChange} className="w-full bg-[#F5F0EA] border border-[#EDE3D9] rounded-lg px-4 py-3 text-sm font-medium text-[#BAA995] cursor-not-allowed" defaultValue={user?._id} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase block">Description</label>
                                <div className="bg-[#fdfaf6] border border-[#EDE3D9] rounded-lg overflow-hidden focus-within:border-[#A37B5C] transition-colors">
                                    <div className="flex items-center gap-4 px-4 py-2 border-b border-[#EDE3D9] bg-[#F5F0EA]/50 text-[#BAA995]">
                                        <Bold size={14} className="cursor-pointer" />
                                        <Italic size={14} className="cursor-pointer" />
                                        <List size={14} className="cursor-pointer" />
                                        <LinkIcon size={14} className="cursor-pointer" />
                                    </div>
                                    <textarea name="description" rows="6" value={formdata.description} onChange={handleChange} placeholder="Describe the story and materials behind this piece..." className="w-full bg-transparent px-4 py-4 text-sm focus:outline-none font-medium placeholder:text-[#BAA995]/50 resize-none"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#EDE3D9] p-8 shadow-sm">
                        <h3 className="text-lg font-serif font-bold text-[#2C1F14] mb-6">Pricing & Logistics</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase block">Price ($)</label>
                                <input type="number" name="price" value={formdata.price} onChange={handleChange} placeholder="0.00" className="w-full bg-[#fdfaf6] border border-[#EDE3D9] rounded-lg px-4 py-3 text-sm focus:outline-none font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase block">Discount Price ($)</label>
                                <input type="number" name="discountPrice" value={formdata.discountPrice} onChange={handleChange} className="w-full bg-[#fdfaf6] border border-[#EDE3D9] rounded-lg px-4 py-3 text-sm focus:outline-none font-medium" />
                            </div>
                            {/* <div className="space-y-2">
                                <label className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase block">Discount Percentage (%)</label>
                                <div className="w-full bg-[#F5F0EA] border border-[#EDE3D9] rounded-lg px-4 py-3 text-sm font-medium text-[#BAA995]">0%</div>
                                <p className="text-[9px] italic text-[#BAA995]">Calculates automatically based on prices above.</p>
                            </div> */}
                        </div>
                    </div>
                </div>
                {/* Right Column - Gallery & Placeholder */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-white rounded-2xl border border-[#EDE3D9] p-8 shadow-sm text-center">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-serif font-bold text-[#2C1F14]">Product Gallery</h3>
                            <span className="text-[10px] font-black tracking-widest text-[#BAA995]">{formdata.image.length} / 4 IMAGES</span>
                        </div>
                        <div className="space-y-4">
                            <label className="aspect-[16/10] bg-[#fdfaf6] border-2 border-dashed border-[#DCCCBA] rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-[#F5F0EA] transition-colors group relative overflow-hidden">
                                {formdata.image[0] ? (
                                    <div className="absolute inset-0 bg-white">
                                        <img src={URL.createObjectURL(formdata.image[0])} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white text-[10px] font-black uppercase">Change Image</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 bg-[#F5F0EA] group-hover:bg-white rounded-full flex items-center justify-center text-[#A37B5C] mb-4 shadow-sm transition-all">
                                            <ImageIcon size={24} />
                                        </div>
                                        <p className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase">UPLOAD PRIMARY HERO IMAGE</p>
                                    </>
                                )}
                                <input type="file" name="image" onChange={handleChange} className="hidden" multiple />
                            </label>

                            <div className="grid grid-cols-3 gap-3">
                                {[...Array(3)].map((_, i) => {
                                    const imageIndex = i + 1;
                                    const file = formdata.image[imageIndex];
                                    return (
                                        <div key={i} className="aspect-square bg-[#fdfaf6] border border-dashed border-[#DCCCBA] rounded-xl flex items-center justify-center text-[#DCCCBA] cursor-pointer hover:bg-[#F5F0EA] transition-colors relative overflow-hidden group">
                                            {file ? (
                                                <>
                                                    <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                                                    <button type="button" onClick={(e) => { e.preventDefault(); removeImage(imageIndex); }} className="absolute top-1 right-1 w-5 h-5 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Plus size={12} className="rotate-45" />
                                                    </button>
                                                </>
                                            ) : (
                                                <label className="w-full h-full flex items-center justify-center cursor-pointer">
                                                    <Plus size={20} />
                                                    <input type="file" name="image" onChange={handleChange} className="hidden" multiple />
                                                </label>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="mt-6 text-center space-y-1">
                            <p className="text-[9px] italic text-[#BAA995]">Supported: JPG, PNG, WEBP (Max 5MB each).</p>
                        </div>
                    </div>

                    <div className="bg-[#F8F5F0] rounded-2xl border border-[#EDE3D9] p-8 shadow-sm relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none italic font-serif text-4xl">Reserve the light...</div>
                        <h3 className="text-xl font-serif font-bold text-[#2C1F14] mb-4">Finalizing Details</h3>
                        <p className="text-xs text-[#6C5E53] leading-relaxed mb-8 max-w-[280px] mx-auto opacity-80">Before you publish, ensure all descriptions and imagery accurately represent the product's quality.</p>
                        <button type="submit" className="w-full bg-[#916A46] text-white py-4 rounded-xl text-[11px] font-black tracking-[0.2em] transition-all shadow-md shadow-[#916A46]/20 hover:bg-[#815B3A]">PUBLISH MASTERPIECE</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AddProduct;
