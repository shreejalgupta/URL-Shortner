import urlModel from "../model/urlSchema.js";
import generateCode from "../utils/generateCode.js";

const isValidUrl = (value) => {
    try {
        const parsedUrl = new URL(value);
        return ["http:", "https:"].includes(parsedUrl.protocol);
    } catch {
        return false;
    }
};

export const createSortLink = async (req, res) => {
    const { url } = req.body;

    if (!url || typeof url !== "string") {
        return res.status(400).json({
            error: "Url is Required"
        });
    }

    const trimmedUrl = url.trim();

    if (!isValidUrl(trimmedUrl)) {
        return res.status(400).json({
            error: "Not a Valid Url"
        });
    }

    let shortCode = generateCode();

    while (await urlModel.exists({ shortCode })) {
        shortCode = generateCode();
    }

    const newUrl = await urlModel.create({
        originalUrl: trimmedUrl,
        shortCode,
    });

    return res.status(201).json({
        message: "Created Succefully",
        data: {
            originalUrl: newUrl.originalUrl,
            shortCode: newUrl.shortCode
        }
    });
};

export const getAllUrl = async (req, res) => {
    const allUrl = await urlModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
        message: "Fetched Succefully",
        data: {
            allUrl
        }
    });
};

export const deleteUrl = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({
            message: "Url Not Found"
        });
    }

    const url = await urlModel.findById(id);

    if (!url) {
        return res.status(404).json({
            message: "Url is not found"
        });
    }

    await urlModel.findByIdAndDelete(id);

    return res.status(200).json({
        message: "Url Deleted Succefully",
    });
};
