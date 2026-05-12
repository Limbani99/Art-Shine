const express = require('express');
var route = require('express').Router();
const { register, login, getAllCustomers, getCustomerById, deleteCustomer, updateCustomer, forgetPassword, resetPassword } = require('../controllers/authController');

const upload = require("../middleware/upload")

route.post('/register', register);
route.post('/login', login);
route.get('/all', getAllCustomers);
route.get('/get/:id', getCustomerById);
route.delete('/delete/:id', deleteCustomer);
route.put('/update/:id', upload.single("userImage"), updateCustomer);
route.post("/forget-password", forgetPassword)
route.post("/reset-password/:token", resetPassword)
module.exports = route;

// GET    /api/customers             → get all customers
// GET    /api/customers/:id         → get single customer detail
// GET    /api/customers/:id/orders  → get all orders of a customer
// DELETE /api/customers/:id         → delete customer account