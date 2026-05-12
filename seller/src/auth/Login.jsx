import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useData } from '../context/DataProvider';

function Login() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    const [form, setform] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const { login } = useData();

    const handlechange = (e) => {
        const { name, value } = e.target;

        setform(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        setError(prev => ({
            ...prev,
            [name]: ""
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        let newError = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        // Validation
        if (!form.email) {
            newError.email = "is required";
        } else if (!emailRegex.test(form.email)) {
            newError.email = "Enter valid email address";
        }

        if (!form.password) {
            newError.password = "is required";
        }

        // Stop if error exists
        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }

        try {
            const res = await axios.post(`${baseUrl}/api/seller/login`, form);
            login(res.data.data, res.data.token);
            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Login failed");
        }
    };

    return (
        <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#fdfaf6]">

            {/* LEFT COLUMN */}
            <div className="relative w-full h-[300px] lg:h-screen bg-[#111] overflow-hidden lg:order-1 order-2 hidden md:block">
                <img
                    src="/images/auth_pyramid.png"
                    alt="Art Shine"
                    className="w-full h-full object-cover opacity-90 mix-blend-lighten scale-[1.1] md:scale-[1.05]"
                />

                <div className="absolute top-8 left-10 lg:top-12 lg:left-14 z-10">
                    <h1 className="text-white font-serif text-3xl tracking-tight drop-shadow-md">
                        Art Shine
                    </h1>
                </div>

                <div className="absolute bottom-10 right-10 lg:bottom-16 lg:right-16 bg-[#e8dccb]/[0.85] backdrop-blur-md px-10 py-8 lg:px-14 lg:py-10 max-w-[360px] rounded shadow-2xl border border-white/20">
                    <h3 className="absolute -top-3 left-4 font-serif italic text-4xl text-[#a87a52]/60 -rotate-6">
                        Handcrafted
                    </h3>
                    <p className="font-serif italic text-[17px] text-[#3d2e1f] text-center mt-3">
                        "Captured in a moment, preserved for a lifetime."
                    </p>
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 min-h-screen w-full lg:order-2 order-1">

                <div className="w-full max-w-[420px]">

                    <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#a87a52] mb-4">
                        The Preservation Gallery
                    </p>

                    <h2 className="font-serif text-4xl sm:text-5xl text-[#1a1c21] font-bold mb-12">
                        Welcome<br />Back
                    </h2>

                    <form className="flex flex-col gap-6" onSubmit={handlesubmit}>

                        {/* EMAIL */}
                        <div className="flex flex-col gap-1">

                            <div className="flex justify-between items-center">
                                <label className="text-[10px] uppercase text-[#c08f65]">
                                    Email Address * <span className="text-red-500"> {error.email && (
                                        <span className="text-red-500 text-[10px]">
                                            {error.email}
                                        </span>
                                    )}</span>
                                </label>


                            </div>

                            <input
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={handlechange}
                                placeholder="Enter your email"
                                className="border border-[#e8dccb] px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#a87a52]"
                            />

                        </div>

                        {/* PASSWORD */}
                        <div className="flex flex-col gap-1">

                            <div className="flex justify-between items-center">

                                <label className="text-[10px] uppercase text-[#c08f65]">
                                    Password * <span> {error.password && (
                                        <span className="text-red-500 text-[10px]">
                                            {error.password}
                                        </span>
                                    )}</span>
                                </label>



                            </div>

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handlechange}
                                placeholder="Enter your password"
                                className="border border-[#e8dccb] px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#a87a52]"
                            />

                        </div>

                        {/* BUTTON */}
                        <button className="bg-[#a87a52] hover:bg-[#8e613b] text-white py-3 text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm">
                            Login →
                        </button>

                    </form>

                    <div className="text-center mt-8">
                        <p className="text-[12px] text-[#645c53]">
                            New to Art Shine?{" "}
                            <Link to="/register" className="text-[#8e613b] font-bold">
                                Create an Account
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;