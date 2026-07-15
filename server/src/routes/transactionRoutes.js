import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();


// CREATE TRANSACTION
router.post("/", async (req, res) => {

    try {

        const {
            userId,
            stockSymbol,
            quantity,
            transactionType,
            price
        } = req.body;

        if (
            !userId ||
            !stockSymbol ||
            !quantity ||
            !transactionType ||
            !price
        ) {

            return res.status(400).json({
                message: "All required fields are mandatory"
            });

        }

        const totalAmount = quantity * price;

        const newTransaction = new Transaction({
            ...req.body,
            totalAmount
        });

        await newTransaction.save();

        res.status(201).json({
            message: "Transaction created successfully",
            data: newTransaction
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET ALL TRANSACTIONS
router.get("/", async (req, res) => {

    try {

        const transactions = await Transaction
            .find()
            .populate("userId", "userName email");

        res.status(200).json({
            count: transactions.length,
            data: transactions
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET SINGLE TRANSACTION
router.get("/:id", async (req, res) => {

    try {

        const transaction =
            await Transaction.findById(req.params.id)
            .populate("userId", "userName email");

        if (!transaction) {

            return res.status(404).json({
                message: "Transaction not found"
            });

        }

        res.json(transaction);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE TRANSACTION
router.patch("/:id", async (req, res) => {

    try {

        if (req.body.quantity && req.body.price) {

            req.body.totalAmount =
                req.body.quantity * req.body.price;

        }

        const updatedTransaction =
            await Transaction.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedTransaction) {

            return res.status(404).json({
                message: "Transaction not found"
            });

        }

        res.json({
            message: "Transaction updated successfully",
            data: updatedTransaction
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE TRANSACTION
router.delete("/:id", async (req, res) => {

    try {

        const deletedTransaction =
            await Transaction.findByIdAndDelete(
                req.params.id
            );

        if (!deletedTransaction) {

            return res.status(404).json({
                message: "Transaction not found"
            });

        }

        res.json({
            message: "Transaction deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

export default router;