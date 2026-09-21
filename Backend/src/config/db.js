import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        if (!config.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }

        await mongoose.connect(config.MONGO_URI);
        console.log("DataBase is Connected");
    } catch (error) {
        console.error("DataBase is not connected:", error.message);
        process.exit(1);
    }
};

export default connectDB;