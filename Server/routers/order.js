express = require("express");
const route = express.Router();
const { createOrder, getAllOrders, getOrderById, deleteOrder, updateOrder, getOrdersByUserId } = require("../controllers/orderController");
route.post("/create", createOrder); //create order
route.get("/all", getAllOrders); //get all orders
route.get("/get/:id", getOrderById); //get order by id
route.get("/user/:userId", getOrdersByUserId); //get user orders
route.delete("/delete/:id", deleteOrder); //delete order
route.put("/update/:id", updateOrder); //update order
module.exports = route;