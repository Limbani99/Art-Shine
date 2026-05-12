import React from 'react';
import { Search, Plus, Download, Users, DollarSign, RefreshCw, Clock, ChevronRight, MessageSquare, MoreHorizontal, PenTool, ExternalLink, Box } from 'lucide-react';
import { useData } from '../context/DataProvider';
import { all } from 'axios';



const preservationHistory = [
    {
        id: 1,
        title: "The 'Ethereal Garden' Cube",
        orderId: "#AG-8821",
        date: "Mar 12, 2024",
        amount: "$450.00",
        status: "DELIVERED",
        statusColor: "text-[#3D9B5A]",
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    },
    {
        id: 2,
        title: 'Grand Bridal Frame (24")',
        orderId: "#AG-9042",
        date: "May 04, 2024",
        amount: "$1,200.00",
        status: "IN CURATION",
        statusColor: "text-[#F5B942]",
        image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=100&h=100&fit=crop',
    },
];


function Customer() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const { Allcustomer, TotalOrder } = useData()
    const stats = [
        { label: 'TOTAL CLIENTS', value: Allcustomer.length, icon: Users },
        { label: 'TOTAL ORDERS', value: TotalOrder.length, icon: Box },
        { label: 'TOTAL REVENUE', value: TotalOrder.reduce((acc, order) => acc + order.totalAmount, 0), icon: DollarSign },
        { label: 'COMPLETED ORDERS', value: TotalOrder.filter((order) => order.status === 'completed').length, icon: MessageSquare },
    ];
    return (
        <div className="font-sans text-[#3B2C24]">
            {/* Search Header — stacked on mobile */}
            <div className="flex flex-col lg:flex-row-reverse lg:items-center justify-between mb-6 sm:mb-8 gap-4">
                <div className="relative flex-1 max-w-full lg:max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BAA995]" size={18} />
                    <input
                        type="text"
                        placeholder="Search customers by name or email..."
                        className="w-full bg-[#F5F0EA] border-none rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm placeholder-[#BAA995] focus:ring-1 focus:ring-[#A37B5C] transition-all"
                    />
                </div>
                <div>
                    <p className="text-[10px] font-bold tracking-[0.18em] text-[#A37B5C] uppercase mb-1">Directory</p>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C1F14]">Customer Insights</h1>
                    <p className="text-xs italic text-[#BAA995]">Nurturing relationships through preserved memories.</p>
                </div>
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-[#EDE3D9] p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase">{stat.label}</p>
                            <stat.icon size={16} className="text-[#A37B5C]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#2C1F14] mb-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Customer Directory Table Section */}
            <div className="bg-white rounded-2xl border border-[#EDE3D9] shadow-sm mb-10 sm:mb-12 overflow-hidden">
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-[#F5F0EA]">
                    <div className="flex items-center gap-3">
                        <button className="bg-[#F5F0EA] hover:bg-[#EBE5DC] text-[#7B5837] text-[11px] font-bold tracking-[0.15em] uppercase px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg transition-colors">
                            Export CSV
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#BAA995] uppercase">Sort by:</span>
                        <select className="bg-transparent border-none text-[11px] font-bold text-[#2C1F14] focus:ring-0 cursor-pointer">
                            <option>Recent Activity</option>
                            <option>Highest LTV</option>
                            <option>Most Orders</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px]">
                        <thead>
                            <tr className="bg-[#FDFAF7] text-left border-b border-[#EDE3D9]">
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase">Customer</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase hidden md:table-cell">Contact Address</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase text-right hidden sm:table-cell">Phone</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase">Email</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase text-center">Orders</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F5F0EA]">
                            {Allcustomer.map((c) => (
                                <tr key={c._id} className="hover:bg-[#FDF9F4] transition-colors group cursor-pointer">
                                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#EDE3D9] flex-shrink-0">
                                                <img src={`${baseUrl}/uploads/${c.userImage}`} alt={c.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-[#2C1F14] truncate">{c.name}</p>
                                                <span className="text-[8px] font-black uppercase tracking-[0.12em] px-1.5 py-0.5 rounded bg-[#E8F7ED] text-[#3D9B5A]">
                                                    {c.role}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                                        <p className="text-xs text-[#29221D] mb-0.5 truncate max-w-[150px]">{c.address}</p>
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-center hidden sm:table-cell">
                                        <span className="bg-[#BAA995]/10 text-[#7B5837] text-xs font-black px-2 py-1 rounded-full">
                                            {c.phone}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                                        <p className="text-xs sm:text-sm font-black text-[#A37B5C] italic font-serif truncate max-w-[140px] ml-auto">{c.email}</p>
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                                        <p className="text-[11px] font-bold text-[#2C1F14]">order</p>
                                        <p className="text-[9px] uppercase tracking-wide text-[#BAA995]">order</p>
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                                        <ChevronRight size={18} className="text-[#DCCCBA] group-hover:translate-x-1 transition-transform ml-auto" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-[#F5F0EA] flex items-center justify-between">
                    <p className="text-[10px] text-[#BAA995] font-bold uppercase">Showing 3 of 1,284 patrons</p>
                    <div className="flex items-center gap-1">
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F0EA] text-[#BAA995] transition-colors"><ChevronRight size={16} className="rotate-180" /></button>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#7B5837] text-white text-[10px] font-bold">1</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F0EA] text-[#A37B5C] text-[10px] font-bold">2</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F0EA] text-[#A37B5C] text-[10px] font-bold">3</button>
                        <span className="text-[#D6C9BC] text-lg leading-none">...</span>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F0EA] text-[#BAA995] transition-colors"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>

            {/* Bottom Split Detail Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
                {/* Profile Card */}

                {/* History & Journal Section */}
                <div className="lg:col-span-12 flex flex-col gap-6">
                    {/* Preservation History */}
                    <div className="bg-[#F5F0EA] rounded-3xl p-8 border border-[#EDE3D9] flex-1">
                        <div className="flex items-center gap-3 mb-6 font-serif italic text-[#7B5837] text-xl">
                            <Clock size={22} className="text-[#A37B5C]" /> Preservation History
                        </div>

                        <div className="space-y-4">
                            {preservationHistory.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-transparent hover:border-[#DCCCBA] transition-all flex flex-col md:flex-row items-start md:items-center gap-5">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <h4 className="font-serif font-bold text-[#2C1F14]">{item.title}</h4>
                                            <span className={`text-[9px] font-black uppercase tracking-[0.12em] ${item.statusColor}`}>● {item.status}</span>
                                        </div>
                                        <p className="text-[10px] text-[#BAA995] uppercase font-bold tracking-[0.1em] mb-3">Order {item.orderId} • {item.date}</p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-black text-[#A37B5C] italic font-serif leading-none">{item.amount}</span>
                                            <button className="text-[9px] font-bold text-[#BAA995] hover:text-[#7B5837] tracking-widest uppercase flex items-center gap-1 transition-colors">
                                                {item.status === 'DELIVERED' ? 'VIEW DETAILS' : 'TRACK STATUS'} <ChevronRight size={10} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Artist's Journal */}
                    <div className="bg-[#F5F0EA] rounded-3xl p-8 border border-[#EDE3D9]">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="font-serif italic text-[#7B5837] text-xl">Artist's Journal</h4>
                            <PenTool size={18} className="text-[#A37B5C]" />
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 relative">
                            <div className="absolute top-4 right-4 text-[#DCCCBA]/30"><PenTool size={10} /></div>
                            <p className="text-[11px] text-[#6C5E53] italic leading-relaxed mb-4 ">
                                "Clara prefers minimal gold leaf accents. For her upcoming bridal piece, focus on preserving the delicate structure of the white hydrangeas. She mentioned these were her grandmother's favorites."
                            </p>
                            <p className="text-[8px] font-bold tracking-[0.2em] text-[#BAA995] uppercase">— Logged by ELENA, May 18</p>
                        </div>

                        <button className="w-full py-4 border-2 border-dashed border-[#D6C9BC] hover:border-[#A37B5C] rounded-xl text-[#A37B5C] text-[10px] font-bold tracking-[0.18em] uppercase transition-all hover:bg-[#FDF9F4]">
                            Add New Interaction Log
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Customer;