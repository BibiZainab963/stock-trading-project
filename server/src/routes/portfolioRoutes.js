import express from "express";

import User from "../models/User.js";
import Stock from "../models/Stock.js";
import Portfolio from "../models/Portfolio.js";
import Transaction from "../models/Transaction.js";

const router = express.Router();


// GET USER PORTFOLIO
router.get("/:id", async (req, res) => {

    try {

        const portfolio = await Portfolio.find({
            userId: req.params.id
        });

        res.status(200).json({
            count: portfolio.length,
            data: portfolio
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// BUY STOCK
router.post("/buy-stock", async (req, res) => {

    try {

        const { userId, stockSymbol, quantity } = req.body;

        const user = await User.findById(userId);

        const stock = await Stock.findOne({
            symbol: stockSymbol
        });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        } else if (!stock) {

            return res.status(404).json({
                message: "Stock not found"
            });

        }

        const totalAmount = stock.price * quantity;

        if (user.balance < totalAmount) {

            return res.status(400).json({
                message: "Insufficient balance"
            });

        }

        user.balance -= totalAmount;

        await user.save();

        let portfolio = await Portfolio.findOne({
            userId,
            stockSymbol
        });

        if (portfolio) {

            portfolio.quantity += quantity;

        } else {

            portfolio = new Portfolio({
                userId,
                stockSymbol,
                quantity
            });

        }

        await portfolio.save();

        const transaction = new Transaction({
            userId,
            stockSymbol,
            quantity,
            transactionType: "BUY",
            price: stock.price,
            totalAmount
        });

        await transaction.save();

        res.status(201).json({
            message: "Stock purchased successfully",
            data: transaction
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// SELL STOCK
router.post("/sell-stock", async (req, res) => {

    try {

        const { userId, stockSymbol, quantity } = req.body;

        const user = await User.findById(userId);

        const stock = await Stock.findOne({
            symbol: stockSymbol
        });

        const portfolio = await Portfolio.findOne({
            userId,
            stockSymbol
        });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        } else if (!stock) {

            return res.status(404).json({
                message: "Stock not found"
            });

        } else if (
            !portfolio ||
            portfolio.quantity < quantity
        ) {

            return res.status(400).json({
                message: "Not enough stocks to sell"
            });

        }

        const totalAmount = stock.price * quantity;

        portfolio.quantity -= quantity;

        await portfolio.save();

        user.balance += totalAmount;

        await user.save();

        const transaction = new Transaction({
            userId,
            stockSymbol,
            quantity,
            transactionType: "SELL",
            price: stock.price,
            totalAmount
        });

        await transaction.save();

        res.status(200).json({
            message: "Stock sold successfully",
            data: transaction
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

export default router;