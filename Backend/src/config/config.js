import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: Number(process.env.PORT) || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/url-shortner"
};

export default config;