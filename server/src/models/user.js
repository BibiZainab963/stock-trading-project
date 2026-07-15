import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    },

    password: {
        type: String,
        required: true,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
    },

    balance: {
        type: Number,
        default: 100000
    }

}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;