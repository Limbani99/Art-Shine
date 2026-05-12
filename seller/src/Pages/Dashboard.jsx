import React from 'react';
import { ShoppingBag, MessageSquare, Plus, CalendarCheck, Megaphone, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataProvider';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const { Allcustomer, user, TotalOrder } = useData()
    const navigate = useNavigate()
    console.log(TotalOrder)
    return (
        <div className="font-sans text-[#3B2C24]">

            {/* Main Grid — stacks on mobile, side-by-side on xl */}
            <div className="flex flex-col xl:flex-row gap-6">

                {/* Left Column — Revenue + Commissions */}
                <div className="flex-1 flex flex-col gap-6 min-w-0">

                    {/* Revenue Card */}
                    <div className="bg-white rounded-2xl border border-[#EDE3D9] p-5 sm:p-8 relative overflow-hidden shadow-sm">
                        <p className="text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase mb-3">
                            Total Customers
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#A37B5C] mb-4 sm:mb-5 tracking-tight">
                            {Allcustomer?.length}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <span className="text-[#BAA995] text-xs">Based on {TotalOrder.length} successful deliveries</span>
                        </div>
                        {/* Watermark — hidden on very small screens */}
                        <p className="absolute bottom-4 right-6 font-serif italic text-[#EDE3D9] text-2xl sm:text-4xl pointer-events-none select-none hidden sm:block">
                            {user?.username}
                        </p>
                    </div>

                    {/* Stat cards — show as 2-col row on mobile, hidden on xl (shown in right col) */}
                    <div className="grid grid-cols-2 gap-4 xl:hidden">
                        <div className="bg-white rounded-2xl border border-[#EDE3D9] px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase mb-1">Active Orders</p>
                                <p className="text-3xl sm:text-4xl font-bold text-[#2C1F14]">{TotalOrder.filter((order) => order.status === "pending").length}</p>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5F0EA] rounded-lg flex items-center justify-center flex-shrink-0">
                                <ShoppingBag size={18} className="text-[#A37B5C]" />
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-[#EDE3D9] px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase mb-1">Completed Orders</p>
                                <p className="text-3xl sm:text-4xl font-bold text-[#2C1F14]">{TotalOrder.filter((order) => order.status === "completed").length}</p>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5F0EA] rounded-lg flex items-center justify-center flex-shrink-0">
                                <MessageSquare size={18} className="text-[#A37B5C]" />
                            </div>
                        </div>
                    </div>

                    {/* Recent Commissions */}
                    <div className="bg-white rounded-2xl border border-[#EDE3D9] p-4 sm:p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2C1F14]">
                                Recent Commissions
                            </h3>
                            <button className="text-[10px] font-bold tracking-[0.15em] text-[#A37B5C] uppercase hover:text-[#7B5837] transition-colors whitespace-nowrap" onClick={() => navigate("/orders")}>
                                View All Orders
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {TotalOrder.map((order, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 sm:gap-5 p-3 sm:p-4 rounded-xl bg-[#FDFAF7] border border-[#EDE3D9] hover:border-[#C9AE94] transition-all duration-200"
                                >
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#EDE3D9]">
                                        <img
                                            src={`${baseUrl}/uploads/${order.products[0].productId.image}`}
                                            alt={order.userId.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-[#2C1F14] text-xs sm:text-sm mb-0.5 truncate">{order.userId.username}</p>
                                        <p className="text-[10px] sm:text-[11px] text-[#9B8C80] truncate">
                                            {order.userId.name}
                                            <span className="text-[#BAA995]"> • </span>
                                            <span className="italic">{order.products[0].productId.name}</span>
                                        </p>
                                        <div className="flex items-center gap-1.5 mt-1.5">
                                            <span
                                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: '#F5B942' }}
                                            />
                                            <span
                                                className="text-[9px] sm:text-[10px] font-bold tracking-[0.12em]"
                                                style={{ color: '#F5B942' }}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="font-bold text-[#2C1F14] text-xs sm:text-sm">₹{order.totalAmount}</p>
                                        <p className="text-[9px] sm:text-[10px] text-[#BAA995] tracking-wider">ORDER {order._id}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column — Stats + Quick Actions (desktop only full panel) */}
                <div className="xl:w-[280px] xl:flex-shrink-0 flex flex-col gap-4">

                    {/* Stat cards — only on xl */}
                    <div className="hidden xl:flex xl:flex-col gap-4">
                        <div className="bg-white rounded-2xl border border-[#EDE3D9] px-6 py-5 flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase mb-1">Active Orders</p>
                                <p className="text-4xl font-bold text-[#2C1F14]">{TotalOrder.filter((order) => order.status === "pending").length}</p>
                            </div>
                            <div className="w-12 h-12 bg-[#F5F0EA] rounded-lg flex items-center justify-center">
                                <ShoppingBag size={20} className="text-[#A37B5C]" />
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-[#EDE3D9] px-6 py-5 flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase mb-1">Completed Orders</p>
                                <p className="text-4xl font-bold text-[#2C1F14]">{TotalOrder.filter((order) => order.status === "completed").length}</p>
                            </div>
                            <div className="w-12 h-12 bg-[#F5F0EA] rounded-lg flex items-center justify-center">
                                <MessageSquare size={20} className="text-[#A37B5C]" />
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-[#F5F0EA] rounded-2xl border border-[#EDE3D9] p-4 sm:p-5 flex flex-col gap-3 shadow-sm">
                        <h4 className="font-bold text-[#2C1F14] text-base mb-1">Quick Actions</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3">
                            <button className="w-full flex items-center gap-3 bg-[#7B5837] hover:bg-[#6a4a2d] text-white rounded-xl px-4 py-3 transition-colors">
                                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <Plus size={16} />
                                </div>
                                <span className="text-[11px] font-bold tracking-[0.12em] uppercase" onClick={() => navigate("/add-product")}>New Product</span>
                            </button>
                            <button className="w-full flex items-center gap-3 bg-white hover:bg-[#FDF9F4] text-[#3B2C24] rounded-xl px-4 py-3 border border-[#EDE3D9] transition-colors">
                                <div className="w-7 h-7 rounded-lg bg-[#F5F0EA] flex items-center justify-center flex-shrink-0">
                                    <CalendarCheck size={16} className="text-[#A37B5C]" />
                                </div>
                                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#3B2C24]" onClick={() => navigate("/orders")}>Check Order</span>
                            </button>
                            <button className="w-full flex items-center gap-3 bg-white hover:bg-[#FDF9F4] text-[#3B2C24] rounded-xl px-4 py-3 border border-[#EDE3D9] transition-colors">
                                <div className="w-7 h-7 rounded-lg bg-[#F5F0EA] flex items-center justify-center flex-shrink-0">
                                    <Megaphone size={16} className="text-[#A37B5C]" />
                                </div>
                                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#3B2C24]" onClick={() => navigate("/products")}>Post Update</span>
                            </button>
                        </div>
                    </div>

                    {/* Artist's Note */}
                    <div className="bg-[#F5F0EA] rounded-2xl border border-[#EDE3D9] p-4 sm:p-5 shadow-sm">
                        <h4 className="font-serif italic text-[#A37B5C] text-base mb-3">Artist's Note</h4>
                        <blockquote className="text-xs text-[#6C5E53] italic leading-relaxed border-l-2 border-[#C9AE94] pl-3">
                            "Remember to check the curing room humidity today. Resin loves a dry sanctuary."
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;