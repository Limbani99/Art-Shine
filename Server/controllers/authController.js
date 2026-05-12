const express = require('express');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const createToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}
const register = async (req, res) => {
    try {
        const { username, email, password, address, phone, role } = req.body;
        const user = await User.findOne({ email, role });
        if (user) {
            res.status(401).json({ message: "user already exists" })
        }
        const newuser = new User({
            username,
            email,
            password,
            address,
            phone,
            role
        })
        await newuser.save();

        res.status(201).json({ message: "user created successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({ message: "please provide email and password" })
        }
        const user = await User.findOne({ email, role: "user" })
        if (!user) {
            res.status(400).json({ message: "user not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ message: "invalid password" })
        }
        const token = createToken(user)
        res.json({ token, data: user })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getAllCustomers = async (req, res) => {
    try {
        const allCustomers = await User.find({ role: "user" });
        res.status(200).json({ message: "all customers fetched successfully", users: allCustomers })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getCustomerById = async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await User.findById(id);
        if (!customer) {
            res.status(200).json({ message: "customer not found" })
        }
        res.status(200).json({ message: "customer fetched successfully", data: customer })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await User.findByIdAndDelete(id);
        if (!customer) {
            res.status(200).json({ message: "customer not found" })
        }
        res.status(200).json({ message: "customer deleted successfully" })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const updateCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        const { username, email, address, phone } = req.body;
        const userImage = req.file ? req.file.path : undefined;
        const customer = await User.findByIdAndUpdate(id, { username, email, address, phone, userImage }, { new: true })
        if (!customer) {
            res.status(200).json({ message: "customer not found" })
        }
        res.status(200).json({ message: "customer updated successfully", data: customer })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "NO account found with this email"
            });
        }
        const resetToken = crypto.randomBytes(32).toString("hex")
        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        await user.save({ validateBeforeSave: false })
        const html = ` <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
        <h2 style="color: #C8956A;">Art Shine — Password Reset</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>You requested to reset your password. Click the button below:</p>
        <a 
          href="${resetURL}" 
          style="
            display: inline-block;
            background: #C8956A;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            text-decoration: none;
            margin: 16px 0;
            font-size: 14px;
          "
        >
          Reset Password
        </a>
        <p style="color: #888; font-size: 13px;">
          This link will expire in <strong>15 minutes</strong>.
        </p>
        <p style="color: #888; font-size: 13px;">
          If you did not request this, please ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #aaa; font-size: 12px;">Art Shine Studio, Ahmedabad</p>
      </div>`;
        await sendEmail({ to: user.email, subject: "Password Reset", html })
        res.status(200).json({ message: "Password reset link sent successfully" })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;
        if (password = confirmPassword) {
            return res.status(400).json({ success: false, message: "password and confirm password does not match" })
        }
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "reset link is invalid or has expired"
            })
        }
        user.password = password;
        user.resetPasswordExpires = null;
        user.resetPasswordToken = null;
        await user.save();
        res.status(200).json({ message: "password reset successfully" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
module.exports = { register, login, getAllCustomers, getCustomerById, deleteCustomer, updateCustomer, forgetPassword, resetPassword }