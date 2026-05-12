import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useData } from '../context/DataProvider';

function Login() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [form, setform] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const { login } = useData();
  const handlechange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value })
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/api/users/login`, form);
      login(res.data.data, res.data.token)
      toast.success("login done")
      navigate("/")
    } catch (error) {
      console.log(error);
      toast.error("login failed")
    }
  }

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#fdfaf6]">

      {/* LEFT COLUMN: Visual Hero (Stacked on mobile, side-by-side on desktop) */}
      <div className="relative w-full h-[320px] sm:h-[400px] lg:h-screen bg-[#111] overflow-hidden lg:order-1 order-2">
        <img
          src="/images/auth_pyramid.png"
          alt="Amber glowing resin pyramid"
          className="w-full h-full object-cover opacity-90 mix-blend-lighten scale-[1.1] md:scale-[1.05]"
        />

        {/* Branding Overlay */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-10 lg:top-12 lg:left-14 z-10 pointer-events-none">
          <h1 className="text-white font-serif text-2xl sm:text-3xl tracking-tight select-none drop-shadow-md">
            Art Shine
          </h1>
        </div>

        {/* Glassmorphism Quote Box - Adjusted for mobile */}
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 lg:bottom-16 lg:right-16 bg-[#e8dccb]/[0.85] backdrop-blur-md px-6 py-5 sm:px-10 sm:py-8 lg:px-14 lg:py-10 max-w-[280px] sm:max-w-[360px] rounded shadow-2xl overflow-hidden border border-white/20">
          <h3 className="absolute -top-3 left-4 font-serif italic text-2xl sm:text-4xl text-[#a87a52]/60 select-none pointer-events-none -rotate-6">
            Handcrafted
          </h3>
          <p className="font-serif italic text-sm sm:text-[17px] leading-relaxed text-[#3d2e1f] relative z-10 text-center mt-3">
            "Captured in a moment, preserved for a lifetime."
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: Auth Form (Top on mobile) */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 lg:h-screen overflow-y-auto w-full lg:order-2 order-1 relative">
        <div className="w-full max-w-[420px] mx-auto flex flex-col flex-1 justify-center py-10 sm:py-0">

          <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#a87a52] mb-3 sm:mb-4 drop-shadow-sm">
            The Preservation Gallery
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] sm:leading-[1.05] text-[#1a1c21] font-bold mb-8 sm:mb-12 lg:mb-16 tracking-tight">
            Welcome<br className="hidden sm:block" />
            Back
          </h2>

          <form className="flex flex-col gap-6 sm:gap-8 w-full" onSubmit={handlesubmit}>

            <div className="flex flex-col gap-2 relative">
              <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#c08f65]">Email Address</label>
              <input
                type="email"
                placeholder="email@gmail.com"
                name="email"
                value={form.email}
                onChange={handlechange}
                className="w-full bg-transparent border border-[#e8dccb] px-4 py-3.5 sm:py-4 text-sm font-sans tracking-wide text-[#3d2e1f] placeholder-[#c4b9aa] focus:outline-none focus:border-[#a87a52] hover:bg-white/50 transition-colors rounded-sm shadow-sm min-h-[44px]"
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <div className="flex justify-between items-center w-full">
                <label className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#c08f65]">Password</label>
                <Link to="#" className="text-[9px] uppercase tracking-[0.1em] text-[#b0a395] hover:text-[#a87a52] transition-colors py-1">Forgot Password?</Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                name="password"
                value={form.password}
                onChange={handlechange}
                className="w-full bg-transparent border border-[#e8dccb] px-4 py-3.5 sm:py-4 text-sm font-sans tracking-widest text-[#3d2e1f] placeholder-[#c4b9aa] focus:outline-none focus:border-[#a87a52] hover:bg-white/50 transition-colors rounded-sm shadow-sm min-h-[44px]"
              />
            </div>

            <button className="bg-[#a87a52] hover:bg-[#8e613b] transition-colors text-white mt-4 w-full py-4 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-md flex justify-center items-center gap-2 min-h-[56px]">
              Sign In &rarr;
            </button>

          </form>

          <div className="text-center mt-10 sm:mt-12 mb-8">
            <p className="text-xs sm:text-[12px] font-medium text-[#645c53]">
              New to Art Shine? <Link to="/register" className="text-[#8e613b] font-bold hover:text-[#a87a52] transition-colors underline underline-offset-4">Create an Account</Link>
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

export default Login