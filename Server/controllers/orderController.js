const Order = require("../models/order");

const createOrder = async (req, res) => {
    try {
        const { userId, products, totalAmount } = req.body;
        const order = new Order({ userId, products, totalAmount });
        await order.save();
        res.status(201).json({ message: "Order created successfully", data: order });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'username email userImage').populate('products.productId', 'name price');
        res.status(200).json({ message: "All orders fetched successfully", data: orders });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order fetched successfully", data: order });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully", data: order });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) {
            res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order updated successfully", data: order });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).populate('products.productId').sort({ createdAt: -1 });
        res.status(200).json({ message: "Orders fetched successfully", data: orders });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { createOrder, getAllOrders, getOrderById, deleteOrder, updateOrder, getOrdersByUserId };