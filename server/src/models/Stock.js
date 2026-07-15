import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({

    symbol: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },

    companyName: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    market: {
        type: String,
        enum: ["NASDAQ", "NYSE", "NSE", "BSE"],
        required: true
    },

    sector: {
        type: String,
        enum: [
            "Technology",
            "Finance",
            "Healthcare",
            "Energy",
            "Automobile"
        ]
    },

    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    },

    currency: {
        type: String,
        enum: ["USD", "INR"],
        default: "USD"
    },

    exchangeType: {
        type: String,
        enum: ["EQUITY", "ETF", "INDEX"],
        default: "EQUITY"
    }

}, {
    timestamps: true
});

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
