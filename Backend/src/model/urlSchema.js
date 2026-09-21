import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        require: true,
        trim: true
    },
    shortCode: {
        type: String,
        require: true,
        unique: true
    },
    click: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const urlModel = mongoose.model("Url", urlSchema);

export default urlModel;