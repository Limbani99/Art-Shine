import React, { useEffect, useState } from 'react'
import { useData } from '../../context/DataProvider'
import axios from 'axios'
import { User, Mail, Phone, MapPin, Package, Clock, CheckCircle2, XCircle, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Profile() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const { user, logout } = useData()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetchOrders()
        } else {
            setLoading(false)
        }
    }, [user])

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/order/user/${user._id}`)
            setOrders(res.data.data)
        } catch (error) {
            console.log(error)
            toast.error("Failed to load orders")
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        logout()
        toast.success("Logged out successfully")
        navigate('/')
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 className="w-4 h-4 text-green-600" />
            case 'pending':
                return <Clock className="w-4 h-4 text-orange-500" />
            case 'cancelled':
                return <XCircle className="w-4 h-4 text-red-500" />
            default:
                return <Clock className="w-4 h-4 text-[#a87a52]" />
        }
    }

    if (!user && !loading) {
        return (
            <div className="w-full min-h-[60vh] bg-[#fdfaf6] flex items-center justify-center px-6">
                <div className="text-center">
                    <h2 className="font-serif text-3xl md:text-4xl text-[#3d2e1f] mb-4">Not Logged In</h2>
                    <p className="text-[#887a6d] mb-8 font-sans">Please sign in to view your profile and order history.</p>
                    <button 
                        onClick={() => navigate('/login')}
                        className="bg-[#a87a52] text-white px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#8e613b] transition-colors"
                    >
                        Sign In Now
                    </button>
                </div>
            </div>
        )
    }

    return (
        <section className="w-full bg-[#fdfaf6] min-h-screen px-4 sm:px-10 md:px-16 pt-12 sm:pt-16 md:pt-20 pb-16">
            <div className="max-w-[1300px] mx-auto w-full">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#e8dccb] pb-6 mb-8 sm:mb-12 gap-6">
                    <div>
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1a1c21] font-bold tracking-tight mb-2">My Profile</h1>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#b0a395]">
                            Manage your information and orders
                        </p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-[#887a6d] hover:text-[#a87a52] transition-colors min-h-[44px]"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>

                {loading ? (
                    <div className="w-full h-40 flex items-center justify-center">
                        <div className="animate-pulse w-8 h-8 rounded-full bg-[#a87a52]/30"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
                        
                        {/* LEFT COLUMN: User Info */}
                        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
                            <div className="w-full bg-white border border-[#e8dccb] rounded p-6 sm:p-8 shadow-sm">
                                <div className="flex flex-col items-center mb-6 sm:mb-8 border-b border-[#e8dccb] pb-6">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#faeed8] mb-4 overflow-hidden border border-[#a87a52]/20">
                                        <img src={user.userImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <h2 className="font-serif text-xl sm:text-2xl text-[#3d2e1f] font-bold mb-1">{user.username}</h2>
                                    <span className="text-[9px] uppercase tracking-widest text-[#a87a52] font-bold bg-[#faeed8] px-3 py-1 rounded">
                                        {user.role}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-5">
                                    <div className="flex items-start gap-4">
                                        <Mail className="w-5 h-5 text-[#b0a395] shrink-0 mt-0.5" />
                                        <div className="overflow-hidden">
                                            <p className="text-[9px] uppercase tracking-wider text-[#b0a395] font-bold mb-1">Email</p>
                                            <p className="text-[#3d2e1f] font-sans text-sm break-all">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="w-5 h-5 text-[#b0a395] shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[9px] uppercase tracking-wider text-[#b0a395] font-bold mb-1">Phone</p>
                                            <p className="text-[#3d2e1f] font-sans text-sm">{user.phone || "Not provided"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-5 h-5 text-[#b0a395] shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[9px] uppercase tracking-wider text-[#b0a395] font-bold mb-1">Address</p>
                                            <p className="text-[#3d2e1f] font-sans text-sm leading-relaxed">{user.address || "Not provided"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Order History */}
                        <div className="col-span-1 lg:col-span-8">
                            <h3 className="font-serif text-xl sm:text-2xl text-[#3d2e1f] font-bold mb-6 flex items-center gap-3">
                                <Package className="text-[#a87a52]" /> Order History
                            </h3>
                            
                            {orders.length === 0 ? (
                                <div className="w-full flex justify-center text-center py-12 sm:py-16 bg-white border border-[#e8dccb] border-dashed rounded p-6 sm:p-8">
                                    <div>
                                        <Package className="w-10 h-10 sm:w-12 sm:h-12 text-[#d1c8bd] mx-auto mb-4" />
                                        <p className="text-[#887a6d] font-sans text-sm">You haven't placed any orders yet.</p>
                                        <button 
                                            onClick={() => navigate('/shop')}
                                            className="mt-6 text-[#a87a52] uppercase text-[10px] sm:text-[11px] font-bold tracking-widest hover:text-[#8e613b] transition-colors min-h-[44px]"
                                        >
                                            Start Shopping &rarr;
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 sm:gap-5">
                                    {orders.map((order, index) => (
                                        <div key={index} className="w-full bg-white border border-[#e8dccb] hover:border-[#a87a52]/50 transition-colors rounded p-5 sm:p-6 shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                            
                                            {/* Order Products Preview */}
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="flex -space-x-6 sm:-space-x-4">
                                                    {order.products.slice(0, 3).map((item, idx) => (
                                                        <div key={idx} className="w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden border-2 border-white shadow-sm bg-[#f4e9d8] shrink-0">
                                                            {item?.productId?.image?.[0] ? (
                                                                <img src={`${baseUrl}/uploads/${item.productId.image[0]}`} className="w-full h-full object-cover" alt="Product" />
                                                            ) : (
                                                                <div className="w-full h-full bg-[#f4e9d8]"></div>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {order.products.length > 3 && (
                                                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden border-2 border-white shadow-sm bg-[#faeed8] flex items-center justify-center shrink-0">
                                                            <span className="text-[#a87a52] font-bold text-[10px] sm:text-xs">+{order.products.length - 3}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col overflow-hidden">
                                                    <span className="text-[10px] text-[#887a6d] uppercase tracking-wider font-bold mb-0.5">Order #{order._id.substring(order._id.length - 6).toUpperCase()}</span>
                                                    <span className="text-sm sm:text-base text-[#1a1c21] font-bold mb-0.5 truncate">
                                                        {order.products[0]?.productId?.name || "Product"} {order.products.length > 1 && `+ ${order.products.length - 1} more`}
                                                    </span>
                                                    <span className="text-[11px] text-[#a87a52] font-sans">
                                                        {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Order Meta */}
                                            <div className="flex items-center justify-between md:items-center md:w-auto md:gap-10 lg:gap-12 md:pl-6 md:border-l border-[#e8dccb] pt-4 md:pt-0 border-t md:border-t-0 border-[#f4e9d8]">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] text-[#b0a395] uppercase tracking-wider font-bold mb-0.5">Amount</span>
                                                    <span className="font-serif text-base sm:text-lg text-[#3d2e1f] font-bold">₹{order.totalAmount}</span>
                                                </div>
                                                <div className="flex flex-col items-end md:items-start min-w-[90px]">
                                                    <span className="text-[9px] text-[#b0a395] uppercase tracking-wider font-bold mb-1">Status</span>
                                                    <div className="flex items-center gap-1.5 bg-[#fdfaf6] px-2 py-0.5 rounded border border-[#e8dccb]">
                                                        {getStatusIcon(order.status)}
                                                        <span className="text-[10px] font-bold uppercase tracking-wide text-[#3d2e1f]">{order.status}</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>

    )
}

export default Profile
