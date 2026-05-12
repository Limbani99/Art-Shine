const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    categoryStatus: {
        type: String,
        enum: ["active", "draft", "archived"],
        default: "active"
    }
})
module.exports = mongoose.model("Category", categorySchema)