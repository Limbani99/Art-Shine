const express = require("express")
const category = require("../models/category")

const createCategory = async (req, res) => {
    try {
        const { name, description, categoryStatus } = req.body
        const gotcategory = await category.findOne({ name })
        if (gotcategory) {
            return res.status(400).json({ message: "Category already exists" })
        }
        const newCategory = new category({
            name,
            description,
            image: req.file.filename,
            categoryStatus: categoryStatus || "active"
        })
        await newCategory.save()
        return res.status(201).json({ message: "Category created successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getCategory = async (req, res) => {
    try {
        const gotcategory = await category.find()
        res.status(200).json({ message: "Category fetched successfully", gotcategory })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const categoryById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Category ID is required" })
        }
        const gotcategory = await category.findById(id);
        if (!gotcategory) {
            return res.status(404).json({ message: "Category not found" })
        }
        res.status(200).json({ message: "category fetched successfully", gotcategory })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Category ID is required" })
        }
        const gotcategory = await category.findByIdAndDelete(id);
        if (!gotcategory) {
            return res.status(404).json({ message: "Category not found" })
        }
        res.status(200).json({ message: "category deleted successfully", gotcategory })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, categoryStatus } = req.body
        if (!id) {
            return res.status(400).json({ message: "Category ID is required" })
        }
        
        let updateData = { name, description, categoryStatus };
        
        // Only update the image if a new file is uploaded
        if (req.file) {
            updateData.image = req.file.filename;
        }

        const gotcategory = await category.findByIdAndUpdate(id, updateData, { new: true })
        
        if (!gotcategory) {
            return res.status(404).json({ message: "Category not found" })
        }
        res.status(200).json({ message: "category updated successfully", gotcategory })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { createCategory, getCategory, categoryById, deleteCategory, updateCategory }
