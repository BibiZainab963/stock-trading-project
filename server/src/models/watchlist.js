import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    stocks: [{
        type: String,
        uppercase: true
    }]

}, {
    timestamps: true
});

const Watchlist = mongoose.model(
    "Watchlist",
    watchlistSchema
);

export default Watchlist;