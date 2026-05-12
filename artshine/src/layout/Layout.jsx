import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import AnimationWrapper from './AnimationWrapper'

function Layout() {
    return (
        <AnimationWrapper>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow w-full">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </AnimationWrapper>
    )
}

export default Layout