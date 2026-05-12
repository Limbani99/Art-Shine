const express = require("express")
const Product = require("../models/Product")

// create product 
const createProduct = async (req, res) => {
    try {
        const { name, description, price, isAvailable, discountPrice, discountPersent, categoryId } = req.body
        const image = req.files ? req.files.map(file => file.filename) : [];

        const sellerId = req.body.sellerId;
        // if (!name || !description || !price || !stock || !category || !image || !sellerId) {
        //     res.status(400).json({ message: "all fields are required" })
        // }
        const product = new Product({
            name,
            description,
            price,
            isAvailable,
            discountPrice,
            discountPersent,
            categoryId,
            image,
            sellerId
        })
        await product.save()
        res.status(201).json({ message: "product created successfully" })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}
// get product
const getProduct = async (req, res) => {
    try {
        const product = await Product.find().populate("categoryId")
        res.status(200).json({ product })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}
// get by ID
const productById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate("categoryId");
        res.status(200).json({ message: "product found", product })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// delete product 
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// update product 
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = { ...req.body };

        if (req.files && req.files.length > 0) {
            updateData.image = req.files.map(file => file.filename);
        }
        const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = { createProduct, getProduct, productById, deleteProduct, updateProduct }