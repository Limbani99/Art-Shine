const express = require('express')
const Seller = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const createToken = (seller) => {
    return jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "please enter email and password" })
        }
        const seller = await Seller.findOne({ email })
        if (!seller) {
            res.status(400).json({ message: "seller not found" })
        }
        const isMatch = await bcrypt.compare(password, seller.password)
        if (!isMatch) {
            res.status.json({ message: "invalid password" })
        }
        const token = createToken(seller)
        res.json({ token, data: seller })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const register = async (req, res) => {
    try {
        const { username, email, password, phone, address, role } = req.body
        const seller = await Seller.findOne({ email })
        if (seller) {
            res.status(400).json({ message: "seller already exist" })
        }
        const newSeller = new Seller({
            username,
            email,
            password,
            phone,
            address,
            role: "seller"
        })
        await newSeller.save()
        res.status(201).json({ message: "seller created successfully" })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Seller.findOne({ email });
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
        const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
        const html = ` <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
        <h2 style="color: #C8956A;">Art Shine — Password Reset</h2>
        <p>Hello <strong>${user.username}</strong>,</p>
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
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "password and confirm password does not match" })
        }
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await Seller.findOne({
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
module.exports = { login, register, forgetPassword, resetPassword }