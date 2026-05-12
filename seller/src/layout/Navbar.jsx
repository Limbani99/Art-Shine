import React from 'react'
import { Bell, LogOut, LogIn, Menu } from 'lucide-react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataProvider'
import toast from 'react-hot-toast'

function Navbar({ onMenuClick }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useData() || {};

    const pageTitles = {
        dashboard: 'Dashboard',
        profile: 'Profile Settings',
        products: 'Product Management',
        orders: 'Order Management',
        category: 'Category Management',
        customer: 'Customer Management',
        booking: 'Enquiry / Booking',
    };

    const title = Object.entries(pageTitles).find(([key]) =>
        location.pathname.includes(key)
    )?.[1] || 'Profile Settings';

    const handleLogout = () => {
        if (logout) logout();
        toast.success("Logged out successfully");
        navigate("/seller/login");
    }

    return (
        <header className="py-2 sm:py-2 lg:py-2 px-4 sm:px-6 lg:px-10 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20 shrink-0 border-b border-[#F0EBE3]">
            <div className="flex items-center gap-3">
                {/* Hamburger — mobile only */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-[#815B3A] hover:bg-[#F5F0EA] rounded-lg transition-colors"
                >
                    <Menu size={22} />
                </button>

                <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#BAA995] uppercase mb-0.5 hidden sm:block">
                        Art Shine Studio
                    </p>
                    <h2 className="text-xl sm:text-2xl lg:text-[32px] font-serif italic text-[#815B3A] font-bold leading-tight">
                        {title}
                    </h2>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
                <button className="text-[#815B3A] hover:text-[#6a482b] transition-colors relative">
                    <Bell size={20} className="fill-[#815B3A]" />
                </button>

                {user ? (
                    <div className="relative group">
                        <div className="w-9 h-9 sm:w-[42px] sm:h-[42px] rounded-xl bg-[#F26430] overflow-hidden flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow cursor-pointer border border-[#F26430]">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'ArtisanGlow'}`}
                                alt="User Avatar"
                                className="w-full h-full object-cover scale-110"
                            />
                        </div>
                        {/* Dropdown for Logout on Hover */}
                        <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <div className="bg-white border border-[#E8DCCB] shadow-2xl rounded-sm p-2 w-48 flex flex-col gap-1 relative before:content-[''] before:absolute before:-top-2 before:right-4 before:border-l-[8px] before:border-l-transparent before:border-r-[8px] before:border-r-transparent before:border-b-[8px] before:border-b-white before:drop-shadow-[0_-2px_2px_rgba(0,0,0,0.05)]">
                                <div className="px-3 py-2 border-b border-[#E8DCCB] mb-1">
                                    <p className="text-[12px] font-bold text-[#815B3A] truncate">{user?.username || 'Art Shine'}</p>
                                    <p className="text-[9px] uppercase tracking-[0.1em] text-[#BAA995] truncate">{user?.email || 'Seller'}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#FDF9F3] text-[#815B3A] text-xs font-bold uppercase tracking-[0.1em] transition-colors rounded-sm text-left w-full"
                                >
                                    <LogOut size={14} /> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link
                        to="/seller/login"
                        className="flex items-center gap-2 bg-[#815B3A] hover:bg-[#6a482b] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-sm shadow-md transition-colors text-[10px] uppercase tracking-[0.2em] font-bold"
                    >
                        <LogIn size={14} />
                        <span className="hidden sm:inline">Login</span>
                    </Link>
                )}
            </div>
        </header>
    )
}

export default Navbar