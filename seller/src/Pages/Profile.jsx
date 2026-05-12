import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { useData } from '../context/DataProvider';
function Toggle({ checked, onChange }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none flex-shrink-0 ${checked ? 'bg-[#7B5837]' : 'bg-[#D6C9BC]'
                }`}
        >
            <span
                className={`inline-block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'
                    }`}
            />
        </button>
    );
}

function Profile() {
    const { user } = useData()
    console.log(user)
    const [notifications, setNotifications] = useState({
        newOrders: true,
        enquiries: true,
        newsletter: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="font-sans text-[#3B2C24]">

            {/* Two-column on lg+, stacked on mobile */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

                {/* Left — Studio Vision Card (full width on mobile, fixed on desktop) */}
                <div className="w-full lg:w-[220px] lg:flex-shrink-0">
                    <div className="bg-[#F5F0EA] rounded-2xl border border-[#EDE3D9] p-5 overflow-hidden relative">
                        <p className="absolute top-4 right-3 font-serif italic text-[#D9CBBF] text-sm rotate-12 pointer-events-none select-none">
                            Preserving Joy
                        </p>
                        <h3 className="font-serif italic text-[#7B5837] text-xl mb-3 leading-tight">
                            The Studio Vision
                        </h3>
                        <p className="text-[11px] text-[#6C5E53] leading-relaxed mb-5">
                            Your studio profile is the heart of your brand. Keep your information updated to ensure collectors feel the personal touch behind every resin piece.
                        </p>
                        <div className="rounded-xl overflow-hidden h-[140px] sm:h-[180px] lg:h-[140px] w-full">
                            <img
                                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center"
                                alt="Studio art preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Right — Form */}
                <div className="flex-1 min-w-0 flex flex-col gap-8">

                    {/* ── Studio Information ── */}
                    <section>
                        <p className="text-[10px] font-bold tracking-[0.18em] text-[#A37B5C] uppercase mb-1">
                            Workspace
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-serif text-[#2C1F14] mb-5">
                            Studio Information
                        </h2>

                        {/* Studio Name + Location — side-by-side on sm+ */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-5">
                            <div className="flex-1">
                                <label className="block text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase mb-2">
                                    Studio Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Art Shine Creations"
                                    className="w-full bg-white border border-[#EDE3D9] rounded-lg px-4 py-3 text-sm text-[#3B2C24] placeholder-[#BAA995] focus:outline-none focus:border-[#A37B5C] transition-colors"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Portland, Oregon"
                                    className="w-full bg-white border border-[#EDE3D9] rounded-lg px-4 py-3 text-sm text-[#3B2C24] placeholder-[#BAA995] focus:outline-none focus:border-[#A37B5C] transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase mb-2">
                                Artist Bio
                            </label>
                            <textarea
                                rows={3}
                                defaultValue="Specializing in botanical preservation and custom resin heirlooms. Capturing the ephemeral beauty of nature since 2018."
                                className="w-full bg-white border border-[#EDE3D9] rounded-lg px-4 py-3 text-sm text-[#3B2C24] placeholder-[#BAA995] focus:outline-none focus:border-[#A37B5C] transition-colors resize-none"
                            />
                        </div>
                    </section>

                    <div className="border-t border-[#EDE3D9]" />

                    {/* ── Account Access ── */}
                    <section>
                        <p className="text-[10px] font-bold tracking-[0.18em] text-[#A37B5C] uppercase mb-1">
                            Security
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-serif text-[#2C1F14] mb-5">
                            Account Access
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                            <div className="flex-1">
                                <label className="block text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    defaultValue="artisan@artshine.com"
                                    className="w-full bg-white border border-[#EDE3D9] rounded-lg px-4 py-3 text-sm text-[#3B2C24] placeholder-[#BAA995] focus:outline-none focus:border-[#A37B5C] transition-colors"
                                />
                            </div>
                            <div className="flex-1 relative">
                                <label className="block text-[10px] font-bold tracking-[0.15em] text-[#BAA995] uppercase mb-2">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    defaultValue="securepassword123"
                                    className="w-full bg-white border border-[#EDE3D9] rounded-lg px-4 py-3 pr-10 text-sm text-[#3B2C24] placeholder-[#BAA995] focus:outline-none focus:border-[#A37B5C] transition-colors tracking-widest"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(p => !p)}
                                    className="absolute right-3 bottom-3 text-[#BAA995] hover:text-[#7B5837] transition-colors"
                                >
                                    <Pencil size={15} />
                                </button>
                            </div>
                        </div>
                    </section>

                    <div className="border-t border-[#EDE3D9]" />

                    {/* ── Notification Preferences ── */}
                    <section>
                        <p className="text-[10px] font-bold tracking-[0.18em] text-[#A37B5C] uppercase mb-1">
                            Preferences
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-serif text-[#2C1F14] mb-5">
                            Notifications
                        </h2>

                        <div className="flex flex-col gap-5">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-[#2C1F14] mb-0.5">New Order Alerts</p>
                                    <p className="text-[11px] text-[#9B8C80] leading-relaxed">
                                        Receive email notification when a customer places an order
                                    </p>
                                </div>
                                <Toggle
                                    checked={notifications.newOrders}
                                    onChange={(val) => setNotifications(n => ({ ...n, newOrders: val }))}
                                />
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-[#2C1F14] mb-0.5">Customer Enquiries</p>
                                    <p className="text-[11px] text-[#9B8C80] leading-relaxed">
                                        Get notified when a potential buyer asks about custom work
                                    </p>
                                </div>
                                <Toggle
                                    checked={notifications.enquiries}
                                    onChange={(val) => setNotifications(n => ({ ...n, enquiries: val }))}
                                />
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-[#2C1F14] mb-0.5">Studio Newsletter</p>
                                    <p className="text-[11px] text-[#9B8C80] leading-relaxed">
                                        Updates on new features and marketplace opportunities
                                    </p>
                                </div>
                                <Toggle
                                    checked={notifications.newsletter}
                                    onChange={(val) => setNotifications(n => ({ ...n, newsletter: val }))}
                                />
                            </div>
                        </div>
                    </section>

                    {/* ── Action Buttons ── */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 pb-4">
                        <button
                            type="button"
                            className="bg-[#7B5837] hover:bg-[#6a4a2d] text-white text-[11px] font-bold tracking-[0.15em] uppercase px-8 py-3.5 rounded-lg transition-colors shadow-sm text-center"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#9B8C80] hover:text-[#3B2C24] px-6 py-3.5 transition-colors text-center"
                        >
                            Discard
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;