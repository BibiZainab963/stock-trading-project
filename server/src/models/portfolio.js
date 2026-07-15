import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    stockSymbol: {
        type: String,
        required: true,
        uppercase: true
    },

    quantity: {
        type: Number,
        default: 0,
        min: 0
    }

}, {
    timestamps: true
});

const Portfolio = mongoose.model(
    "Portfolio",
    portfolioSchema
);

export default Portfolio;