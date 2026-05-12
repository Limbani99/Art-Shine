import React, { useState } from 'react';
import { Bold, Italic, List, Link as LinkIcon, Upload, Eye, FileEdit, Archive, ChevronRight, LayoutPanelTop } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function AddCategory() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    // UI State only - logic for data can be injected here
    const [status, setStatus] = useState('active');
    const [preview, setPreview] = useState(null);
    const fileInputRef = React.useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: null,
        categoryStatus: "",
    })

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === "file") {
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
        const loadId = toast.loading("Adding Category...");
        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });
            const res = await axios.post(`${baseUrl}/api/category/add`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success(res.data.message);
            navigate("/category")
        } catch (err) {
            toast.error(err.response.data.message)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="font-sans text-[#3B2C24]">
            {/* Top Navigation Bar — stacks on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 gap-3 sm:gap-4 text-sm">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#BAA995] uppercase">
                    <span className="hover:text-[#A37B5C] cursor-pointer">INVENTORY</span>
                    <ChevronRight size={12} />
                    <span className="text-[#A37B5C]">New Category</span>
                </div>
                <div className="flex items-center gap-3">
                    <button type="button" className="flex-1 sm:flex-none px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl border border-[#DCCCBA] text-[#815B3A] text-xs font-bold tracking-[0.15em] hover:bg-white transition-all text-center">
                        Cancel
                    </button>
                    <button type="submit" className="flex-1 sm:flex-none px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-[#916A46] text-white text-xs font-bold tracking-[0.15em] hover:bg-[#815B3A] transition-all shadow-md shadow-[#916A46]/20 text-center">
                        Save Category
                    </button>
                </div>
            </div>

            {/* Header Section */}
            <div className="mb-8 sm:mb-12">
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#BAA995] uppercase mb-2">WORKSPACE SETUP</p>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C1F14] flex flex-wrap gap-x-3 sm:gap-x-4">
                    Create a New <span className="text-[#815B3A] italic font-serif">Artistic Genre</span>
                </h1>
                <p className="text-sm italic font-serif text-[#BAA995] mt-3 opacity-80">Curated Preservation</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 pb-12 sm:pb-16">

                {/* Left Column Area */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="bg-white rounded-[32px] border border-[#EDE3D9]/60 p-10 shadow-sm">
                        <div className="space-y-10">
                            <div>
                                <label className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase block mb-4">Category Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Victorian Pressed Florals"
                                    className="w-full bg-transparent border-b-2 border-[#F5F0EA] pb-4 text-2xl font-serif font-medium focus:outline-none focus:border-[#A37B5C] transition-colors placeholder:text-[#BAA995]/30"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase block mb-4">Category Description</label>
                                <div className="bg-[#fdfaf6]/50 border border-[#EDE3D9] rounded-2xl overflow-hidden shadow-inner">
                                    <div className="flex items-center gap-5 px-6 py-3 border-b border-[#EDE3D9] bg-[#F5F0EA]/40">
                                        <Bold size={14} className="text-[#BAA995] cursor-pointer" />
                                        <Italic size={14} className="text-[#BAA995] cursor-pointer" />
                                        <List size={14} className="text-[#BAA995] cursor-pointer" />
                                        <LinkIcon size={14} className="text-[#BAA995] cursor-pointer" />
                                    </div>
                                    <textarea
                                        type="text"
                                        name="description"
                                        rows="8"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe the essence of this collection..."
                                        className="w-full bg-transparent px-6 py-6 text-base text-[#6C5E53] leading-relaxed focus:outline-none placeholder:text-[#BAA995]/40 resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column Area */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="bg-white rounded-[32px] border border-[#EDE3D9] p-8 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase">Category Image</h3>
                            {preview && (
                                <button
                                    type="button"
                                    onClick={() => { setPreview(null); setFormData({ ...formData, image: "" }); }}
                                    className="text-[9px] font-bold text-[#A37B5C] hover:text-[#815B3A] uppercase tracking-wider transition-colors"
                                >
                                    Replace
                                </button>
                            )}
                        </div>

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer border-2 border-dashed border-[#EDE3D9] hover:border-[#A37B5C] transition-all duration-500 bg-[#F9F7F4]"
                        >
                            {preview ? (
                                <>
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="bg-white/20 p-4 rounded-full backdrop-blur-md border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <Upload size={24} className="text-white" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                                    <div className="w-20 h-20 rounded-full bg-white shadow-xl shadow-[#A37B5C]/5 flex items-center justify-center text-[#A37B5C] mb-6 transform group-hover:scale-110 transition-transform duration-500 border border-[#F5F0EA]">
                                        <Upload size={28} strokeWidth={1.5} />
                                    </div>
                                    <p className="text-sm font-bold text-[#2C1F14] mb-1">Select Artwork</p>
                                    <p className="text-[10px] font-medium text-[#BAA995] uppercase tracking-widest">JPG or PNG up to 5MB</p>

                                    {/* Subtle decorative elements */}
                                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#EDE3D9] rounded-tr-lg opacity-40 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#EDE3D9] rounded-bl-lg opacity-40 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                name="image"
                                onChange={handleChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>

                        <div className="mt-6 flex items-start gap-4 p-4 bg-[#F9F7F4] rounded-2xl border border-[#EDE3D9]/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A37B5C] mt-1.5 shrink-0"></div>
                            <p className="text-[11px] leading-relaxed text-[#6C5E53] italic font-serif">
                                Use a high-resolution hero shot that captures the tactile nature of this category.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] border border-[#EDE3D9] p-8 shadow-sm">
                        <h3 className="text-[10px] font-black tracking-widest text-[#A37B5C] uppercase mb-6">Publication Status</h3>
                        <div className="space-y-4">
                            {[
                                { id: 'active', label: 'Active', sub: 'Publicly visible in your storefront.', icon: Eye },
                                { id: 'draft', label: 'Draft', sub: 'Saved for further editing. Invisible.', icon: FileEdit },
                                { id: 'archived', label: 'Archived', sub: 'Hidden from store but kept for records.', icon: Archive }
                            ].map((s) => (
                                <div
                                    key={s.id}
                                    onClick={() => setStatus(s.id)}
                                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${status === s.id ? 'bg-[#F2EBE3] border-[#815B3A]/30' : 'bg-[#fdfaf6]/50 border-transparent hover:bg-[#F2EBE3]/50'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${status === s.id ? 'border-[#815B3A] bg-white' : 'border-[#DCCCBA]'}`}>
                                        {status === s.id && <div className="w-2.5 h-2.5 rounded-full bg-[#815B3A]"></div>}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-[#2C1F14]">{s.label}</h4>
                                        <p className="text-[9px] font-bold text-[#BAA995] uppercase tracking-widest mt-0.5">{s.sub}</p>
                                    </div>
                                    <s.icon size={18} className={status === s.id ? 'text-[#815B3A]' : 'text-[#DCCCBA] opacity-50'} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AddCategory;
