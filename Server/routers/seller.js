const express = require('express');
const route = express.Router();
const { register, login, forgetPassword, resetPassword } = require('../controllers/SellerController');


route.post('/register', register);
route.post('/login', login);
route.post('/forget-password', forgetPassword);
route.post('/reset-password/:token', resetPassword);

module.exports = route;