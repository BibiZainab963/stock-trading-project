import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

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
        required: true,
        min: 1
    },

    transactionType: {
        type: String,
        enum: ["BUY", "SELL"],
        required: true
    },

    orderType: {
        type: String,
        enum: ["MARKET", "LIMIT"],
        default: "MARKET"
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["PENDING", "COMPLETED", "CANCELLED"],
        default: "COMPLETED"
    },

    currency: {
        type: String,
        enum: ["USD", "INR"],
        default: "USD"
    },

    platform: {
        type: String,
        enum: ["WEB", "ANDROID", "IOS"],
        default: "WEB"
    }

}, {
    timestamps: true
});

const Transaction = mongoose.model(
    "Transaction",
    transactionSchema
);

export default Transaction;
