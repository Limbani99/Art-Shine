const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                require: true
            },
            quantity: {
                type: Number,
                require: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled", "confirmed"],
        default: "pending"
    }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
