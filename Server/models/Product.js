const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        require: true,
        type: String
    },
    price: {
        require: true,
        type: Number,
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    discountPrice: {
        type: Number,
        default: 0
    },
    discountPersent: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    image: {
        require: true,
        type: [String]
    },
    sellerId: {
        require: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Product", productSchema)