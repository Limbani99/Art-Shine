import React, { useState } from 'react';
import { Plus, Download, Box, Clock, DollarSign, RefreshCw, Calendar, MoreVertical, ChevronRight, Eye, Trash2, Info, X, Edit2, MoreHorizontal } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';


const filters = ['All Orders', 'Processing', 'Shipped', 'Delivered'];

function Order() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const [activeFilter, setActiveFilter] = useState('All Orders');
    const [fetchedOrders, setFetchedOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [editStatus, setEditStatus] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [openActionMenu, setOpenActionMenu] = useState(null); // tracks which row's menu is open

    const handleStatusUpdate = async (id, newStatus) => {
        setUpdatingStatus(true);
        try {
            await axios.put(`${baseUrl}/api/order/update/${id}`, { status: newStatus });
            toast.success("Order status updated");
            fetchOrders();
            setEditStatus(null);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update status");
        } finally {
            setUpdatingStatus(false);
        }
    }
    const deleteOrder = async (id) => {
        try {
            const res = await axios.delete(`${baseUrl}/api/order/delete/${id}`);
            console.log(res.data);
            fetchOrders();
            setSelectedOrder(null);
            toast.success("Order deleted successfully");
        }
        catch (err) {
            console.log(err);
        }
    }
    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/order/all`);
            setFetchedOrders(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }
    fetchOrders();
    const stats = [
        { label: 'TOTAL ORDERS', value: fetchedOrders.length, sub: 'total orders were placed', icon: Box },
        { label: 'PENDING ORDERS', value: fetchedOrders.filter((order) => order.status === 'pending').length, sub: 'pending orders were placed', icon: Clock },
        { label: 'COMPLETED ORDERS', value: fetchedOrders.filter((order) => order.status === 'completed').length, sub: 'completed orders were placed', icon: DollarSign },
        { label: 'CANCELLED ORDERS', value: fetchedOrders.filter((order) => order.status === 'cancelled').length, sub: 'cancelled orders were placed', icon: RefreshCw },
    ];
    return (
        <div className="font-sans text-[#3B2C24]">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                    <button className="bg-white hover:bg-[#FDF9F4] text-[#7B5837] border border-[#EDE3D9] text-[11px] font-bold tracking-[0.15em] uppercase px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors shadow-sm">
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Stats Dashboard — 2-col on mobile, 4-col on lg */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-[#EDE3D9] p-5 shadow-sm relative group hover:border-[#A37B5C] transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <stat.icon size={48} />
                        </div>
                        <p className="text-[9px] font-bold tracking-[0.15em] text-[#BAA995] uppercase mb-1.5">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-[#2C1F14] mb-1">{stat.value}</h3>
                        <p className={`text-[10px] font-bold ${stat.sub.includes('+') ? 'text-[#3D9B5A]' : 'text-[#BAA995]'}`}>
                            {stat.sub}
                        </p>
                    </div>
                ))}
            </div>

            {/* Filter & Table Container */}
            <div className="bg-white rounded-2xl border border-[#EDE3D9] shadow-sm mb-10 sm:mb-12 overflow-hidden">
                {/* Filter Bar */}
                <div className="p-4 md:p-6 bg-[#FDFAF7] border-b border-[#EDE3D9] flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                    {/* Horizontally scrollable filter pills on mobile */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide flex-nowrap md:flex-wrap">
                        <span className="text-[10px] font-bold text-[#BAA995] uppercase shrink-0">Filter:</span>
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`text-[10px] font-bold tracking-[0.1em] px-3 sm:px-4 py-2 rounded-full transition-all uppercase shrink-0 ${activeFilter === f ? 'bg-[#7B5837] text-white shadow-md' : 'bg-white text-[#9B8C80] border border-[#EDE3D9] hover:bg-[#FDF9F4]'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-[#EDE3D9] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#FDF9F4] transition-colors self-start md:self-auto">
                        <Calendar size={14} className="text-[#A37B5C]" />
                        <span className="text-[10px] font-bold text-[#2C1F14] uppercase">Last 30 Days</span>
                    </div>
                </div>

                {/* Orders Table — scrollable on mobile */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                        <thead>
                            <tr className="text-left border-b border-[#EDE3D9]">
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase">Order ID</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase">Customer</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase hidden md:table-cell">Date</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase">Status</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase">Amount</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold tracking-[0.18em] text-[#BAA995] uppercase text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F5F0EA]">
                            {fetchedOrders.map((order, i) => (
                                <tr key={i} className="hover:bg-[#FCF8F4] transition-colors cursor-pointer">
                                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm font-bold text-[#A37B5C] font-serif italic max-w-[100px] truncate">{order._id.slice(-8)}</td>
                                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            {order.userId.userImage ? (
                                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-[#EDE3D9] flex-shrink-0">
                                                    <img src={`${baseUrl}/uploads/${order.userId.userImage}`} alt={order.userId.username} className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F5F0EA] border border-[#DCCCBA] flex items-center justify-center text-[10px] font-bold text-[#A37B5C] flex-shrink-0">
                                                    {order.userId.username.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-xs sm:text-sm font-bold text-[#2C1F14] truncate">{order.userId.username}</p>
                                                <p className="text-[10px] text-[#BAA995] truncate hidden sm:block">{order.userId.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-xs text-[#6C5E53] font-medium hidden md:table-cell">{order.createdAt}</td>
                                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                                        <span className={`text-[8px] font-black uppercase tracking-[0.15em] px-2 sm:px-2.5 py-1 rounded-md whitespace-nowrap ${order.status === 'pending' ? 'bg-[#FEF9E7] text-[#B5913D]' :
                                            order.status === 'confirmed' ? 'bg-[#EBF5FF] text-[#3D79B5]' :
                                                order.status === 'completed' ? 'bg-[#E8F7ED] text-[#3D9B5A]' :
                                                    'bg-[#F9E6E6] text-[#B53D3D]'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm font-bold text-[#2C1F14]">{order.totalAmount}</td>
                                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-right">
                                        {/* Touch-friendly tap toggle action menu */}
                                        <div className="relative flex justify-end">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setOpenActionMenu(openActionMenu === i ? null : i); }}
                                                className="touch-sm p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>
                                            {openActionMenu === i && (
                                                <div className="absolute right-0 top-8 flex items-center gap-1 bg-white border border-[#EDE3D9] rounded-lg shadow-md p-2 z-10" onClick={(e) => e.stopPropagation()}>
                                                    <button
                                                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 rounded-lg touch-sm"
                                                        onClick={() => { setSelectedOrder(order); setOpenActionMenu(null); }}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 rounded-lg touch-sm"
                                                        onClick={() => { setEditStatus(order); setOpenActionMenu(null); }}
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg touch-sm"
                                                        onClick={() => { setOrderToDelete(order); setOpenActionMenu(null); }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer / Pagination */}
                <div className="p-3 sm:p-4 md:p-6 border-t border-[#EDE3D9] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <p className="text-[10px] font-bold text-[#BAA995] uppercase">Showing 1-5 of 1,284 orders</p>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F0EA] text-[#BAA995] transition-colors"><ChevronRight size={16} className="rotate-180" /></button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#7B5837] text-white text-[10px] font-bold shadow-md shadow-[#7B5837]/20">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F0EA] text-[#A37B5C] text-[10px] font-bold">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F0EA] text-[#A37B5C] text-[10px] font-bold">3</button>
                        <span className="px-2 text-[#D6C9BC] tracking-widest text-[10px] font-bold">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F0EA] text-[#BAA995] transition-colors"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>

            {/* Bottom Promotional / Instructional Section */}
            <div className="mb-10 sm:mb-12">
                <div className="bg-gradient-to-br from-[#FDF9F4] to-[#F5F0EA] rounded-2xl sm:rounded-[32px] p-6 sm:p-8 md:p-12 border border-[#EDE3D9] relative overflow-hidden flex flex-col md:flex-row items-center gap-6 sm:gap-10">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Info size={120} />
                    </div>
                    <div className="flex-1">
                        <p className="font-serif italic text-2xl text-[#BAA995] -mb-1 opacity-60">Preservation Note</p>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2C1F14] mb-6">Did you know?</h2>
                        <p className="text-sm md:text-base text-[#6C5E53] leading-relaxed mb-8 max-w-xl">
                            Resin art orders containing bridal bouquets require a minimum of **4 weeks** for deep-drying. Keeping your customers informed during the "Processing" stage is key to maintaining the high-value perception of your artisanal work. Use the <strong className="text-[#7B5837]">Seller Notes</strong> feature in order details to send automated drying updates.
                        </p>
                        <button className="flex items-center gap-2 text-[11px] font-bold text-[#7B5837] hover:text-[#A37B5C] tracking-[0.2em] uppercase transition-all group">
                            LEARN ABOUT CURATION CYCLES <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <div className="w-full md:w-[320px] h-[240px] md:h-[280px] rounded-3xl overflow-hidden shadow-2xl shadow-[#BAA995]/30 transform md:rotate-2 hover:rotate-0 transition-transform duration-500 border-8 border-white">
                        <img
                            src="https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?w=400&h=400&fit=crop"
                            alt="Preserved Flowers"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}>
                    <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EDE3D9] p-5 sm:p-8" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-serif font-bold text-[#2C1F14]">Order Details</h2>
                            <button onClick={() => setSelectedOrder(null)} className="text-[#BAA995] hover:text-[#7B5837] transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Header Info */}
                            <div className="flex justify-between items-start border-b border-[#EDE3D9] pb-6">
                                <div>
                                    <p className="text-[10px] font-bold text-[#BAA995] uppercase tracking-widest mb-1">Order ID</p>
                                    <p className="text-lg font-bold text-[#A37B5C] font-serif italic">{selectedOrder._id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-[#BAA995] uppercase tracking-widest mb-1">Status</p>
                                    <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-md ${selectedOrder.status === 'pending' ? 'bg-[#FEF9E7] text-[#B5913D]' :
                                        selectedOrder.status === 'confirmed' ? 'bg-[#EBF5FF] text-[#3D79B5]' :
                                            selectedOrder.status === 'completed' ? 'bg-[#E8F7ED] text-[#3D9B5A]' :
                                                'bg-[#F9E6E6] text-[#B53D3D]'
                                        }`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="border-b border-[#EDE3D9] pb-6">
                                <p className="text-[10px] font-bold text-[#BAA995] uppercase tracking-widest mb-3">Customer Information</p>
                                <div className="flex items-center gap-4">
                                    {selectedOrder.userId?.userImage ? (
                                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#EDE3D9]">
                                            <img src={`${baseUrl}/uploads/${selectedOrder.userId.userImage}`} alt={selectedOrder.userId.username} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-[#F5F0EA] border border-[#DCCCBA] flex items-center justify-center text-lg font-bold text-[#A37B5C]">
                                            {selectedOrder.userId?.username?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-base font-bold text-[#2C1F14]">{selectedOrder.userId?.username}</p>
                                        <p className="text-xs text-[#BAA995]">{selectedOrder.userId?.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Products List */}
                            <div className="border-b border-[#EDE3D9] pb-6">
                                <p className="text-[10px] font-bold text-[#BAA995] uppercase tracking-widest mb-3">Order Items</p>
                                <div className="space-y-4">
                                    {selectedOrder.products?.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center bg-[#FDF9F4] p-4 rounded-xl border border-[#EDE3D9]">
                                            <div>
                                                <p className="text-sm font-bold text-[#2C1F14]">{item.productId?.name || "Unknown Product"}</p>
                                                <p className="text-[10px] text-[#BAA995]">Quantity: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-bold text-[#7B5837]">${item.productId?.price || 0}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total Amount */}
                            <div className="flex justify-between items-center pt-2">
                                <p className="text-sm font-bold text-[#2C1F14] uppercase tracking-widest">Total Amount</p>
                                <p className="text-2xl font-bold text-[#7B5837]">${selectedOrder.totalAmount}</p>
                            </div>

                            <div className="pt-6">
                                <button onClick={() => setSelectedOrder(null)} className="w-full py-4 bg-[#7B5837] text-white rounded-xl text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#A37B5C] transition-colors shadow-md shadow-[#7B5837]/20">
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {orderToDelete && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setOrderToDelete(null)}>
                    <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-[#EDE3D9] p-6 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-[#2C1F14] mb-2">Delete Order?</h3>
                        <p className="text-sm text-[#6C5E53] mb-6">Are you sure you want to delete order <span className="font-bold text-[#A37B5C] italic font-serif">{orderToDelete._id}</span>? This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setOrderToDelete(null)} className="flex-1 py-3 bg-[#F5F0EA] text-[#7B5837] rounded-xl text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#EBE3D9] transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => { deleteOrder(orderToDelete._id); setOrderToDelete(null); }} className="flex-1 py-3 bg-red-500 text-white rounded-xl text-xs font-bold tracking-[0.15em] uppercase hover:bg-red-600 transition-colors shadow-md shadow-red-500/20">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Edit Status Modal */}
            {editStatus && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setEditStatus(null)}>
                    <div className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl border border-[#EDE3D9] p-8 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                            <Edit2 size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-[#2C1F14] mb-2">Update Order Status</h3>
                        <p className="text-[11px] text-[#BAA995] uppercase tracking-widest font-bold mb-6">Order #{editStatus._id.slice(-6)}</p>

                        <div className="grid grid-cols-1 gap-3 mb-8">
                            {[
                                { id: 'pending', label: 'Pending', color: '#B5913D', bg: '#FEF9E7' },
                                { id: 'confirmed', label: 'Confirmed', color: '#3D79B5', bg: '#EBF5FF' },
                                { id: 'completed', label: 'Completed', color: '#3D9B5A', bg: '#E8F7ED' },
                                { id: 'cancelled', label: 'Cancelled', color: '#B53D3D', bg: '#F9E6E6' }
                            ].map((status) => (
                                <button
                                    key={status.id}
                                    disabled={updatingStatus}
                                    onClick={() => handleStatusUpdate(editStatus._id, status.id)}
                                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${editStatus.status === status.id
                                        ? 'border-[#7B5837] bg-white shadow-sm'
                                        : 'border-transparent bg-[#FDFAF7] hover:bg-white hover:border-[#EDE3D9]'
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: status.color }}></div>
                                        <span className={`text-xs font-bold uppercase tracking-widest ${editStatus.status === status.id ? 'text-[#7B5837]' : 'text-[#9B8C80]'}`}>
                                            {status.label}
                                        </span>
                                    </span>
                                    {editStatus.status === status.id && (
                                        <div className="w-5 h-5 bg-[#7B5837] rounded-full flex items-center justify-center">
                                            <Box size={10} className="text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setEditStatus(null)}
                            className="w-full py-4 text-[#BAA995] text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#7B5837] transition-colors"
                        >
                            Cancel and Close
                        </button>
                    </div>
                </div>
            )}

        </div>

    );
}

export default Order;