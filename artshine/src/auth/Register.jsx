import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Register() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [form, setform] = useState({ username: "", email: "", password: "", address: "", phone: "" })
  const navigate = useNavigate()

  const handlechange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/api/users/register`, form)
      toast.success("User registered successfully")
      navigate("/login")
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong")
    }

  }
  return (
    <div className="w-full min-h-screen bg-[#fdfaf6] flex flex-col pt-0">

      {/* Main Split Interface Area */}
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT COLUMN: Visual Frame (Stacked on mobile) */}
        <div className="relative w-full h-[320px] sm:h-[400px] lg:h-auto overflow-hidden lg:order-1 order-2 border-b lg:border-b-0 border-[#e8dccb]">
          <img
            src="/images/gallery_hydrangea.png"
            alt="Hydrangea suspended beautifully"
            className="w-full h-full object-cover opacity-90 contrast-125"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

          {/* Branding Content */}
          <div className="absolute inset-0 flex flex-col items-start justify-center text-left p-6 sm:p-10 lg:pl-[4.5rem] z-10 w-full mb-10 sm:mb-16">
            <h1 className="text-white font-serif text-3xl sm:text-5xl lg:text-[4.5rem] font-bold mb-1 sm:mb-2 drop-shadow-lg tracking-tight leading-tight">
              Art Shine
            </h1>
            <h2 className="text-white/95 font-serif italic text-lg sm:text-2xl lg:text-[28px] mb-4 sm:mb-8 drop-shadow-md">
              The Curated Preservation
            </h2>
            <div className="w-12 sm:w-20 h-[1px] bg-white/40 mb-4 sm:mb-8"></div>
            <p className="font-sans italic text-sm sm:text-[16px] lg:text-[18px] leading-[1.6] sm:leading-[1.7] text-white/90 max-w-[300px] sm:max-w-[340px] drop-shadow-md">
              "Every petal tells a story of a moment suspended in time. Join our community of collectors and creators."
            </p>
          </div>

          {/* Badge box (Hidden on very small screens, visible on tablets/desktop) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:bottom-16 bg-[#e8dccb]/[0.15] backdrop-blur-md px-6 py-4 sm:px-8 sm:py-6 w-[85%] lg:w-[360px] rounded shadow-[0_0_40px_10px_rgba(255,255,255,0.05)] border border-white/20 z-20 hidden sm:block">
            <Sparkles className="text-white w-4 h-4 sm:w-5 sm:h-5 mb-3 sm:mb-4 drop-shadow-xl" fill="white" />
            <p className="font-sans text-[10px] sm:text-[12px] font-medium tracking-wide leading-[1.6] text-white/90 drop-shadow-lg">
              Handcrafted with over 120 hours of<br className="hidden sm:block" />meticulous curing and polishing for<br className="hidden sm:block" /><span className="text-white font-bold opacity-100">every bespoke piece.</span>
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Registration Form (Top on mobile) */}
        <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 lg:py-0 w-full lg:order-2 order-1 relative z-10">
          <div className="w-full max-w-[420px] mx-auto z-10 py-10 sm:py-16">

            <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#a87a52] mb-3 sm:mb-4">
              Step Into The Gallery
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[4rem] text-[#1a1c21] font-bold mb-4 sm:mb-6 tracking-tight leading-tight sm:leading-none">
              Join the Studio
            </h2>
            <p className="text-[#645c53] font-sans text-sm sm:text-[14px] leading-relaxed mb-8 sm:mb-12">
              Create an account to start preserving your memories.
            </p>

            <form className="flex flex-col gap-5 sm:gap-6 w-full" onSubmit={handlesubmit}>

              <div className="flex flex-col gap-1.5 relative">
                <label className="text-[10px] sm:text-[11px] font-bold text-[#c08f65] uppercase">Full Name</label>
                <input
                  type="text"
                  placeholder="Eleanor Rigby"
                  value={form.username}
                  name='username'
                  onChange={handlechange}
                  className="w-full bg-transparent border-b border-[#e8dccb] py-3 text-sm font-sans tracking-wide text-[#3d2e1f] placeholder-[#c4b9aa] focus:outline-none focus:border-[#a87a52] transition-colors rounded-none min-h-[44px]"
                />
              </div>
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-[10px] sm:text-[11px] font-bold text-[#c08f65] uppercase">Email Address</label>
                <input
                  type="email"
                  placeholder="eleanor@studio.art"
                  value={form.email}
                  name='email'
                  onChange={handlechange}
                  className="w-full bg-transparent border-b border-[#e8dccb] py-3 text-sm font-sans tracking-wide text-[#3d2e1f] placeholder-[#c4b9aa] focus:outline-none focus:border-[#a87a52] transition-colors rounded-none min-h-[44px]"
                />
              </div>
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-[10px] sm:text-[11px] font-bold text-[#c08f65] uppercase">Secure Password</label>
                <input
                  type="password"
                  placeholder="••••••••••"
                  value={form.password}
                  name='password'
                  onChange={handlechange}
                  className="w-full bg-transparent border-b border-[#e8dccb] py-3 text-sm font-sans tracking-widest text-[#3d2e1f] placeholder-[#c4b9aa] focus:outline-none focus:border-[#a87a52] transition-colors rounded-none min-h-[44px]"
                />
              </div>
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-[10px] sm:text-[11px] font-bold text-[#c08f65] uppercase">Mailing Address</label>
                <input
                  type="text"
                  value={form.address}
                  name='address'
                  onChange={handlechange}
                  placeholder="123 Main St, City, Country"
                  className="w-full bg-transparent border-b border-[#e8dccb] py-3 text-sm font-sans tracking-wide text-[#3d2e1f] placeholder-[#c4b9aa] focus:outline-none focus:border-[#a87a52] transition-colors rounded-none min-h-[44px]"
                />
              </div>
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-[10px] sm:text-[11px] font-bold text-[#c08f65] uppercase">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  name='phone'
                  onChange={handlechange}
                  placeholder="+91 00000 00000"
                  className="w-full bg-transparent border-b border-[#e8dccb] py-3 text-sm font-sans tracking-wide text-[#3d2e1f] placeholder-[#c4b9aa] focus:outline-none focus:border-[#a87a52] transition-colors rounded-none min-h-[44px]"
                />
              </div>

              {/* Checked Agreement */}
              <div className="flex items-start gap-4 mt-2">
                <input type="checkbox" id="terms" className="w-5 h-5 cursor-pointer accent-[#a87a52] shrink-0 mt-0.5" required />
                <label htmlFor="terms" className="text-xs text-[#645c53] cursor-pointer leading-relaxed">
                  I agree to the <Link to="#" className="underline underline-offset-2 decoration-[#b0a395] hover:text-[#a87a52] transition-colors font-semibold">Terms of Service</Link> and <Link to="#" className="underline underline-offset-2 decoration-[#b0a395] hover:text-[#a87a52] transition-colors font-semibold">Privacy Policy</Link>.
                </label>
              </div>

              <button className="bg-[#a87a52] hover:bg-[#8e613b] transition-colors text-white mt-6 w-full py-4 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold rounded-sm shadow-xl flex justify-center items-center gap-2 min-h-[56px]">
                Create My Account &rarr;
              </button>

              <div className="text-center mt-8 mb-4">
                <p className="text-xs sm:text-[13px] font-sans text-[#645c53]">
                  Already a member? <Link to="/login" className="text-[#8e613b] font-bold hover:text-[#a87a52] transition-colors underline underline-offset-4 ml-1">Log Into Studio</Link>
                </p>
              </div>

            </form>

          </div>

        </div>

      </div>


    </div>
  )
}

export default Register