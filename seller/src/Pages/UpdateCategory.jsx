import React, { useState, useEffect, useRef } from 'react';
import { Bold, Italic, List, Link as LinkIcon, Upload, Pencil, Trash2, ChevronRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

function UpdateCategory() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const { id } = useParams();
    const { categories, getCategory } = useData();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        categoryStatus: "active"
    });

    useEffect(() => {
        if (categories.length > 0) {
            const found = categories.find((c) => c._id === id);
            if (found) {
                setFormData({
                    name: found.name,
                    description: found.description,
                    image: found.image,
                    categoryStatus: found.categoryStatus || "active"
                });
                setFetching(false);
            }
        }
    }, [categories, id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            const file = files[0];
            setFormData({ ...formData, [name]: file });
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            const res = await axios.put(`${baseUrl}/api/category/update/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            // console.log(res.data);
            await getCategory();
            toast.success("Category updated successfully");
            navigate("/category");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update category");
        } finally {
            setLoading(false);
        }
    };

    if (fetching && categories.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-[#A37B5C]/20 border-t-[#A37B5C] animate-spin"></div>
                    <p className="text-sm font-medium text-[#A37B5C] animate-pulse uppercase tracking-widest">Loading Details...</p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="font-sans text-[#3B2C24]">
            <div className="mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#BAA995] uppercase mb-2">
                        <span>WORKSPACE</span>
                        <ChevronRight size={10} />
                        <span className="text-[#A37B5C]">MANAGEMENT</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1F14] leading-tight">Update Category</h1>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <button
                        type="button"
                        onClick={() => navigate("/category")}
                        className="flex-1 sm:flex-none px-5 sm:px-8 py-2.5 sm:py-3 border border-[#DCCCBA] text-[#815B3A] rounded-2xl text-xs font-bold tracking-[0.15em] transition-all hover:bg-white text-center"
                    >
                        Discard Changes
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex-1 sm:flex-none px-6 sm:px-10 py-2.5 sm:py-3 bg-[#916A46] text-white rounded-2xl text-xs font-bold tracking-[0.15em] transition-all shadow-lg shadow-[#916A46]/20 hover:bg-[#815B3A] text-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Updating...' : 'Update Category'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 pb-12 sm:pb-16">
                <div className="lg:col-span-7 space-y-10">
                    <div className="bg-white rounded-[32px] border border-[#EDE3D9] p-10 shadow-sm">
                        <div className="space-y-10">
                            <div>
                                <label className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase block mb-4">Category Name</label>
                                <input type="text" value={formData.name} onChange={handleChange} name="name" className="w-full bg-transparent border-b border-[#F5F0EA] pb-4 text-2xl font-serif font-medium focus:outline-none focus:border-[#A37B5C] transition-colors" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase block mb-4">Category Description</label>
                                <div className="bg-[#fdfaf6]/50 border border-[#EDE3D9] rounded-2xl overflow-hidden shadow-sm">
                                    <div className="flex items-center gap-5 px-6 py-3 border-b border-[#EDE3D9] bg-[#F5F0EA]/50 text-[#BAA995]">
                                        <Bold size={14} className="cursor-pointer hover:text-[#A37B5C]" />
                                        <Italic size={14} className="cursor-pointer hover:text-[#A37B5C]" />
                                        <List size={14} className="cursor-pointer hover:text-[#A37B5C]" />
                                        <LinkIcon size={14} className="cursor-pointer hover:text-[#A37B5C]" />
                                    </div>
                                    <textarea name="description" value={formData.description} onChange={handleChange} rows="10" className="w-full bg-transparent px-6 py-6 text-sm text-[#6C5E53] leading-relaxed focus:outline-none resize-none"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-10">
                    <div className="bg-white rounded-[32px] border border-[#EDE3D9] p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[10px] font-black tracking-widest text-[#BAA995] uppercase">Live Preview & Media</h3>
                            {preview && (
                                <button
                                    type="button"
                                    onClick={() => { setPreview(null); }}
                                    className="text-[9px] font-bold text-[#A37B5C] hover:text-[#815B3A] uppercase tracking-wider"
                                >
                                    Reset Image
                                </button>
                            )}
                        </div>

                        <div className="space-y-6 text-center">
                            <div className="bg-[#fdfaf6] rounded-2xl overflow-hidden border border-[#EDE3D9] relative group aspect-square">
                                <img
                                    src={preview || `${baseUrl}/uploads/${formData.image}`}
                                    alt="Category Preview"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {preview && (
                                    <div className="absolute top-4 left-4 bg-[#815B3A] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                        New Selection
                                    </div>
                                )}
                            </div>

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-[#fdfaf6] rounded-[24px] border-2 border-dashed border-[#DCCCBA] p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-[#A37B5C] transition-all"
                            >
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#A37B5C] mb-3 transition-all group-hover:scale-110 border border-[#F5F0EA]">
                                    <Upload size={20} />
                                </div>
                                <p className="text-xs font-bold text-[#2C1F14] mb-1">Replace Image</p>
                                <p className="text-[9px] font-bold text-[#BAA995] tracking-widest opacity-70">JPG, PNG up to 5MB</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    name="image"
                                    onChange={handleChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] border border-[#EDE3D9] p-8 shadow-sm">
                        <h3 className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase mb-6">Publication Status</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { id: 'active', label: 'Active', sub: 'Public' },
                                { id: 'draft', label: 'Draft', sub: 'Hidden' },
                                { id: 'archived', label: 'Archived', sub: 'Storage' }
                            ].map((s) => (
                                <div
                                    key={s.id}
                                    onClick={() => setFormData({ ...formData, categoryStatus: s.id })}
                                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4 ${formData.categoryStatus === s.id ? 'bg-[#F2EBE3] border-[#815B3A]/30' : 'bg-[#fdfaf6]/50 border-transparent hover:bg-[#F2EBE3]/50'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.categoryStatus === s.id ? 'border-[#815B3A] bg-white' : 'border-[#DCCCBA]'}`}>
                                        {formData.categoryStatus === s.id && <div className="w-2 h-2 rounded-full bg-[#815B3A]"></div>}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-[#2C1F14]">{s.label}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default UpdateCategory;
