import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Sidebar from './Sidebar'

function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const { user } = localStorage.getItem("user") /
    return (
        <div className="flex h-screen bg-[#FDFDFD] font-sans text-gray-800 overflow-hidden">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar — hidden on mobile, drawer on toggle */}
            <div className={`
                fixed inset-y-0 left-0 z-40 lg:static lg:z-auto
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:flex
            `}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white min-w-0">
                <Navbar onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto w-full">
                    <div className="min-h-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 py-6 mx-auto max-w-7xl">
                        <div className="flex-1">

                            <Outlet />
                        </div>
                        <Footer />
                    </div>
                </main>
            </div>
        </div>
    )
}
import { useData } from '../context/DataProvider'

export default Layout