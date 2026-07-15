import express from "express";
import User from "../models/User.js";

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {

    try {

        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const newUser = new User({
            userName,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({
            message: "Registration successful",
            data: newUser
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        } else if (user.password !== password) {

            return res.status(400).json({
                message: "Invalid password"
            });

        }

        res.json({
            message: "Login successful",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// PROFILE
router.get("/profile/:id", async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DEPOSIT
router.patch("/deposit/:id", async (req, res) => {

    try {

        const { amount } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.balance += amount;

        await user.save();

        res.json({
            message: "Amount deposited successfully",
            balance: user.balance
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// WITHDRAW
router.patch("/withdraw/:id", async (req, res) => {

    try {

        const { amount } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        } else if (user.balance < amount) {

            return res.status(400).json({
                message: "Insufficient balance"
            });

        }

        user.balance -= amount;

        await user.save();

        res.json({
            message: "Withdrawal successful",
            balance: user.balance
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET ALL USERS
router.get("/", async (req, res) => {

    try {

        const users = await User.find();

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET SINGLE USER
router.get("/:id", async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE USER
router.patch("/:id", async (req, res) => {

    try {

        const updatedUser =
            await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedUser) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json({
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE USER
router.delete("/:id", async (req, res) => {

    try {

        const deletedUser =
            await User.findByIdAndDelete(
                req.params.id
            );

        if (!deletedUser) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

export default router;