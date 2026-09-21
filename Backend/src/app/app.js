import express from "express";
import urlRoute from "../routes/url.routes.js";
import urlModel from "../model/urlSchema.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Ok got it");
});

app.use("/api", urlRoute);

app.get("/:code", async (req, res) => {
    const { code } = req.params;

    const urlIs = await urlModel.findOneAndUpdate(
        { shortCode: code },
        { $inc: { click: 1 } },
        { new: true }
    );

    if (!urlIs) {
        return res.status(404).json({
            message: "Url is not found"
        });
    }

    return res.redirect(302, urlIs.originalUrl);
});

export default app;