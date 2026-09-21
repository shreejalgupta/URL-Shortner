import express from "express";
import { createSortLink, deleteUrl, getAllUrl } from "../controller/url.controller.js";

const router = express.Router();

router.get("/url", getAllUrl);
router.post("/url-create", createSortLink);
router.delete("/delete/:id", deleteUrl);

export default router;