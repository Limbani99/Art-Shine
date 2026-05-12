const express = require("express")
const route = express.Router()
const { createCategory, getCategory, categoryById, updateCategory, deleteCategory } = require("../controllers/categoryController")
const upload = require("../middleware/upload")


route.post("/add", upload.single("image"), createCategory)
route.get("/get", getCategory)
route.get("/get/:id", categoryById)
route.put("/update/:id", upload.single("image"), updateCategory)
route.delete("/delete/:id", deleteCategory)

module.exports = route