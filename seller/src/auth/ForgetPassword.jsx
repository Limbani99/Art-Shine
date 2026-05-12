import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

function ForgetPassword() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/api/seller/forget-password`, { email });
            console.log(res.data);
            toast.success("Password reset link sent successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to send password reset link");
        }
    }

    return (
        <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#fdfaf6]">

            {/* LEFT COLUMN: Visual Hero (Hidden on smaller screens, or stacked) */}
            <div className="relative w-full h-[300px] lg:h-screen bg-[#111] overflow-hidden lg:order-1 order-2 hidden md:block">
                <img
                    src="https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?w=1200&h=1600&fit=crop"
                    alt="Amber glowing resin art"
                    className="w-full h-full object-cover opacity-90 mix-blend-lighten scale-[1.1] md:scale-[1.05]"
                />

                {/* Branding Overlay */}
                <div className="absolute top-8 left-10 lg:top-12 lg:left-14 z-10 pointer-events-none">
                    <h1 className="text-white font-serif text-3xl tracking-tight select-none drop-shadow-md">
                        Art Shine
                    </h1>
                </div>

                {/* Glassmorphism Quote Box pinned to bottom right inside image container */}
                <div className="absolute bottom-10 right-10 lg:bottom-16 lg:right-16 bg-[#e8dccb]/[0.85] backdrop-blur-md px-10 py-8 lg:px-14 lg:py-10 max-w-[360px] rounded shadow-2xl overflow-hidden border border-white/20">
                    {/* The absolute cursive text acting almost like a watermark */}
                    <p className="font-serif italic text-[17px] leading-relaxed text-[#3d2e1f] relative z-10 text-center mt-3">
                        "Rediscover your access to the preservation suite."
                    </p>
                </div>
            </div>

            {/* RIGHT COLUMN: Auth Form */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 min-h-screen lg:h-auto overflow-y-auto w-full lg:order-2 order-1 relative">
                <div className="w-full max-w-[420px] mx-auto flex flex-col flex-1 justify-center">

                    <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#a87a52] mb-4 drop-shadow-sm">
                        Account Recovery
                    </p>
                    <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] text-[#1a1c21] font-bold mb-6 tracking-tight">
                        Reset<br />Access
                    </h2>
                    <p className="text-sm font-medium text-[#6c5e53] mb-12">
                        Enter the email address associated with your Art Shine account. We will send you a secure link to reset your password.
                    </p>

                    <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>

                        <div className="flex flex-col gap-2 relative">
                            <label className="text-[10px] uppercase tracking-[0.1em] font-medium text-[#c08f65]">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border border-[#e8dccb] px-4 py-3.5 text-sm font-sans tracking-wide text-[#3d2e1f] placeholder-[#c4b9aa] focus:outline-none focus:border-[#a87a52] hover:bg-white/50 transition-colors rounded-sm shadow-sm"
                            />
                        </div>

                        <button type="submit" className="bg-[#a87a52] hover:bg-[#8e613b] transition-colors text-white mt-2 w-full py-4 text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-md flex justify-center items-center gap-2">
                            Send Reset Link &rarr;
                        </button>

                    </form>

                    <div className="text-center mt-12 mb-8">
                        <p className="text-[12px] font-medium text-[#645c53]">
                            Remembered your password? <Link to="/login" className="text-[#8e613b] font-bold hover:text-[#a87a52] transition-colors">Return to Sign In</Link>
                        </p>
                    </div>

                </div>

                {/* Internal Column Footer */}
                <div className="w-full max-w-[420px] mx-auto mt-auto flex items-center justify-between text-[8px] uppercase tracking-[0.2em] font-bold text-[#b0a395] pt-12">
                    <span>&copy; 2024 ART SHINE</span>
                    <div className="flex items-center gap-3 opacity-60">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ForgetPassword
