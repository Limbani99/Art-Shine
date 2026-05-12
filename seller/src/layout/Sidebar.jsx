import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, LayoutDashboard, Box, ShoppingBag, Layers, Users, CalendarDays, Settings, Plus, ChevronDown, PlusCircle } from 'lucide-react'

function Sidebar({ onClose }) {
    const location = useLocation();

    // Independent states for each dropdown
    const [isProductOpen, setIsProductOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    // Sync dropdown state with current location on initial load and navigation
    useEffect(() => {
        if (location.pathname.includes('/products') || location.pathname.includes('/add-product') || location.pathname.includes('/update-product')) {
            setIsProductOpen(true);
        }
        if (location.pathname.includes('/category') || location.pathname.includes('/add-category') || location.pathname.includes('/update-category')) {
            setIsCategoryOpen(true);
        }
    }, [location.pathname]);

    const menuItems = [
        { name: 'DASHBOARD', path: '/', icon: LayoutDashboard },
        {
            name: 'PRODUCT MANAGEMENT',
            icon: Box,
            isOpen: isProductOpen,
            setOpen: setIsProductOpen,
            subItems: [
                { name: 'ALL PRODUCTS', path: '/products', icon: Box },
                { name: 'ADD PRODUCT', path: '/add-product', icon: PlusCircle },
            ]
        },
        { name: 'ORDER MANAGEMENT', path: '/orders', icon: ShoppingBag },
        {
            name: 'CATEGORY MANAGEMENT',
            icon: Layers,
            isOpen: isCategoryOpen,
            setOpen: setIsCategoryOpen,
            subItems: [
                { name: 'ALL CATEGORIES', path: '/category', icon: Layers },
                { name: 'ADD CATEGORY', path: '/add-category', icon: PlusCircle },
            ]
        },
        { name: 'CUSTOMER MANAGEMENT', path: '/customer', icon: Users },
        { name: 'CHAT', path: '/chat', icon: CalendarDays },
        { name: 'PROFILE SETTINGS', path: '/profile', icon: Settings },
    ];

    return (
        <aside className="w-64 lg:w-72 bg-[#F8F5F0] h-full flex flex-col border-r border-[#ECE7DF] shrink-0">
            {/* Header */}
            <div className="p-6 lg:p-8 pb-4 pt-8 lg:pt-10 flex items-start justify-between">
                <div>
                    <h1 className="text-xl lg:text-2xl font-serif text-[#815B3A] font-bold tracking-tight">Artisan Glow</h1>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mt-2 font-black opacity-80">
                        Seller Portal
                    </p>
                </div>
                {/* Close button — mobile only */}
                <button
                    onClick={onClose}
                    className="lg:hidden p-1.5 text-[#815B3A] hover:bg-[#EBE5DC] rounded-full transition-all active:scale-95"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 mt-6 overflow-y-auto scrollbar-hide px-4 lg:px-6">
                <ul className="space-y-1.5">
                    {menuItems.map((item) => {
                        const isGroup = !!item.subItems;
                        const isSectionActive = isGroup
                            ? item.subItems.some(sub => location.pathname.includes(sub.path))
                            : location.pathname === item.path || (location.pathname === '/' && item.name === 'DASHBOARD');

                        if (isGroup) {
                            return (
                                <li key={item.name} className="flex flex-col">
                                    <button
                                        onClick={() => item.setOpen(!item.isOpen)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-[10px] lg:text-[11px] font-bold tracking-widest group ${isSectionActive && !item.isOpen
                                            ? 'bg-[#916A46] text-white shadow-lg shadow-[#916A46]/20'
                                            : 'text-[#5C5C5C] hover:bg-[#EBE5DC] hover:text-[#222]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 lg:gap-4">
                                            <item.icon size={16} className={`transition-colors duration-300 ${isSectionActive && !item.isOpen ? 'text-white' : 'text-gray-400 group-hover:text-[#815B3A]'}`} />
                                            <span className="leading-tight">{item.name}</span>
                                        </div>
                                        <ChevronDown size={14} className={`transition-transform duration-500 ease-in-out ${item.isOpen ? 'rotate-180' : 'opacity-40'}`} />
                                    </button>

                                    {/* Dropdown with Grid Animation */}
                                    <div
                                        className={`grid transition-all duration-500 ease-in-out ${item.isOpen ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}
                                    >
                                        <ul className="overflow-hidden space-y-1">
                                            {item.subItems.map((sub) => {
                                                const isSubActive = location.pathname.includes(sub.path);
                                                return (
                                                    <li key={sub.name} className="pl-4">
                                                        <Link
                                                            to={sub.path}
                                                            onClick={onClose}
                                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[9px] lg:text-[10px] font-bold tracking-widest transition-all duration-300 ${isSubActive
                                                                ? 'text-[#916A46] bg-[#916A46]/5'
                                                                : 'text-[#888] hover:text-[#5C5C5C] hover:translate-x-1'
                                                                }`}
                                                        >
                                                            <div className={`w-1 h-1 rounded-full ${isSubActive ? 'bg-[#916A46] scale-100' : 'bg-transparent scale-0'} transition-transform duration-300`}></div>
                                                            <span className="flex-1">{sub.name}</span>
                                                            {sub.name.includes('ADD') && <Plus size={10} className="opacity-40" />}
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </li>
                            );
                        }

                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 lg:gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-[10px] lg:text-[11px] font-bold tracking-widest group ${isSectionActive
                                        ? 'bg-[#916A46] text-white shadow-lg shadow-[#916A46]/20'
                                        : 'text-[#5C5C5C] hover:bg-[#EBE5DC] hover:text-[#222]'
                                        }`}
                                >
                                    <item.icon size={16} className={`transition-colors duration-300 ${isSectionActive ? 'text-white' : 'text-gray-400 group-hover:text-[#815B3A]'}`} />
                                    <span className="leading-tight">{item.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Bottom Actions */}
            <div className="p-6 lg:p-8 space-y-3 mt-auto border-t border-[#ECE7DF]/50 bg-[#F8F5F0]/80 backdrop-blur-sm">
                <button className="w-full py-3 px-4 border border-[#DCCCBA] rounded-xl text-[#815B3A] text-xs font-bold tracking-[0.15em] hover:bg-white transition-all active:scale-95">
                    VIEW GALLERY
                </button>
            </div>
        </aside>
    )
}

export default Sidebar