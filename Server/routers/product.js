express = require("express");
const route = express.Router();
const { createProduct, getProduct, productById, deleteProduct, updateProduct } = require("../controllers/productController");
const image = require("../middleware/upload")

route.post("/add", image.array("image", 4), createProduct);
route.get("/get", getProduct);
route.get("/get/:id", productById);
route.delete("/delete/:id", deleteProduct);
route.put("/update/:id", image.array("image", 4), updateProduct);

module.exports = route;