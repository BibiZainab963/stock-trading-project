import express from "express";
import Stock from "../models/Stock.js";

const router = express.Router();


// CREATE STOCK
router.post("/", async (req, res) => {

    try {

        const {
            symbol,
            companyName,
            price,
            market
        } = req.body;

        if (!symbol || !companyName || !price || !market) {

            return res.status(400).json({
                message: "All required fields are mandatory"
            });

        }

        const existingStock =
            await Stock.findOne({ symbol });

        if (existingStock) {

            return res.status(400).json({
                message: "Stock already exists"
            });

        }

        const newStock = new Stock(req.body);

        await newStock.save();

        res.status(201).json({
            message: "Stock created successfully",
            data: newStock
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET ALL STOCKS
router.get("/", async (req, res) => {

    try {

        const stocks = await Stock.find();

        res.status(200).json({
            count: stocks.length,
            data: stocks
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET SINGLE STOCK
router.get("/:id", async (req, res) => {

    try {

        const stock =
            await Stock.findById(req.params.id);

        if (!stock) {

            return res.status(404).json({
                message: "Stock not found"
            });

        }

        res.json(stock);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE STOCK
router.patch("/:id", async (req, res) => {

    try {

        const updatedStock =
            await Stock.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedStock) {

            return res.status(404).json({
                message: "Stock not found"
            });

        }

        res.json({
            message: "Stock updated successfully",
            data: updatedStock
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE STOCK
router.delete("/:id", async (req, res) => {

    try {

        const deletedStock =
            await Stock.findByIdAndDelete(
                req.params.id
            );

        if (!deletedStock) {

            return res.status(404).json({
                message: "Stock not found"
            });

        }

        res.json({
            message: "Stock deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

export default router;