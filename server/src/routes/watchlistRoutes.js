import express from "express";

import Watchlist from "../models/Watchlist.js";

const router = express.Router();


// GET WATCHLIST
router.get("/:id", async (req, res) => {

    try {

        const watchlist = await Watchlist.findOne({
            userId: req.params.id
        });

        if (!watchlist) {

            return res.status(404).json({
                message: "Watchlist not found"
            });

        }

        res.json(watchlist);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ADD STOCK TO WATCHLIST
router.post("/", async (req, res) => {

    try {

        const { userId, stockSymbol } = req.body;

        let watchlist = await Watchlist.findOne({
            userId
        });

        if (!watchlist) {

            watchlist = new Watchlist({
                userId,
                stocks: [stockSymbol]
            });

        } else if (
            !watchlist.stocks.includes(stockSymbol)
        ) {

            watchlist.stocks.push(stockSymbol);

        }

        await watchlist.save();

        res.status(201).json({
            message: "Stock added to watchlist",
            data: watchlist
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE STOCK FROM WATCHLIST
router.delete("/:id/:symbol", async (req, res) => {

    try {

        const watchlist = await Watchlist.findOne({
            userId: req.params.id
        });

        if (!watchlist) {

            return res.status(404).json({
                message: "Watchlist not found"
            });

        }

        watchlist.stocks =
            watchlist.stocks.filter(
                stock =>
                    stock !== req.params.symbol
            );

        await watchlist.save();

        res.json({
            message: "Stock removed successfully",
            data: watchlist
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

export default router;